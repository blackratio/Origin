controllers.controller('homeCtrl', ['$scope', '$rootScope', '$http',
function ($scope, $rootScope, $http) {

}]);

controllers.controller('componentsCtrl', ['$scope', '$rootScope', '$http', '$timeout', 'anchorSmoothScroll', '$location',
function ($scope, $rootScope, $http, $timeout, anchorSmoothScroll, $location) {

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

   $scope.gotoElement = function (eID){
      // set the location.hash to the id of
      // the element you wish to scroll to.
      //$location.hash('paragraph');

      // call $anchorScroll()
      anchorSmoothScroll.scrollTo(eID);
      console.log(eID);

    };

}]);
