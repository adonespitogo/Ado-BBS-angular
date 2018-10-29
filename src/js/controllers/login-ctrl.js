window.adopisowifi.controller('LoginCtrl', [
  '$scope',
  'Auth',
  'toastr',
  '$state',
  'CatchHttpError',
  function($scope, Auth, toastr, $state, CatchHttpError) {

    $scope.$on('auth:login-error', function (e, data) {
      if (data && data.errors) {
        for (var x = 0; x < data.errors.length; x++) {
          toastr.error(data.errors[x], 'Login Failed');
        }
      } else {
        toastr.error('Invalid email or password.', 'Login Failed');
      }
    });

    $scope.login = function (user) {
      $scope.logging = true;
      Auth.login(user)
        .then(function(res) {
          toastr.success('Logged in successfully.');
          $state.go('dashboard.index');
        })
        .finally(function() {
          $scope.logging = false;
        });
    };

  }
]);
