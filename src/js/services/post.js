(function () {
  'use strict';

  angular.module('AdoBBS').service('Post', [
    '$http',
    'catchHttpError',
    function Post($http, catchHttpError) {

      this.get = function (id) {
        return $http.get('');
      };
    
    }
  ]);

})();
