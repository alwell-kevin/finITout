angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {


  $stateProvider

    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    
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
.state('tab.details', {
  url: '/details',
  views: {
    'tab-home': {
      templateUrl: 'templates/tab-details.html',
      controller: 'DetailsCtrl'
    }
  }
})
.state('tab.profile', {
  url: '/profile',
  views: {
    'tab-profile': {
      templateUrl: 'templates/tab-profile.html',
      controller: 'ProfileCtrl'
    }
  }
})
.state('tab.call', {
  url: '/call',
  views: {
    'tab-home': {
      templateUrl: 'templates/tab-call.html',
      controller: 'CallCtrl'
    }
  }
})

$urlRouterProvider.otherwise('/login');

});
