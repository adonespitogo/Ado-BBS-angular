window.adopisowifi.directive('logout', [
  '$auth',
  'toastr',
  '$state',
  '$cookies',
  '$window',
  function ($auth, toastr, $state, $cookies, $window) {
    return {
      restrict: 'AE',
      transclude: true,
      template: '<ng-transclude />',
      link: function ($scope, elem) {

        elem.on('click', function () {
          $scope.$apply($scope.logout);
        });

        $scope.logout = function () {

          if (!$window.confirm('Are you sure?')) return;

          $auth.signOut()
            .then(function () {
              toastr.success('Signed out successfully.');
            })
            .catch(function () {
              $cookies.remove('auth_token');
            })
            .finally(function () {
              $state.go('login');
            });
        };
      }
    };
  }
]);
