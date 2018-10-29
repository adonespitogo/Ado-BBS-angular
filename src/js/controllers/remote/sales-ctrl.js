window.adopisowifi.controller('SalesCtrl', [
  '$scope',
  'Device',
  'Sales',
  '$stateParams',
  '$filter',
  'toastr',
  '$window',
  function ($scope, Device, Sales, $stateParams, $filter, toastr, $window) {


    $scope.currentPage = 1;
    $scope.itemsPerPage = 10;
    $scope.count_not_credited = true;
    $scope.moreOptions = {};

    $scope.totalCount = function () {
      if (!$scope.data)
        return 0;
      else {
        var total = 0;
        angular.forEach($scope.filteredData(), function(d) {
          var amount = d.amount * 1;
          if (!$window.isNaN(amount) && ($scope.count_not_credited ? true : d.hostname != 'NOT CREDITED'))
            total += amount;
        });
        return total;
      }
    };

    $scope.loadPercent = function () {
      return Sales.loadPercent() * 100;
    };

    $scope.reloadInventory = function() {
      $scope.data = null;
      return Sales.load($stateParams.id).then(function (data) {
        var i = 1;
        $scope.data = data
          .reverse()
          .map(function (d) {
            d.index = i;
            i ++;
            return d;
          });

        if ($scope.totalCount() <= 0) {
          toastr.info('You don\'t have any earnings yet.');
        }
      });
    };

    $scope.filteredData = function () {
      var filteredData = $filter('dateRange')($scope.data, $scope.fromDate, $scope.toDate, function(d) {
        return new Date(d.date);
      }).filter(function(d) {
        return (!$window.isNaN(d.amount) && ($scope.count_not_credited ? true : (d.hostname != 'NOT CREDITED')));
      });
      return $scope.reverseList ? filteredData.reverse() : filteredData;
    };

    $scope.visibleData = function () {
      if (!$scope.data) return [];
      var filteredData = $scope.filteredData();
      var i = ($scope.currentPage - 1) * $scope.itemsPerPage;
      var range = filteredData.length < $scope.itemsPerPage ? filteredData.length : $scope.itemsPerPage;
      var slicedData = filteredData.slice(i, i + range);
      return slicedData;
    };

    $scope.pageChanged = function () {
    };

    $scope.reloadInventory();

    // start date filter

    $scope.dateOptions = {
      formatYear: 'yy',
      maxDate: new Date(),
      startingDay: 1
    };

    $scope.open1 = function() {
      $scope.popup1.opened = true;
    };

    $scope.open2 = function() {
      $scope.popup2.opened = true;
    };

    $scope.popup1 = {
      opened: false
    };

    $scope.popup2 = {
      opened: false
    };

    $scope.customDate = function (fromDate, toDate) {
      $scope.counterTitle = 'From ' + moment(fromDate).format('MMM D') + ' to ' + moment(toDate).format('MMM D, YYYY');
    };

    //shortcuts

    $scope.today = function () {
      $scope.counterTitle = 'Today';
      $scope.fromDate = new Date();
      $scope.toDate = new Date();
    };

    $scope.yesterday = function () {
      $scope.counterTitle = 'Yesterday';
      var yt = moment().subtract(1, 'day').toDate();
      $scope.fromDate = yt;
      $scope.toDate = angular.copy(yt);
    };

    $scope.thisWeek = function () {
      $scope.counterTitle = 'This Week';
      $scope.fromDate = moment().startOf('isoWeek').toDate();
      $scope.toDate = new Date();
    };

    $scope.thisMonth = function () {
      $scope.counterTitle = 'This Month';
      $scope.fromDate = moment().startOf('month').toDate();
      $scope.toDate = new Date();
    };

    $scope.lastMonths = function (m) {
      $scope.counterTitle = m > 1 ? 'Last ' + m + ' month(s)' : 'Since last month';
      $scope.fromDate = moment().subtract(m, 'months').startOf('month').startOf('day').toDate();
      $scope.toDate = new Date();
    };

    $scope.download = function () {
      var filename = 'Sales_Report_FROM_' +
        moment($scope.fromDate).format('MMM_D') +
        '_TO_' + moment($scope.toDate).format('MMM_D_YYYY') + '.csv';

      var txt = '#,AMOUNT,TYPE,HOSTNAME,IP,MAC,DATE,TIME\r\n';
      var collection = $scope.filteredData();
      angular.forEach(collection, function (d, i) {
        txt += '#' + (i+1) + ',';
        txt += d.amount + ',';
        txt += (d.type || 'coin') + ',';
        txt += d.hostname + ',';
        txt += d.ip_address + ',';
        txt += d.mac_address + ',';
        txt += moment(d.date).format('MMMM D YYYY') + ',';
        txt += moment(d.date).format('h:mm a').toUpperCase();
        txt += '\r\n';
      });
      txt += '\r\n\r\nSUMMARY\r\n';
      txt += ',TOTAL: ' + $scope.totalCount() + '\r\n';
      txt += ',FROM DATE: ' + moment($scope.fromDate).format('MMMM D YYYY') + '\r\n';
      txt += ',TO DATE: ' + moment($scope.toDate).format('MMMM D YYYY') + '\r\n';
      var blob = new Blob([txt], {type: "text/csv;charset=utf-8"});
      saveAs(blob, filename);
    };

    $scope.thisWeek();

  }
]);
