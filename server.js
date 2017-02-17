// Module dependencies
const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());

//const MongoClient = require('mongodb').MongoClient;
var db;

// user creds
var username;
var userId;
var password;

mongoose.connect('mongodb://grizzchef:grizzchef@ds153719.mlab.com:53719/reddit-tinder', (err, database) => {
    // start ze server
    if (err) return console.log(err)
        db = database;
        app.listen(3000, function() {
        console.log('listening on 3000');
    })
})

// User Schema
var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String
});

// User Model
var UserModel = mongoose.model("Users", UserSchema);

// first page is login (for now)
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/login.html');
})

// Login existing user
app.post('/login', (req, res) => {

  var user = new UserModel({
    username: req.body.username,
    password: req.body.password,
  });
  
  UserModel.find({
    'username': user.username, 
    'password': user.password
    }, function (err, response) {
      if (err) {
        return res.send(err);
      } else {
        console.log(response[0]);
        var u = response[0];
        username = u.username;
        userId = u._id;
        password = u.password;
        console.log('new user created: ' + username + ' ' + userId + ' ' + password);
        return res.send('/views/feed.html');
      }
  });
});

// Add new user
app.post('/register', (req, res) => {

  var user = new UserModel({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  });
  
  /*user.find({
    'username': user.username, 
    'password': user.password
    }, function (err, res) {
      if (!err) {
        return res.send(err);
      } else {
        console.log(res);
      }
  });*/

  user.save(function(err) {
    if (!err) {
      username = user.username;
      userId = user._id;
      password = user.password;
      
      if (err){
        return res.send(err);
      }

      console.log('new user created: ' + username + ' ' + userId + ' ' + password);
      return res.send('/views/feed.html');
    }
  });
});

// Login existing user
