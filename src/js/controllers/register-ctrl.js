window.adopisowifi.controller('RegisterCtrl', [
  '$scope',
  '$auth',
  'toastr',
  '$state',
  '$location',
  '$timeout',
  '$env',
  'vcRecaptchaService',
  function ($scope, $auth, toastr, $state, $location, $timeout, $env, vcRecaptchaService) {

    $scope.recaptcha_public_key = $env.recaptcha_public_key;

    $auth.validateUser()
      .then(function (user) {
        return $auth.signOut();
      })
      .then(function () {
        toastr.success('Account created successfully! Please login to continue');
        $timeout(function () {
          window.location.assign('/');
        }, 1000 * 5);
      })
      .catch(function (res) {
        console.log(res);
      });

    var errors = {
      email: [],
      fname: [],
      lname: [],
      password: [],
      password_confirmation: []
    };

    $scope.errors = errors;

    $scope.register = function (user) {
      $scope.registering = true;
      $auth.submitRegistration(user)
        .then(function (res) {
          toastr.success('Your account needs verification. A link has been sent to your email to verify your account.', 'Verify Account');
          $state.go('login');
        })
        .catch(function (res) {
          console.log(res);
          if (res.status === 422) {
            toastr.error(res.data.error || 'Please review your information.', 'Registration Failed');
            $scope.errors = res.data.errors;
          } else {
            toastr.error('An error occured.');
          }
          vcRecaptchaService.reload();
        })
        .finally(function () {
          $scope.registering = false;
        });
    };

  }
]);
