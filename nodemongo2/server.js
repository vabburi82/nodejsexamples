//console.log('May Node be with you')
const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;


app.use(bodyParser.urlencoded({extended: true}));

var db

MongoClient.connect('mongodb://localhost:27017/nodemongo2', (err, database) => {
  if (err) return console.log(err)
  db = database
  console.log('Connected to mongodb...')
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})


// app.get('/', function(req, res) {
//   res.send('Hello World')
// })

// app.get('/', (req, res) => {
//   res.send('hello world'+__dirname)
// })

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/adduser', (req, res) => {
  res.sendFile(__dirname + '/adduser.html')
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
