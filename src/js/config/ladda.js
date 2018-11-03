angular.module('AdoBBS')
  .config(['laddaProvider', function (laddaProvider) {
    laddaProvider.setOption({ /* optional */
      style: 'expand-left'
    });
  }]);
