function strictMode() {
    "use strict";
    return true;
}

var services = angular.module('services', []);
var controllers = angular.module('controllers', []);
var directives = angular.module('directives', []);
var ngStorage = angular.module('ngStorage', []);
var lodash = angular.module('lodash', []);

var OriginFramework = angular.module('OriginFramework', [
   'services',
   'controllers',
   'directives',
   'ui.router',
   'lodash',
   'ngStorage'
]);


OriginFramework.config(['$stateProvider', '$provide', '$urlRouterProvider', '$httpProvider', '$locationProvider', '$compileProvider',
function ($stateProvider, $provide, $urlRouterProvider, $httpProvider, $locationProvider, $compileProvider) {
"use strict";
   // Pour toute route inapproprié
   $urlRouterProvider.otherwise('/');

   // Active le mode HTML5, pas de # dans l'URL
   //$locationProvider.html5Mode(true);

   //$httpProvider.interceptors.push('interceptor');

   // Token interceptor
   //$httpProvider.interceptors.push('TokenInterceptor');


   // Enable/disable Angular Debug Mod
   $compileProvider.debugInfoEnabled(true);


   //////////////////////////////////////////////////////////////////////////////////////////////

   /// GESTION DES ROUTAGES

   // -> Un state correspond à une route et/ou vue
   // -> data : titre de la page

   //////////////////////////////////////////////////////////////////////////////////////////////



   $stateProvider


   /////////////////////////////////////////////////////////////

   //	HOMEPAGE

   /////////////////////////////////////////////////////////////

   .state('home', {
      url: '/',
      views: {
         'main_content': {
            templateUrl: 'partials/index.html',
            controller: 'homeCtrl'
         }
      },
      data : {
         mainSection: 'framework',
         pageTitle: 'Welcome - Origin',
         section: 'home'
      }
   })

   .state('getStarted', {
      url: '/getStarted',
      views: {
         'main_content': {
            templateUrl: 'partials/getstarted/index.html',
            controller: 'getStartedCtrl'
         }
      },
      data : {
         mainSection: 'framework',
         pageTitle: 'Get Origin & installation guideline',
         section: 'getStarted'
      }
   })

   .state('docs', {
      url: '/docs',
      views: {
         'main_content': {
            templateUrl: 'partials/docs/index.html',
            controller: 'componentsCtrl'
         }
      },
      data : {
         mainSection: 'framework',
         pageTitle: 'Featured',
         section: 'docs'
      }
   });

}]);


OriginFramework.run(['$rootScope', '$state', '$stateParams',
function ($rootScope, $state, $stateParams) {

   $rootScope.$state = $state;
   $rootScope.$stateParams = $stateParams;

}]);
