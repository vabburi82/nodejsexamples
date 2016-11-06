//console.log('May Node be with you')
const express = require('express');
const bodyParser= require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.listen(3000, function() {
  console.log('listening on 3000')
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
})