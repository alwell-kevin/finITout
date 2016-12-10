var mysql      = require('mysql');
var _ = require('underscore');

var host = 'finitout.cqvdwglmsqny.us-east-1.rds.amazonaws.com';
var user = 'finitout';
var pass = 'finitout';
var database = 'finitout';

var pool = mysql.createPool({
  connectionLimit: 100,
  host: host,
  user: user,
  password: pass,
  database: database,
  debug: false
});


var query = function(statement, cb){
  return new Promise(function(resolve, reject){
    pool.getConnection(function(err,connection){
      if (err) {
        reject(err);
        return;
      }
      console.log('Running statement: ' + statement);
      connection.query(statement,function(err,rows){
        connection.release();
        if(!err) {
          cb(resolve, reject, rows);
        }
        else{
          reject(err);
          return;
        }        
      });

      connection.on('error', function(err) {      
        reject(err);
        return;     
      });
    });
  });
  
}
//UPDATE `tablename` SET <updateString> WHERE `id` = '123'
var buildUpdateString = function(attributes){
  var updateStr = "";
  _.each(attributes, function(val, key){
    if(updateStr.length !== 0){
      updateStr += ", "
    }
    updateStr += ' ' + key + ' = ' + (val==null?'NULL':'\''+val+'\'');
  });

  return updateStr
}

module.exports = {
  query: query,
  buildUpdateString: buildUpdateString
}