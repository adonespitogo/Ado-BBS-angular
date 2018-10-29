window.adopisowifi.service('Device', [
  '$http',
  'CatchHttpError',
  'toastr',
  '$window',
  function DeviceService($http, CatchHttpError, toastr, $window) {

    this.fetch = function () {
      return $http.get('/api/manager/devices').catch(CatchHttpError);
    };

    this.get = function (id) {
      return $http.get('/api/manager/devices/' + id).catch(CatchHttpError);
    };

    this.update = function (d) {
      return $http.put('/api/manager/devices/' + d.id, {device: d}).catch(CatchHttpError);
    };

    this.command = function (device_id, cmd, data) {
      device_id = device_id * 1;
      if (typeof device_id != 'number' || $window.isNaN(device_id))
        throw new Error('Device id must be a number for device.command()');

      return $http.post('/api/manager/devices/command/' + device_id, {command: cmd, data: data}).catch(CatchHttpError);
    };

    this.revoke = function (id) {
      return $http.put('/api/manager/devices/' + id + '/revoke').catch(CatchHttpError);
    };

    this.transfer = function (id, email) {
      return $http.post('/api/manager/devices/' + id + '/transfer', {email: email}).catch(CatchHttpError);
    };

    this.cancelTransfer = function (id, email) {
      return $http.post('/api/manager/devices/' + id + '/transfer/cancel', {email: email}).catch(CatchHttpError);
    };

    this.offers = function () {
      return $http.get('/api/manager/device_transfers').catch(CatchHttpError);
    };

    this.offerReponse = function (offer_id, action) {
      return $http.put('/api/manager/device_transfers/' + offer_id, {device_transfer: action}).catch(CatchHttpError);
    };

  }
]);
