window.adopisowifi
  .service('CatchHttpError', [
    'toastr',
    '$q',
    '$state',
    function(toastr, $q, $state) {
      return function CatchHttpError(res) {

        if (res.status === 401 || res.status === 403) return;

        res.data = res.data || {};
        var errMsg = 'Something went wrong';

        if (res.data.message || res.data.error) {
          toastr.error(res.data.message || res.data.error, 'Failed');
        }
        else {
          if (res.status === 413)
            errMsg = 'File too large';
          toastr.error(errMsg, 'Error');
        }
        return $q.reject(res);
      };

    }]);


