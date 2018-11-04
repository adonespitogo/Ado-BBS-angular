(function () {
  'use strict';

  angular.module('AdoBBS').service('Post', [
    '$http',
    'envService',
    'catchHttpError',
    function Post($http, envService, catchHttpError) {

      this.get = function (id) {
        return $http.get(envService.read('apiBaseUrl') + envService.read('apiForumUri') + '/posts/' + id );
      };
    
    }
  ]);

})();
