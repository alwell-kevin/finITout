angular.module('starter.controllers', [])

.directive('input', function($timeout) {
  return {
    restrict: 'E',
    scope: {
      'returnClose': '=',
      'onReturn': '&',
      'onFocus': '&',
      'onBlur': '&'
    },
    link: function(scope, element, attr) {
      element.bind('focus', function(e) {
        if(scope.onFocus) {
          $timeout(function() {
            scope.onFocus();
          });
        }
      });
      element.bind('blur', function(e) {
        if(scope.onBlur) {
          $timeout(function() {
            scope.onBlur();
          });
        }
      });
      element.bind('keydown', function(e) {
        if(e.which == 13) {
          if(scope.returnClose) element[0].blur();
          if(scope.onReturn) {
            $timeout(function() {
              scope.onReturn();
            });
          }
        }
      });
    }
  }
})

.controller('LoginCtrl', function($scope, $state) {
  $scope.data = {};

  $scope.login = function() {
    $state.go('tab.test');
  }
})


.controller('TransactionCtrl', function($scope, $state,$ionicPopup,TransactionService) {
  $scope.data = {};
  $scope.transactions = [];

  var promise = TransactionService.get();
  promise.then(
    function(data){
      $scope.transactions = data;
      console.log("got updated data");
      console.log( $scope.transactions );

      var socket = io.connect("http://localhost:3001"); 
      socket.on("notification", function(notification) {


          $ionicPopup.alert({ title: 'New Anomaly Detected'});
          var promise = TransactionService.get();
          promise.then( function(data){
              $scope.transactions = data;
              console.log("got updated alert and updated list transaction data");
              console.log( $scope.transactions );
            },
            function(error){
              console.log(error); 
            } );


      } );
    },
    function(error){
      console.log(error);
    }
  );
  $scope.getItem = function(transaction){
    $state.go("tab.details", {obj:transaction});
  }
})
  .controller('DetailsCtrl', function($scope,$state,$ionicPopup,$location,TransactionService) {
    $scope.hideTime = true;
    $scope.transaction = {};

    console.log($state.params.obj);
    $scope.transaction = $state.params.obj;
    $scope.decision = function (value) {
      $scope.userResponse = {};
      if (value) {
        $ionicPopup.alert({
          title: 'Transaction Approved',
          template: '<ion-checkbox ng-model="userResponse.Notification"><small>Notify for vendor?</small></ion-checkbox>',
          scope: $scope
        }).then(function (res) {
          userResponse = {
            Status: value ? 1 : 0,
            Notification: $scope.userResponse.Notification ? 1 : 0
          };
          console.log("accepted response is");
          console.log(userResponse);
          console.log($scope.transaction.ID);
          var promise = TransactionService.post($scope.transaction.ID, userResponse);
          promise.then(
            function (data) {
              console.log("data posted");

              $location.path("/tab/transactionlist");
            },
            function (error) {
              console.log(error);
            }
          );

        });

      }
      else {
        $ionicPopup.alert({
          title: 'Transaction Rejected',
          template: '<ion-checkbox ng-model="userResponse.Fraud">Notify for vendor?</ion-checkbox>',
          scope: $scope
        }).then(function (res) {
          userResponse = {
            Status: value ? 1 : 0,
            Fraud: $scope.userResponse.Fraud ? 1 : 0
          };
          console.log("rejected response is ");
          console.log(userResponse);
          console.log($scope.transaction.ID);
          var promise = TransactionService.post($scope.transaction.ID, $scope.userResponse);
          promise.then(
            function (data) {
              console.log("data posted");
              $location.path("/tab/transactionlist");
            },
            function (error) {
              console.log(error);
            }
          );

        });

      }
    }
  })


.controller('NewHomeCtrl', function($scope, $state) {
  $scope.goList = function() {
    $state.go('tab.transactionlist');
  }
})

.controller('HomeCtrl', function($scope, $state) {

 /* $scope.data = {};

  $scope.searchNow = function() {
    console.log("key " + $scope.data.key);
    console.log("category " + $scope.data.category);
    $state.go('tab.home-search', { key: $scope.data.key, category: $scope.data.category });
    console.log("ended");
  }*/
})

.controller('IotCtrl', function($scope, $q, $location, $state, $stateParams, $ionicPopup, $ionicLoading, IotService) {


 /* var promise = IotService.all($state.params.key, $state.params.category, "true");
  promise.then(
    function(payload) {
      console.log("all ");

      $scope.data = {};
      $ionicPopup.alert({
        title: 'Threshold updated'
      });
    },
    function(errorPayload) {
      console.log(errorPayload);
    }
  );*/
})

.controller('ChartCtrl', function($scope) {

    console.log("inside ChartCtrl");
  
})
.controller('ProfileCtrl', function($scope) {})
  .controller('CallCtrl', function($scope) {});
