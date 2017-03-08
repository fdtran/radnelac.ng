var calendar = angular.module('calendar', []);
calendar.controller('CalendarController', function( $scope, $location, Event , $window, UserFactory) {
  $scope.options = 'today';
  $scope.show = false;
  $scope.showAdd = true;
  $scope.missingFields = false;
  $scope.toggleForm = function () {
    $scope.show = !$scope.show;
  }
  $scope.toggleAdd = function () {
    $scope.showAdd = !$scope.showAdd;
  }
  $scope.events = [];
  $scope.daysArray = [];
  $scope.init = function () {
    $scope.username = UserFactory.get().username;
    $('.name').text($scope.username);
    if (!$window.localStorage.getItem('com.radnelac')) {
      $location.path('/signin');
    }
    Event.getAll((response) => {
      let current = new Date();
      let userFiltered = response.data.filter( item => item.username === $scope.username);
      let filtered;
      let filter = $scope.options;
      if(filter === 'today') {
        filtered = userFiltered.filter(item => {
          let eachDate = new Date(item.date);
          return eachDate.getMonth() === current.getMonth() && eachDate.getYear() === current.getYear() && eachDate.getDay() === current.getDay();
        });
      } else if (filter === 'past') {
        filtered = userFiltered.filter((item) => {
          return (new Date (item.time + ' ' + item.date)) < current;
        });
      } else if (filter === 'future') {
        filtered = userFiltered.filter((item) => {
          return (new Date (item.time + ' ' + item.date)) > current;
        });
      } else {
        filtered = userFiltered;
      }
      $scope.events = filtered.sort((a,b) => new Date(a.time+ ' ' + a.date)  < new Date(b.time + ' ' + b.date));
    });
  };
  $scope.hours = _.range(1,13);
  $scope.ampm = ['AM', 'PM'];
  $scope.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  $scope.minutes = ['00', '05'].concat(_.range(10,60, 5));
  $scope.days = function(month) {
    let index = $scope.months.indexOf(month);
    let num = 31;
    if ([3,5,8,10].indexOf(index) > -1) num = 30;
    else if (index === 1) num = 28;
    $scope.daysArray = _.range(1, num + 1);
  };
  $scope.getYears = function() {
    let current = new Date().getFullYear();
    return _.range(current, current + 10);  
  };

  $scope.filterEvents = function (filter) {
    $scope.options = filter;
    $scope.init();
  };
  $scope.getClass = function (event) {
    let diff = new Date(event.time + ' ' + event.date) -  (new Date());
    if(diff <= 7200000 && diff > 0) {
      return 'panel-danger';
    } else {
      return 'panel-primary'
    }
  };
  $scope.addEvent = function (name, description, time, date) {
    let args = [...arguments]
    if (_.some(args, item => item === null || item === undefined)) {
      $scope.missingFields = true;
    } else {
      let username = $scope.username;
      let eventObj = {
        username: username,
        name: name,
        description: description,
        time: time,
        date: date
      }
      Event.addEvent(eventObj);
      $scope.toggleForm();
      $scope.toggleAdd();
    }
    $scope.init();
  };

  $scope.deleteEvent = function (event) {
    Event.deleteEvent(event);
    $scope.init();
  };

  $scope.signOut = function () {
    $window.localStorage.removeItem('com.radnelac');
    UserFactory.set({username: ''});
    $location.path('/');
    $scope.init();
  };


});

calendar.controller('TimeController', function($scope, $timeout){
    $scope.clock = "loading...";
    $scope.tickInterval = 1000;
    var tick = function() {
        $scope.clock = Date.now();
        $timeout(tick, $scope.tickInterval); 
    }
    $timeout(tick, $scope.tickInterval);
});




