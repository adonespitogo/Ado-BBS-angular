
window.adopisowifi.filter("dateRange", function() {
  return function(items, startDate, endDate, transform) {

    var retArray = [];

    if (!startDate && !endDate) {
      return items;
    }
    startDate = moment(startDate).startOf('day').toDate();
    endDate = moment(endDate).endOf('day').toDate();
    angular.forEach(items, function(obj) {
      var receivedDate = transform(obj);
      if (moment(receivedDate).isAfter(startDate) && moment(receivedDate).isBefore(endDate)) {
        retArray.push(obj);
      }
    });

    return retArray;

  };
});

