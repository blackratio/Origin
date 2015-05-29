'use strict';

var services = angular.module('services', []);
var controllers = angular.module('controllers', []);
var directives = angular.module('directives', []);
var lodash = angular.module('lodash', []);

var CortexFramework = angular.module('CortexFramework', [
   'services',
   'controllers',
   'directives',
   'ui.router',
   'lodash'
]);


CortexFramework.config(['$stateProvider', '$provide', '$urlRouterProvider', '$httpProvider', '$locationProvider', '$compileProvider',
function ($stateProvider, $provide, $urlRouterProvider, $httpProvider, $locationProvider, $compileProvider) {

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
         pageTitle: 'Cortex Framework Home',
         section: 'home'
      }
   })

   .state('gettingstarted', {
      url: '/gettingstarted',
      views: {
         'main_content': {
            templateUrl: 'partials/gettingstarted.html',
            controller: 'homeCtrl'
         }
      },
      data : {
         mainSection: 'framework',
         pageTitle: 'Cortex Framework Typography',
         section: 'typography'
      }
   })

}]);


CortexFramework.run(['$rootScope', '$state', '$stateParams',
function ($rootScope, $state, $stateParams) {

   $rootScope.$state = $state;
   $rootScope.$stateParams = $stateParams;

}]);
