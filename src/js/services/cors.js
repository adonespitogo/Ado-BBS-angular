
window.adopisowifi
  .factory('CorsInterceptor', [
    '$window',
    '$q',
    '$env',
    function ($window, $q, $env) {
      return {
        request: function (config) {

          var reg = /\.(jpeg|jpg|png|gif|html|js|css)\b/;

          if(!reg.test(config.url)) {
            config.withCredentials = true;
            config.url = (config.corsServer || $env.server) + config.url;
          }

          return config;
        }
      };
    }
  ])
  .config([
    '$httpProvider',
    function ($httpProvider) {
      $httpProvider.defaults.useXDomain = true;
      $httpProvider.defaults.withCredentials = true;
      $httpProvider.interceptors.push('CorsInterceptor');
    }
  ]);
