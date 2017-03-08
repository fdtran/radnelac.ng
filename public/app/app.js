var app = angular.module('app', ['calendar', 'app.services', 'app.auth', 'ngRoute']);

app.config(function($routeProvider, $httpProvider) {
  $routeProvider.when('/', {
    templateUrl: './app/views/calendar/calendar.html',
    controller: 'CalendarController'
  })
  .when('/signin', {
    templateUrl: './app/views/auth/signin.html',
    controller: 'AuthController'
  })
  .when('/signup', {
    templateUrl: './app/views/auth/signup.html',
    controller: 'AuthController'
  }) 
  $httpProvider.interceptors.push('AttachTokens');
})

app.factory('AttachTokens', function ($window) {
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.shortly');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
});

app.factory('UserFactory', function(){
  var user = {};
  function set(userObj) {
    user = userObj;
  }
  function get() {
    return user;
  }
  return {
    set: set,
    get: get
  }

})