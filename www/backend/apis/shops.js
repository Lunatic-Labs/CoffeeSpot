var express = require('express');
var router = express.Router();
const mongodb = require('mongodb');
var objectId = require('mongodb').ObjectID;

const DB_NAME = 'coffee_spot';
const COLLECTION_NAME = 'Shops';

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
          return res.status(200).send(result);
    });
  });

  // GET Current Rankings
  router.get('/ratings/:id', function(req, res) {
    db.collection(COLLECTION_NAME)
      .find( { _id: objectId(req.params.id) }, { taste: 1, seating: 1, aesthetic: 1, study: 1, _id: 0 } )
      .next(function(err, result){
        if (err)
          return res.status(500).send({message: "Could not find ranking data."});
        console.log("Returned ratings for: " + req.params.id);
        return res.status(200).send(result);
    });
  });

  // POST request (INSERT Shop)
  router.post('/', function(req, res) {
    if (!req.body || req.body.length === 0)
      return res.status(400).send({message: "Object is required."});
    if (!req.body.name || !req.body.location)
      return res.status(400).send({message: "Required fields: name, location"});

    var doc = req.body;
    db.collection(COLLECTION_NAME).insertOne(doc, function(insert_err, result) {
      if (insert_err){
        console.log("Error");
        return res.status(500).send({message: "Could not insert object."});
      }
      return res.status(200).send({message: 'Object inserted.'});
    });

  });

  // PUT request (UPDATE Shop)
  router.put('/:id', function(req, res) {
    db.collection(COLLECTION_NAME)
      .updateOne({"_id": objectId(req.params.id)},
        {$set: req.body},
          function(update_err, result) {
      if (update_err)
        return res.status(500).send({message: "Could not update object."});
      return res.status(200).send({message: 'Object updated.'});
    });
  });

  //DELETE request (DELETE Shop)
  router.delete('/:id', function(req, res) {
    console.log("Request made");
    db.collection(COLLECTION_NAME)
      .deleteOne({"_id": objectId(req.params.id)},
        function(delete_err, result){
      if (delete_err)
        return res.status(500).send({message: "Could not delete object."});
      return res.send({message: 'Object deleted'});
    });
  });

  router.get('/search', function(req, res) {
    console.log(req.body.searchTerms)
    db.collection(COLLECTION_NAME)
      .find({ $text: { $search: req.body.searchTerms } },
            { score: { $meta: "textScore" } }
      ).sort( { score: { $meta: "textScore" } } ).toArray(function (err, result){
        if (err)
          return res.status(500).send({message: "Error"});
        return res.send(result);
      });
  });

});

module.exports = router;
