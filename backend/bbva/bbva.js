var http = require('https');
var uuid = require('uuid/v4');

var secret = 'Basic YXBwLmNvbXBhc3MuZmluaXRvdXQ6N3BqM1Q3dHVhalQ0djhnN25uWmV3NHlxYU1TVjRZZlNuNDVTdnRaWHhDV1M3dTFoWVdRZTFIbTNuOG5LTHBOZQ==';
var token = null;

var get = function(host, path){
  return new Promise(function(resolve, reject){

    var sendRequest = function(){
      console.log('sending get request');
      var opts = {
        protocol: 'https:',
        host: host, 
        path: path,
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-Unique-Transaction-ID": uuid(),
          "Authorization": token?token:secret
        }
      }
      var req = http.request(opts, function(response){
        var body = '';
        response.on('data', function(d){
          body += d;
        })
        response.on('end', function(){
          response.body = JSON.parse(body);
          resolve(response);
        });
      });
      req.end();
    }
    //send request if the token isn't null
    if(token != null){
      sendRequest();
    }
    else {
      post(host, '/auth/tsec/token?grant_type=client_credentials').then(function(response){
        getTokenResponse(response);
        sendRequest();
      }, function(e){
        console.log(e);
      })
    }
  });
}

var post = function(host, path, body) {
  return new Promise(function(resolve, reject){
    var sendRequest = function(){
      console.log('sending post request');
      var req = http.request({
        protocol: 'https:',
        host: host,
        path: path,
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-Unique-Transaction-ID": uuid(),
          "Authorization": token?token:secret
        }
      }, function(response){
         var body = '';
          response.on('data', function(d){
            body += d;
          })
          response.on('end', function(){
            response.body = JSON.parse(body);
            resolve(response);
          });
      });
      if(body != null){
        req.write(req.stringify(body));
      }
      req.end();

    }
    if(token != null || path === '/auth/tsec/token?grant_type=client_credentials'){
        sendRequest();
    }
    else {
      post(host, '/auth/tsec/token?grant_type=client_credentials').then(function(response){
        getTokenResponse(response);
        sendRequest();
      }, function(e){
        console.log( e);
      })
    }
  });
}


var getTokenResponse = function(response){
  console.log(response.body);
  token = 'tsec '+response.body.access_token;
  //token lasts about 2 hours. Lets reset it when we're close
  setTimeout(function(){token = null;}, 7000);
}



module.exports = {
  test: function(){
    get('sandbox-apis.bbvacompass.com', '/api/v2/users/dd22e9d5-e362-46ff-86aa-a42b49315e51').then(function(response){
      console.log(response);
    });
  }
};