// Module dependencies
const express = require('express');
const bodyParser= require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;
var db;

MongoClient.connect('mongodb://grizzchef:grizzchef@ds153719.mlab.com:53719/reddit-tinder', (err, database) => {
    // start ze server
    if (err) return console.log(err)
        db = database;
        app.listen(3000, function() {
        console.log('listening on 3000');
    })
})

// first page is login (for now)
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/login.html');
})