 var http = require('http');

 var get = function(host, path){
  return new Promise(function(resolve, reject){
    http.get({host: host, path: path}, function(response){
      var body = '';
      response.on('data', function(d){
        body += data;
      })
      response.on('end', function(){
        response.body = JSON.parse(body);

      });
    });
    resolve();
  });
 }




module.exports = {

};