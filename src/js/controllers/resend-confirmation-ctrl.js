
window.adopisowifi.controller('ResendConfirmationCtrl', [
  '$scope',
  'toastr',
  'Auth',
  '$state',
  '$env',
  'vcRecaptchaService',
  function ($scope, toastr, Auth, $state, $env, vcRecaptchaService) {

    $scope.recaptcha_public_key = $env.recaptcha_public_key;

    $scope.resendConfirmation = function (user) {
      return Auth.resendConfirmation(user)
        .then(function (res) {
          toastr.success('Confirmation email successfully sent to ' + user.email);
          $state.go('login');
        })
        .catch(function (res) {
          if (res.data) {
            if (res.data.errors)
              $scope.errors = res.data.errors;
            else if (res.data.error)
              $scope.errors = [res.data.error];
            else
              $scope.errors = ['Something went wrong.'];
          } else {
            $scope.errors = ['Something went wrong.'];
          }
          vcRecaptchaService.reload();
        });
    };

  }
]);
