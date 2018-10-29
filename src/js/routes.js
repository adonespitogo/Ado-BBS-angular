
window.adopisowifi.config([
  '$urlRouterProvider',
  '$stateProvider',
  function($urlRouterProvider, $stateProvider) {

    $stateProvider
      .state({
        name: 'login',
        url: '/login',
        templateUrl: 'login/login.html'
      })
      .state({
        name: 'register',
        url: '/register',
        templateUrl: 'register/register.html'
      })
      .state({
        name: 'resend_confirmation',
        url: '/resend-confirmation',
        templateUrl: 'resend-confirmation/resend-confirmation.html'
      })
      .state({
        name: 'reset_password',
        url: '/reset-password',
        templateUrl: 'reset-password/reset-password.html'
      })

    // dashboard routes
      .state({
        abstract: true,
        name: 'dashboard',
        url: '/dashboard',
        templateUrl: 'dashboard/dashboard.html',
        resolve: {
          user: [
            'Auth',
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

