controllers.controller('homeCtrl', ['$scope', '$rootScope', '$http',
function ($scope, $rootScope, $http) {

   $scope.name = "Daphné";
   $scope.sayHello = function() {
      $scope.greeting = "Hello " + $scope.name;
   };

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
