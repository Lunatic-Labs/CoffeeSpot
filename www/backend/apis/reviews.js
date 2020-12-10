var express = require('express');
var router = express.Router();
const mongodb = require('mongodb');
var objectId = require('mongodb').ObjectID;

const DB_NAME = 'coffee_spot';
const COLLECTION_NAME = 'Reviews';

const DB_URI = 'mongodb+srv://dbColin:mongopass@cluster0-o6myu.mongodb.net/admin?retryWrites=true&w=majority';
const MongoClient = mongodb.MongoClient;
const client = new MongoClient(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

client.connect(function(err, connection) {
  if (err) {
    return res.status(500).send({message: "Could not connect to the database."});
  }

  const db = connection.db(DB_NAME);

  // GET request
  router.get('/', function(req, res) {
    db.collection(COLLECTION_NAME)
      .find({})
        .toArray(function(find_error, result){
          if (find_error)
            return res.status(500).send({message: "Cound not retrieve collection data."});
          console.log("Get request.");
          return res.status(200).send(result);
    });
  });

  // POST request (INSERT Book)
  router.post('/', function(req, res) {
    if (!req.body || req.body.length === 0)
      return res.status(400).send({message: "Object is required."});
    if (!req.body.shop)
      return res.status(400).send({message: "Required fields: order, shop"});

    var doc = req.body;
    db.collection(COLLECTION_NAME).insertOne(doc, function(insert_err, result) {
      if (insert_err){
        console.log("Error");
        return res.status(500).send({message: "Could not insert object."});
      }
      return res.status(200).send({message: 'Object inserted.'});
    });

  });

  router.get('/orders/', function(req, res) {
    console.log("Request made for: ");
    db.collection(COLLECTION_NAME)
      .aggregate([
        { $match: {} },
        { $group: { _id: {shop: "$shop", order: "$order"}, total: { $sum: 1 } } },
        { $sort: { total: -1 } },
        { $group: { _id: "$_id.shop", orders: {$push: {order: "$_id.order", total: "$total"} } } },
      ]).toArray(function(err, result) {
          if (err){
            return res.status(500).send({message: "Could not aggregate."});
          }
          console.log(result);
          if(result.length > 0)
            return res.send(result);
          else {
            return res.send({order: "No Orders"});
          }
        });
  });

});

module.exports = router;
