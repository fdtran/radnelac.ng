var auth = angular.module('app.auth', []);
auth.controller('AuthController', function($scope, $location, User, $window, UserFactory) {
  $scope.inValid = false;
  $scope.passError = 'Invalid Username/Password Combination!';
  $scope.user = {};

  $scope.validate = function() {
    if (!$scope.user.username || !$scope.user.username) {
      $scope.inValid = true;
    }
  };

  $scope.signin = function() {
    UserFactory.set($scope.user);
    User.signin($scope.user, token => {
          if (token) {
            $window.localStorage.setItem('com.radnelac', token);
            $location.path('/');
          } else {
            $scope.inValid = true;
          }
        })
        .catch((err) => {
        });
  }

  $scope.signup = function() {
    User.signup($scope.user, function(token){
      $window.localStorage.setItem('com.radnelac', token);
      $location.path('/signin');
    });
  }

});