var userDao = require("../dao/user_dao");

module.exports.getUserDetails = function(params, callback){
  console.log("Fetching details for user with Id: " + params.id);
  userDao.findUserById(params.id, callback);
}

module.exports.getAllUsers = function(callback){
  console.log("Fetching all users");
  userDao.findAll(callback);
}

module.exports.addNewUser = function(user, callback){
  console.log("Adding new book");
  userDao.save(user, callback);
}

module.exports.updateUser = function(user, id, callback){
  console.log("Updating User");
  userDao.update( id, user, callback);
}
module.exports.deleteUser = function(id, callback){
  console.log("Deleting user");
  userDao.delete(id, callback);
}