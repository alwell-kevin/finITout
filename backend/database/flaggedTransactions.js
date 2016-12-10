var _ = require('underscore');
var dao = require('./dao');

var defaults = {
  elderID: null,
  Description: null,
  Amount: null,
  Status: null,
  Faud: null
}


var addFlaggedTransaction = function(flaggedTransaction){
  _.extend({}, defaults, flaggedTransaction);
  var statement = "INSERT INTO `flagTransaction` (`elderID`, `Description`, `Amount`, `Status`, `Notification`, `Fraud`) VALUES ('"+flaggedTransaction.elderID+"', '"+flaggedTransaction.Description+"', '"+flaggedTransaction.Amount+"', '"+flaggedTransaction.Status+"', '"+flaggedTransaction.Notification+"', '"+flaggedTransaction.Fraud+"')"

  dao.query(statement, function(resolve, reject, rows){
    console.log(rows);
    resolve(rows);
  });

};

var getFlaggedTransactionsByElderId = function(elderId){
  var statement = "SELECT * FROM `flagTransaction` WHERE `elderID` = '"+elderId+"'";

  dao.query(statement, function(resolve, reject, rows){
    console.log(rows);
    resolve(rows);
  });

}

//list the flagged transactions that the user hasn't responded to yet.
var getPendingFlaggedTransactions = function(elderId){

  var statement = "SELECT * FROM `flagTransaction` WHERE `elderID` = '"+elderId+"' AND `Status` IS NULL";
  dao.query(statement, function(resolve, reject, rows){
    console.log(rows);
    resolve(rows);
  });

}

//list the flagged transactions that the user has responded to yet.
var getNonPendingFlaggedTransactions = function(elderId){

  var statement = "SELECT * FROM `flagTransaction` WHERE `elderID` = '"+elderId+"' AND `Status` IS NOT NULL";
  dao.query(statement, function(resolve, reject, rows){
    console.log(rows);
    resolve(rows);
  });

}

var matchTransaction = function(elderId, description, amount){
  //TODO verify arguments not missing
  var statement = "SELECT * FROM `flagTransaction` WHERE `elderID` = '"+elderId+"' AND `Amount` = '"+amount+"' AND `Description` = '"+description+"' AND `Status` IS NOT NULL LIMIT 1";

  dao.query(statement, function(resolve, reject, rows){
    console.log(rows);
    resolve(rows);
  });

}


module.exports = {
  addFlaggedTransaction: addFlaggedTransaction,
  getFlaggedTransactionsByElderId: getFlaggedTransactionsByElderId,
  getPendingFlaggedTransactions: getPendingFlaggedTransactions,
  matchTransaction: matchTransaction

};