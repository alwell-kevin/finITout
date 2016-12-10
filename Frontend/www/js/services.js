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

.factory('ChatService', function($q,$http) {
    return {
      get: function(message) {

      }
    };
}
);
