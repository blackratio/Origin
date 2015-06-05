controllers.controller('homeCtrl', ['$scope', '$rootScope', '$http',
function ($scope, $rootScope, $http) {

}]);

controllers.controller('componentsCtrl', ['$scope', '$rootScope', '$http', '$timeout',
function ($scope, $rootScope, $http, $timeout) {

   $timeout(function() {
      $(function(){
         $(window).scroll(function() {
           if ($(this).scrollTop() >= 30) {
               $('.fixThis').addClass('stickytop');
           }
           else if ($(this).scrollTop() <= 100) {
               $('.fixThis').removeClass('stickytop');
           }
         });
      });
   }, 100);
   console.log('components controller');

}]);
