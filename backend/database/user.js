var dao = require('./dao');


var getUserById = function(id){
  var statement = "SELECT * FROM userLink where tomID = '"+id+"'";
  dao.query(statement, function(resolve, reject, rows){
    console.log(rows);
    resolve(rows);
  });
}

var getUserByElderId = function(id){
  var statement = "SELECT * FROM userLink where elderID = '"+id+"'";
  dao.query(statement, function(resolve, reject, rows){
    console.log(rows);
    resolve(rows);
  });
}

var addUser = function(user) {
  var statement = "INSERT INTO `userLink` (`elderID`, `tomID`) VALUES ('"+user.elderID+"', '"+user.tomID+"')";
  dao.query(statement, function(resolve, reject, rows){
    console.log(rows);
    resolve(rows);
  });
}

module.exports = {
  getUserById: getUserById,
  getUserByElderId: getUserByElderId,
  addUser: addUser
}