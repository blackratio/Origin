services.factory('playerService', ['$http', '$rootScope', '$q', function ($http, $rootScope, $q) {

   return {

      getPlayer: function() {

         var deferred = $q.defer();
         var url = '/api/players';

         $http({
            method :'GET',
            url: url
         })
         .success (function(data) {
            deferred.resolve(data);
         })

         .error (function(data, status, headers, config){
            deferred.reject();
         })
         return deferred.promise;

      },

      postPlayer: function(datas) {

         var deferred = $q.defer();
         var url = '/api/players';

         $http({
            method :'POST',
            url: url,
            data: datas,
            headers: {'Content-Type': 'application/json'}
         })
         .success (function(data) {
            deferred.resolve(data);
         })

         .error (function(data, status, headers, config){
            deferred.reject();
         })
         return deferred.promise;

      }

   }

}]);
