window.adopisowifi.config(['adoAuthProvider', function (adoAuthProvider) {
  
  adoAuthProvider.config({
    loginSuccessRedirectState: 'dashboard.index' 
  });

}]);
