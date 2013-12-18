angular.module('drishtiSiteApp')
    .controller('ArchivedReportsModalCtrl', function ($scope, $modalInstance, ARCHIVED_REPORTS_START_YEAR) {
        'use strict';

        var allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        $scope.years = _.range(ARCHIVED_REPORTS_START_YEAR, new Date().getFullYear() + 1);

        $scope.months = function () {
            var today = new Date();
            if ($scope.selectedYear.year === today.getFullYear()) {
                return _.filter(allMonths, function (month) {
                    return allMonths.indexOf(month) <= today.getMonth()
                })
            }
            return allMonths;
        };
        $scope.selectedYear = {};
        $scope.selectedMonth = {};

        $scope.ok = function () {
            $modalInstance.close({
                'year': $scope.selectedYear.year,
                'month': $scope.selectedMonth.month
            });
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });