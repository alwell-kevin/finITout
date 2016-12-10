angular.module('app.routes', [])

  .config(function($stateProvider, $urlRouterProvider) {


    $stateProvider


      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

    

      .state('tab.home', {
        url: '/home',
        views: {
          'tab-home': {
            templateUrl: 'templates/tab-home.html',
            data: {
              css: 'styles/styles.css'
            },
            controller: 'HomeCtrl'
          }
        }
      })
      .state('tab.test', {
        url: '/test',
        views: {
          'tab-home': {
            templateUrl: 'templates/new-home.html',
            controller: 'NewHomeCtrl'
          }
        }
      })

      .state('tab.home-search', {
        url: '/search',
        views: {
          'tab-home': {
            templateUrl: 'templates/tab-iot-results.html',
            controller: 'IotCtrl'
          }
        },
        params: {
          'key': 'some default',
          'category': 'some default'
        }
      })
      .state('tab.new-questions', {
        url: '/new',
        views: {
          'tab-home': {
            templateUrl: 'templates/tab-iot-charts.html',
            controller: 'ChartCtrl'
          }
        }
      })
      .state('tab.chats', {
        url: '/chats',
        views: {
          'tab-home': {
            templateUrl: 'templates/tab-chats.html',
            controller: 'ChatCtrl'
          }
        }
      })
      .state('tab.profile', {
        url: '/profile',
        views: {
          'tab-profile': {
            templateUrl: 'templates/tab-profile.html',
            controller: 'ProfileCtrl'
          }}
      })
      .state('tab.call', {
        url: '/call',
        views: {
          'tab-home': {
            templateUrl: 'templates/tab-call.html',
            controller: 'CallCtrl'
          }}
      })
      .state('tab.top', {
        url: '/top',
        views: {
          'tab-home': {
            templateUrl: 'templates/tab-top.html',
            controller: 'MyQACtrl'
          }}
      });
    
    $urlRouterProvider.otherwise('/tab/test');

  });
