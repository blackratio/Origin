<<<<<<< Updated upstream
controllers.controller('homeCtrl', ['$scope', '$rootScope', '$http', '$timeout',
function ($scope, $rootScope, $http, $timeout) {
=======
controllers.controller('homeCtrl', ['$scope', '$rootScope', '$http', '$firebaseObject',
function ($scope, $rootScope, $http, $firebaseObject) {
>>>>>>> Stashed changes

   $scope.name = "Daphné";
   $scope.sayHello = function() {
      $scope.greeting = "Hello " + $scope.name;
   };

   var ref = new Firebase("https://blackratiobase.firebaseio.com/data");
   var syncObject = $firebaseObject(ref);
   console.log($firebaseObject(ref));
   // synchronize the object with a three-way data binding
   // click on `index.html` above to see it used in the DOM!
   syncObject.$bindTo($scope, "infos");

}]);


controllers.controller('componentsCtrl', ['$scope', '$rootScope', '$http', '$timeout', '$location',
function ($scope, $rootScope, $http, $timeout, $location) {

   $scope.name = "Raphael";
   $scope.sayHello = function() {
      $scope.greeting = "Hello " + $scope.name;
   };

}]);


controllers.controller('gettingStartCtrl', ['$scope', '$rootScope', '$http', '$timeout', '$location',
function ($scope, $rootScope, $http, $timeout, $location) {

   $scope.name = "David";
   $scope.sayHello = function() {
      $scope.greeting = "Hello " + $scope.name;
   };

}]);


controllers.controller('MyController', ['$scope',
function ($scope) {

   $scope.name = "Sydney";
   $scope.sayHello = function() {
      $scope.greeting = "Hello " + $scope.name;
   };

}]);
