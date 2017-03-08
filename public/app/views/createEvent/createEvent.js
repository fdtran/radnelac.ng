// var app = angular.module('app.create', ['angularModalService']);

// app.controller('CreateController', function($scope, ModalService) {
//   console.log('hiiiii');
//   ModalService.showModal({
//     templateUrl: "createEvent.html",
//     controller: "ModalController"
//   })
//   .then(function(modal){
//     modal.element.modal();
//     modal.close.then(function(result){
//       console.log(result);
//     });
//   });
//   $scope.close = function(result) {
//  	  close(result, 500); // close, but give 500ms for bootstrap to animate
//   };

// });

// app.controller('ModalController', function($scope, close) {
//   $scope.close = function(result) {
//     close(result, 500);
//   }
// });