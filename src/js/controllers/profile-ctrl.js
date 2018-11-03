
angular.module('AdoBBS')
  .controller('ProfileCtrl', [
    '$scope',
    'Account',
    'toastr',
    function ($scope, Account, toastr) {

      Account.currentUser()
        .then(function (user) {
          $scope.user = user;
          $scope.account = {
            email: user.email
          };
        })
        .catch(function () {
          toastr.error('Unable to fetch your account details');
        });

      $scope.update = function (user) {

        $scope.errors = {};

        Account.update(user)
          .then(function () {
            toastr.success('Account updated successfully');
          })
          .catch(function (res) {
            if (res.status === 422) {
              toastr.error('Please review your information.', 'Failed');
              $scope.errors = res.data.errors;
            } else {
              toastr.error('An error occured.');
            }
          });
      };

    }
  ]);
