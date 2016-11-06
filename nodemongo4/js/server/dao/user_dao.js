
const mongodb = require('mongodb');

var db, collection;


mongodb.MongoClient.connect('mongodb://localhost:27017/nodemongo2', (err, database) => {
  if (err) return console.log(err)
  db = database;
  collection = db.collection('angular_users')
  console.log('Connected to mongodb...')
})

module.exports.findAll = function(callback){
  collection.find().toArray(function(err, result){
    if ( err ) throw err;
    callback(result);
  });
}

module.exports.findUserById = function(id,callback){
  collection.findOne({ _id: new mongodb.ObjectID( id ) }, (err, result) => {
    if ( err ) throw err;
    callback(result);
  });
}

module.exports.save = function(user,callback){
  collection.save(user, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
     callback({
      messaage:"Successfully added user",
      user:result
    });

  });
}

module.exports.update = function(id,user,callback){
  console.log('updated id...',id)
  delete user._id;
  collection.updateOne({ _id: new mongodb.ObjectID( id ) },{ $set: user }, (err, result) => {
    if (err) return console.log(err)

    console.log('updated  angular_users database')
    callback({
      messaage:"Successfully updated user",
      user:result
    });
  })
}

module.exports.delete = function(id,callback){
 
  collection.deleteOne({ _id: new mongodb.ObjectID( id ) }, (err, result) => {
    if (err) return console.log(err)

    console.log('deleted from angular_users database')
    callback({
      messaage:"Successfully deleted user",
      user:result
    });
  })
}
