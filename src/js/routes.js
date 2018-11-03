(function () {
  'use strict';

  angular.module('AdoBBS').config([
    '$urlRouterProvider',
    '$stateProvider',
    '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider) {

      $stateProvider
        .state({
          name: 'post',
          url: '/post/',
          templateUrl: 'post.html'
        })

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

      $locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise('/');

    }
  ]);

})();
