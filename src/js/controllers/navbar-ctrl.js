
angular.module('AdoBBS')
  .controller('NavbarCtrl', [
    '$scope',
    '$auth',
    function ($scope, $auth) {

      $auth.validateUser()
        .then(function (user) {
          $scope.user = user;
        });

    }
  ]);
