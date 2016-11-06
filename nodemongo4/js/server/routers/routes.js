//routes.js

var userResource = require("../resource/user_resource");

module.exports = function(app){
  //Get the details of the user with the given id
  app.get('/user/:id', function(req, res){
    userResource.getUserDetails(req.params, function(results){res.json(results);});
  });

  //Get all the users
  app.get('/user', function(req, res){
    userResource.getAllUsers(function(results){res.json(results);});
  });

  app.post('/user', function(req, res){
    userResource.addNewUser(req.body, function(results){
      res.json(results);
    });
  });

  app.put('/user/:id', function(req, res){
    userResource.updateUser(req.body, req.params.id, function(results){
      res.json(results);
    });
  });

  app.delete('/user/:id', function(req, res){
    userResource.deleteUser(req.params.id, function(results){
      res.json(results);
    });
  });
}