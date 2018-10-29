window.adopisowifi.service('LicenseKey', [
  '$http',
  'CatchHttpError',
  function ($http, CatchHttpError) {

    this.fetch = function () {
      return $http.get('/api/manager/product_keys').catch(CatchHttpError);
    };

    this.get = function(id) {
      return $http.get('/api/manager/product_keys/' + id).catch(CatchHttpError);
    };

    this.offers = function () {
      return $http.get('/api/manager/license_transfers').catch(CatchHttpError);
    };

    this.transfer = function (id, email) {
      return $http.post('/api/manager/product_keys/' + id + '/transfer', {email: email}).catch(CatchHttpError);
    };

    this.accept = function (id) {
      return $http.put('/api/manager/license_transfers/' + id, {license_transfer: {accepted: true}}).catch(CatchHttpError);
    };

    this.decline = function (id) {
      return $http.put('/api/manager/license_transfers/' + id, {license_transfer: {accepted: false}}).catch(CatchHttpError);
    };

    this.cancel = function (id) {
      return $http.delete('/api/manager/license_transfers/' + id).catch(CatchHttpError);
    };

  }
]);
