angular.module('app.services', [])
       .service('Event', function($http) {
          this.getAll = function (cb) {
            return $http({
              method: 'GET',
              url: 'api/event'
            }).then((response) => {
              cb(response);
              return response;
            });
          },

          this.addEvent = function(event) {
            return $http({
              method: 'POST',
              url: 'api/event',
              data: event
            });
          }

          this.deleteEvent = function(event) {
            return $http({
              method:'POST',
              url: 'api/delete',
              data: event
            });
          }
        })
        .service('User', function($http) {
          this.signup = function(user, cb) {
            return $http({
              method: 'POST',
              url: 'api/user/signup',
              data: user
            })
            .then((response) => {
              cb(response.data.token);
              return response.data.token;
            })
          },

          this.signin = function(user, cb) {
            return $http({
              method: 'POST',
              url: 'api/user/signin',
              data: user
            }).then((response) => {
              cb(response.data.token);
              return response.data.token;
            });
          }
        });



