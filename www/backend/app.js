const express = require('express');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
var objectId = require('mongodb').ObjectID;

const shops = require('./apis/shops');
const reviews = require('./apis/reviews');

const app = express();
const PORT = 5050;

const DB_NAME = 'coffee_spot';

const DB_URI = 'mongodb+srv://dbColin:mongopass@cluster0-o6myu.mongodb.net/admin?retryWrites=true&w=majority'
const MongoClient = mongodb.MongoClient;
const client = new MongoClient(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(bodyParser.urlencoded({extended: false})); // allow user to send data within the url
app.use(bodyParser.json()); // allow user to send JSON dat

app.use('/shops', shops);
app.use('/reviews', reviews);

app.listen(PORT);
console.log("Listening on port " + PORT);
