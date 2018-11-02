
window.adopisowifi.config([
  '$urlRouterProvider',
  '$stateProvider',
  function($urlRouterProvider, $stateProvider) {

    $stateProvider
      .state({
        abstract: true,
        name: 'dashboard',
        url: '/dashboard',
        templateUrl: 'dashboard/dashboard.html',
        resolve: {
          user: [
            'adoAuth',
            function (Auth) {
              return Auth.check();
            }
          ]
        }
      })
      .state({
        name: 'dashboard.index',
        url: '',
        templateUrl: 'dashboard/index.html'
      });

    $urlRouterProvider.otherwise('/');

  }
]);

