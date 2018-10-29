window.adopisowifi.service('Account', [
  '$http',
  '$auth',
  function ($http, $auth) {

    this.currentUser = function () {
      return $auth.validateUser();
    };

    this.update = function (user) {
      return $auth.updateAccount(user);
    };

  }
]);
