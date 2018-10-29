window.adopisowifi.service('Sales', [
  '$http',
  '$q',
  'Device',
  function ($http, $q, Device) {

    var loadPercent = 0;

    this.loadPercent = function () {
      return loadPercent;
    };

    this.load = function (id) {

      loadPercent = 0;

      return Device.command(id, 'get:sales:stats')
        .then(function (res) {
          var stats = res.data;

          var deferred = $q.defer();
          var per_page = 10;
          var page_count = Math.floor(stats.count / 10);
          var sales = [];

          if (stats.count % 10 > 0)
            page_count = page_count + 1;

          function fetchPage(page, cb) {
            Device.command(id, 'get:paged:sales', {page: page, per_page: per_page})
              .then(function (res) {

                loadPercent = page / page_count;

                for (var x=0; x< res.data.length; x++) {
                  sales.push(res.data[x]);
                }

                if (page < page_count) {
                  fetchPage(page + 1, cb);
                }
                else {
                  cb(null, sales);
                }
              })
              .catch(function (err) {
                cb(err);
              });
          }

          fetchPage(1, function (err, data) {
            if (err)
              return deferred.reject(err);

            deferred.resolve(data);
          });

          return deferred.promise;

        });

    };

  }
]);
