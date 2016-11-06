//console.log('May Node be with you')
const express = require('express');
const bodyParser= require('body-parser');
const cors= require('cors');
const app = express();
const mongodb = require('mongodb');

var db

// GET /css/style.css etc.
app.use('/css', express.static(__dirname + '/css'));

// GET /js/app.js etc.
app.use('/js', express.static(__dirname + '/js'));

// form submit body parser
app.use(bodyParser.urlencoded({extended: true}));

// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

//CORS middleware
app.use(cors());

mongodb.MongoClient.connect('mongodb://localhost:27017/nodemongo2', (err, database) => {
  if (err) return console.log(err)
  db = database
  console.log('Connected to mongodb...')
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/adduser', (req, res) => {
  res.sendFile(__dirname + '/view/adduser.html')
})

app.get('/UserManagement', (req, res) => {
  res.sendFile(__dirname + '/view/UserManagement.html')
})

app.post('/saveuser', (req, res) => {
  console.log(req.body)
  db.collection('users').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

app.get('/viewallusers', (req, res) => {
 db.collection('users').find().toArray(function(err, results) {
  console.log(results)
  res.json(results);
  // send HTML file populated with quotes here
})
})

//  services for angular user management app
app.get('/user', (req, res) => {
  // db.collection('angular_users').drop();
 db.collection('angular_users').find().toArray(function(err, results) {
  console.log(results)
  res.json(results);
})
})

app.post('/user', (req, res) => {
  console.log(req.body)
  db.collection('angular_users').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to angular_users database')
    res.sendStatus(200);
  })
})

app.delete('/user/:id', (req, res) => {
  console.log(req.params.id)
  db.collection('angular_users').deleteOne({ _id: new mongodb.ObjectID( req.params.id ) }, (err, result) => {
    if (err) return console.log(err)

    console.log('deleted from angular_users database')
    //res.redirect('/UserManagement')
    res.sendStatus(200);
  })
})

app.put('/user/:id', (req, res) => {
  console.log(req.params.id)
  delete req.body._id;
  db.collection('angular_users').updateOne({ _id: new mongodb.ObjectID( req.params.id ) },{ $set: req.body }, (err, result) => {
    if (err) return console.log(err)

    console.log('updated  angular_users database')
    //res.redirect('/UserManagement')
    res.sendStatus(200);
  })
})
