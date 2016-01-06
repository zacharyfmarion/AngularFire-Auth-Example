var app = angular.module('myApp', ['firebase']);

app.controller('tasksCtrl', function($scope, $firebaseArray, $firebaseAuth){

  // Setting up firebase
  var baseRef = new Firebase("https://angular-semantic.firebaseio.com/");
  // getting auth object
  var auth = new $firebaseAuth(baseRef);
  // creating a tasks array...empty for now
  $scope.tasks = [];
  // user object, yet to be defined
  $scope.user = {};

  // Auth login
  $scope.googleAuth = function(){
    auth.$authWithOAuthPopup('google').then(function(authData){
      console.log("logged in as:", authData.uid);
      var userRef = new Firebase("https://angular-semantic.firebaseio.com/" + authData.uid);
      $scope.user = authData;
      $scope.tasks = $firebaseArray(userRef);
      // Show the welcome message
      $('#welcomeNag').nag('show');
    }).catch(function(err){
      console.log("authentication failed:", error);
    });
  };

  $scope.removeTask = function(index){
    $scope.tasks.$save($scope.tasks[index]);
  };

  $scope.addTask = function(){
    var task = {
      description: $scope.in.newTask,
      completed: false
    };
    $scope.tasks.$add(task);
  };

  $scope.allTasksCompleted = function(){
    var allCompleted = true;
    for (var key in $scope.tasks){
      if ($scope.tasks.hasOwnProperty(key)){
        if ($scope.tasks[key].completed !== true){
          allCompleted = false;
        }
      }
    }
    return allCompleted;
  };

  $scope.noTasksCompleted = function(){
    var noneCompleted = true;
    for (var key in $scope.tasks){
      if ($scope.tasks.hasOwnProperty(key)){
        if ($scope.tasks[key].completed === true){
          noneCompleted = false;
        }
      }
    }
    return noneCompleted;
  };

});
