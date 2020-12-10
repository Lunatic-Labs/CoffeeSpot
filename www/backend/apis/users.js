router.post('/login', function(req, res){
  client.connect(function(err, connection) {

    db.collection.find({username: req.body.username, password: req.body.password}, function(err, user) {
      if (err)
        return res.status(500).send({});

      if (!user)
        return res.status(400).send({});

      return token;
      
    })
  })
})
