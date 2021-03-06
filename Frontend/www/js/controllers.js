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
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  //date
  var day = date.getDate();
  var yr = date.getFullYear();
  var month = date.getMonth() + 1;
  $scope.topActivated = false;
  $scope.bottomActivated = false;

  //time
  $scope.time = formatDate(date);
  $scope.date = month + '/' + day + '/' + yr;

  $scope.to = "PIER 11";
  $scope.from = "BELFORD";

  // $scope.login = function() {
  //   $state.go('tab.test');
  // }

  $scope.toFrom = function() {
    var to = $scope.to;
    $scope.to = $scope.from;
    $scope.from = to;
  }

  function formatDate(date) {
    var d = new Date(date);
    var hh = d.getHours();
    var m = d.getMinutes();

    var dd = "AM";
    var h = hh;
    if(h >= 12) {
      h = hh - 12;
      dd = "PM";
    }
    if(h == 0) {
      h = 12;
    }
    m = m < 10 ? "0" + m : m;

    /* if you want 2 digit hours:
    h = h<10?"0"+h:h; */

    var pattern = new RegExp("0?" + hh + ":" + m);

    var replacement = h + ":" + m;
    /* if you want to add seconds
    replacement += ":"+s;  */
    replacement += " " + dd;

    return replacement
  }

  $scope.topActivate = function(){
    $scope.topActivated = !$scope.topActivated;
  }

  $scope.bottomActivate = function(){
    $scope.bottomActivated = !$scope.bottomActivated;
  }
})

.controller('TransactionCtrl', function($scope, $state, $ionicPopup) {
    $scope.data = {};
    $scope.transactions = [{ Date: "2016-06-30T04:00:00.000Z", elderID: 234234234, timestamp: "01/27/92", Status: 0, Amount: 9999, Description: "Status is false", Notification: 0, Fraud: 0 },
      { Date: "2016-06-30T04:00:00.000Z", elderID: 234234234, timestamp: "01/27/92", Status: 1, Amount: 9999, Description: "this is approved", Notification: 0, Fraud: 0 },
      { Date: "2016-06-30T04:00:00.000Z", elderID: 234234234, timestamp: "01/27/92", Status: null, Amount: 9999, Description: "Has no status is pending", Notification: 0, Fraud: 0 },
      { elderID: 234234234, timestamp: "01/27/92", Amount: 9999, Description: "this is a Description", Notification: 0, Fraud: 0 }, { elderID: 234234234, timestamp: "01/27/92", Status: 1, Amount: 9999, Description: "this is a Description", Notification: 0, Fraud: 0 }, { elderID: 234234234, timestamp: "01/27/92", Status: 0, Amount: 9999, Description: "this is a Description", Notification: 0, Fraud: 0 }, { elderID: 234234234, timestamp: "01/27/92", Status: 0, Amount: 9999, Description: "this is a Description", Notification: 0, Fraud: 0 }, { elderID: 234234234, timestamp: "01/27/92", Status: 1, Amount: 9999, Description: "this is a Description", Notification: 0, Fraud: 0 }, { elderID: 234234234, timestamp: "01/27/92", Status: 1, Amount: 9999, Description: "this is a Description", Notification: 0, Fraud: 0 }, { elderID: 234234234, timestamp: "01/27/92", Status: 0, Amount: 9999, Description: "this is a Description", Notification: 0, Fraud: 0 }, { elderID: 234234234, timestamp: "01/27/92", Status: 0, Amount: 9999, Description: "this is a Description", Notification: 0, Fraud: 0 }, { elderID: 234234234, timestamp: "01/27/92", Status: 1, Amount: 9999, Description: "this is a Description", Notification: 0, Fraud: 0 }, { elderID: 234234234, timestamp: "01/27/92", Status: 0, Amount: 9999, Description: "this is a Description", Notification: 0, Fraud: 0 }, { elderID: 234234234, timestamp: "01/27/92", Status: 1, Amount: 9999, Description: "this is a Description", Notification: 0, Fraud: 0 }, { elderID: 234234234, timestamp: "01/27/92", Amount: 9999, Description: "this is a Description", Notification: 0, Fraud: 0 }
    ];
    $scope.getItem = function(transaction) {
      $state.go("tab.details", { obj: transaction });
    }
  })
  .controller('DetailsCtrl', function($scope, $state, $ionicPopup, $location) {
    $scope.hideTime = true;
    $scope.transaction = {};

    $scope.transaction = $state.params.obj;

    $scope.decision = function(value) {
      $scope.userResponse = {};
      if(value) {
        $ionicPopup.alert({
          title: 'Transaction Approved',
          template: '<ion-checkbox ng-model="userResponse.Notification"><small>Notify for vendor?</small></ion-checkbox>',
          scope: $scope
        }).then(function(res) {
          if($scope.userResponse.Notification) {
            $scope.userResponse.Notification = 1;
          } else { $scope.userResponse.Notification = 1; }

          $scope.userResponse = {
            Status: 1
          };
          $location.path("/tab/transactionlist");
        });

      } else {
        $ionicPopup.alert({
          title: 'Transaction Rejected',
          template: '<ion-checkbox ng-model="userResponse.Fraud">Notify for vendor?</ion-checkbox>'
        }).then(function(res) {

          console.log($scope.userResponse.Fraud);
          userResponse = {
            Status: 0
          };
          $location.path("/tab/transactionlist");
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

  $scope.data = {};

  $scope.searchNow = function() {
    console.log("key " + $scope.data.key);
    console.log("category " + $scope.data.category);
    $state.go('tab.home-search', { key: $scope.data.key, category: $scope.data.category });
    console.log("ended");
  }
})

.controller('IotCtrl', function($scope, $q, $location, $state, $stateParams, $ionicPopup, $ionicLoading, IotService) {


  var promise = IotService.all($state.params.key, $state.params.category, "true");
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
  );
})

.controller('ChartCtrl', function($scope) {
  console.log("inside ChartCtrl");
  $scope.vm = {};
  $scope.vm.options = {};
  $scope.vm.data = {};
  $scope.data1 = [];
  var socket = io.connect("http://192.168.5.38:1337");
  socket.on("message", function(message) {
    console.log(message);
    $scope.data1.push({ x: new Date(), y: message });
    $scope.$apply();
  });

  $scope.vm.options = {
    chart: {
      type: 'lineChart',
      height: 450,
      margin: {
        top: 20,
        right: 20,
        bottom: 40,
        left: 55
      },
      x: function(d) {
        return d.x;
      },
      y: function(d) {
        return d.y;
      },

      xAxis: {
        axisLabel: 'Time (seconds)',
        tickFormat: function(d) {
          return d3.time.format('%S')(new Date(d));
        }
      },
      yAxis: {
        axisLabel: 'No. of Tilts',
        tickFormat: function(d) {
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

    }

  ];
  console.log("ending ChartCtrl");
})



.controller('ProfileCtrl', function($scope) {})
  .controller('CallCtrl', function($scope) {});