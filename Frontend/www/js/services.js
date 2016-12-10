angular.module('starter.services',[])

.factory('IotService', function($q,$http) {

  return {
    all: function(keyword,category,flag) {
      var deferred = $q.defer();
      //$http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      $http.get('http://192.168.5.38:3000/test' ,
        {
          params: {
            th1 : keyword,
            th2 : category

          }
        })
        .success(function(data) {
          var response =[];
          deferred.resolve("completed")
        })
        .error(function(msg, code) {
          deferred.reject(msg);

        });
      return deferred.promise;
    }
  };
})

.factory('TransactionService', function($q,$http) {
    return {
      get: function() {
        var deferred = $q.defer();
        $http.get('http://localhost:3001/api/transaction/dd22e9d5-e362-46ff-86aa-a42b49315e51').success(function(data){
          deferred.resolve(data);
        })
          .error(function(msg,code){
            deferred.reject(msg);
          });
        return deferred.promise;
      },
      post: function(ID,userResponse){
        const parameters = userResponse;
        const body = JSON.stringify(parameters);
        console.log("parameters", body);
        console.log("ID", ID);
        var deferred = $q.defer();
       /* const headers = new Headers({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': 'X-Requested-With'});*/
        $http.defaults.headers.post['Content-Type'] = 'application/json';
        //$http.defaults.headers.post['Access-Control-Allow-Headers'] = 'X-Requested-With';
       /* $http({method: 'POST',
          url: 'http://localhost:3001/api/transaction',
          headers: {
          'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'X-Requested-With'
        },
        data: body
      })*/
        $http.post('http://localhost:3001/api/transaction/'+ID, body)
        .success(function(data){
          deferred.resolve(data);
        })
          .error(function(msg,code){
            deferred.reject(msg);
          });
        return deferred.promise;
      }
    };
}
);
