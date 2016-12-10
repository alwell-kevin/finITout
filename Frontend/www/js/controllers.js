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
          if (scope.onFocus) {
            $timeout(function() {
              scope.onFocus();
            });
          }
        });
        element.bind('blur', function(e) {
          if (scope.onBlur) {
            $timeout(function() {
              scope.onBlur();
            });
          }
        });
        element.bind('keydown', function(e) {
          if (e.which == 13) {
            if (scope.returnClose) element[0].blur();
            if (scope.onReturn) {
              $timeout(function() {
                scope.onReturn();
              });
            }
          }
        });
      }
    }
  })

  .controller('HomeCtrl', function($scope,$state) {

    $scope.data = {};

    $scope.searchNow = function() {
      console.log("key " + $scope.data.key);
      console.log("category " + $scope.data.category);
      $state.go('tab.home-search',{key:$scope.data.key,category:$scope.data.category});
      console.log("ended");
    }
  })
  .controller('NewHomeCtrl', function($scope,$state) {
    $scope.searchnow = function() {
      $state.go('tab.home');

    }
  })

  .controller('IotCtrl', function($scope,$q,$location, $state, $stateParams, $ionicPopup,$ionicLoading,IotService) {


    var promise = IotService.all($state.params.key,$state.params.category,"true");
    promise.then(
      function(payload){
        console.log("all ");

          $scope.data ={};
          $ionicPopup.alert({
            title: 'Threshold updated'
          });
      },
      function(errorPayload){
        console.log(errorPayload);
      }
    );
  })

  .controller('ChartCtrl', function($scope) {
    console.log("inside ChartCtrl");
    $scope.vm = {};
    $scope.vm.options = {};
    $scope.vm.data = {};
    $scope.data1 = [];
    var socket = io.connect("http://192.168.5.38:1337");
    socket.on("message", function (message) {
      console.log(message);
      $scope.data1.push({x: new Date(), y: message});
      $scope.$apply();
    });

    $scope.vm.options = {
      chart: {
        type: 'lineChart',
        height: 450,
        margin : {
          top: 20,
          right: 20,
          bottom: 40,
          left: 55
        },
        x: function(d){ return d.x; },
        y: function(d){ return d.y; },

        xAxis: {
          axisLabel: 'Time (seconds)',
          tickFormat: function(d){
            return d3.time.format('%S')(new Date(d));
          }
        },
        yAxis: {
          axisLabel: 'No. of Tilts',
          tickFormat: function(d){
            return d3.format('.02f')(d);
          },
          axisLabelDistance: -10
        },

      },
      title: {
        text: 'Customer Checkout Peak Hours'
      }

    };

    $scope.vm.data = [

      {
        values: $scope.data1
          //[{x: new Date('Sat, 19 Nov 2016 17:23:22 GMT'), y: 15},{x: new Date('Sat, 19 Nov 2016 17:23:30 GMT'), 
        // y: 15},{x: new Date('Sat, 19 Nov 2016 17:23:52 GMT'), y: 20},{x: new Date('Sat, 19 Nov 2016 17:23:56 GMT'),
        // y: 35},{x: new Date('Sat, 19 Nov 2016 17:23:59 GMT'), y: 55}],
      }

    ];
    console.log("ending ChartCtrl");
  })
  .controller('ChatCtrl', function($scope) {
    $scope.hideTime = true;
    
  }
)
  .controller('ProfileCtrl', function($scope) {
  })
  .controller('CallCtrl', function($scope) {
  });
