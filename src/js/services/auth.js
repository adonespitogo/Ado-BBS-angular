window.adopisowifi
  .service('Auth', [
    '$auth',
    '$state',
    'toastr',
    '$http',
    '$env',
    '$cookies',
    'authState',
    function ($auth, $state, toastr, $http, $env, $cookies, authState) {

      this.check = function () {
        return $auth.validateUser()
          .then(function (user) {
            authState.set(true);
            return user;
          })
          .catch(function () {
            authState.set(false);
            $state.go('login');
          });
      };

      this.login = function (user) {
        return $auth
          .submitLogin(user)
          .then(function (res) {
            authState.set(true);
            return res;
          });
      };

      this.resendConfirmation = function (user) {
        var loc = window.location;
        var host = loc.protocol + '//' + loc.hostname + ':' + loc.port;
        console.log('host', host);
        var data = {
          user: user,
          redirect_url: host + '#!/register',
          confirm_success_url: host + '#!/register',
          g_recaptcha_response: user.g_recaptcha_response
        };

        delete user.g_recaptcha_response;

        return $http.post('/api/auth/confirmation', data);
      };

    }
  ])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push([
      '$rootScope',
      '$q',
      'authState',
      function($rootScope, $q, authState) {

        return {
          responseError: function(rejection) {
            var config = rejection.config || {};
            var code = rejection.status;
            if (!config.ignoreAuthModule && (code === 401 || code === 403)) {
              if (authState.get())
                $rootScope.$broadcast('auth:401');
              authState.set(false);
            }
            // otherwise, default behaviour
            return $q.reject(rejection);
          }
        };
      }]);
  }])
  .factory('authState', [
    function () {
      var has_auth_error;
      return {
        set: function (bol) {
          has_auth_error = bol;
        },
        get: function () {
          return has_auth_error;
        }
      };
    }
  ])
  .run([
    '$rootScope',
    'toastr',
    '$state',
    function ($rootScope, toastr, $state) {

      $rootScope.$on('auth:401', function () {
        toastr.error("Session expired.");
        $state.go('login');
      });

    }
  ]);

