//console.log('May Node be with you')
const express = require('express');
const bodyParser= require('body-parser');
const cors= require('cors');
const app = express();
const routes = require("./js/server/routers/routes");

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


//Including the routes module
routes(app);


app.listen(3000, () => {
    console.log('listening on 3000')
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
})
})
