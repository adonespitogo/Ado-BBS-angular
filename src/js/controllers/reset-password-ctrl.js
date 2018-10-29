
window.adopisowifi
  .controller('ResetPasswordCtrl', [
    '$scope',
    '$auth',
    'toastr',
    '$state',
    '$stateParams',
    function ($scope, $auth, toastr, $state, $stateParams) {

      $scope.user = {};

      $auth.validateUser()
        .then(function(data) {
          $scope.authenticated = true;

          $scope.changePassword = function (user) {
            $scope.resetting = true;
            $auth.updatePassword(user)
              .then(function(data) {
                toastr.success('Password updated successfully. You may now sign in using your new password');
                return $auth.signOut();
              })
              .then(function () {
                $state.go('login');
              })
              .catch(function(res) {
                if (res.status === 422) {
                  toastr.error('Please review your information.', 'Registration Failed');
                  $scope.errors = res.data.errors;
                } else {
                  toastr.error('An error occured.');
                }
              })
              .finally(function() {
                $scope.resetting = false;
              });
          };
        })
        .catch(function(err) {

          $scope.resetPass = function (user) {
            $scope.resetting = true;
            $auth.requestPasswordReset(user)
              .then(function (res) {
                if(res.data.success) {
                  $state.go('login');
                  toastr.success(res.data.message);
                } else {
                  toastr.error('Something went wrong');
                }
              })
              .catch(function (err) {
                toastr.error('Something went wrong. Please realod page and try again.');
              })
              .finally(function () {
                $scope.resetting = false;
              });
          };

        });
    }
  ]);
