var _ = require('underscore');
var database = require('../database');

var testHistory =  [
   {
     "operation_number": "7",
     "posted_date": "2016-10-03",
     "description": "Test Transaction_06",
     "amount": 6,
     "posted_balance": 120,
     "currency": "USD",
     "transaction_type": "ACH CREDIT",
   },
   {
     "operation_number": "6",
     "posted_date": "2016-10-03",
     "description": "Test Transaction_05",
     "amount": 5,
     "posted_balance": 114,
     "currency": "USD",
     "transaction_type": "INTEREST ADJUSTMENT",
   },
   {
     "operation_number": "5",
     "posted_date": "2016-10-03",
     "description": "Test Transaction_04",
     "amount": 4,
     "posted_balance": 109,
     "currency": "USD",
     "transaction_type": "DEPOSIT",
   }
 ];



var testTransaction = {
   "operation_number": "5",
   "posted_date": "2016-10-03",
   "description": "Test Transaction_04",
   "amount": 6,
   "posted_balance": 109,
   "currency": "USD",
   "transaction_type": "DEPOSIT",
};


//return true if the transaction is an anomaly based on the provided history of the user
function isAnomaly(elderId, history, transaction){
  return new Promise(function(resolve, reject){
    var numTransactions = history.length;
    var sum = 0;

    history = _.filter(history, function(transaction){
      var filter = transaction.transaction_type === 'ACH CREDIT';
      if(filter){
        sum += transaction.amount;
      }
      return filter;
    });
    history = _.sortBy(history, 'amount');

    var average = sum/numTransactions;
    console.log('average='+average);
    var limit = average*1.2;
    console.log('limit='+limit);
    console.log('comparing ' + transaction.amount + ' to ' + limit);
    if(transaction.amount <=limit){
      reject();
      return;
    }
    database.flaggedTransactions.matchTransaction(elderId, transaction.description, transaction.amount).then(function(data){
      console.log(data);
      if(data.length === 0){
        //TODO return true
        resolve();
      }
      else {
        var flaggedTransaction = data[0];
        if(flaggedTransaction.Notification === 1){
          resolve();
        }
        else {
          reject();
        }
      }
    }, function(err){
      console.log(err);
    });
  });
  
}

module.exports = {
  isAnomaly: isAnomaly,

};


console.log(isAnomaly(testHistory, testTransaction));