angular.module('drishtiSiteApp')
    .controller('ArchivedReportsModalCtrl', function ($scope, $modalInstance, anm, ARCHIVED_REPORTS_START_YEAR, ANMService) {
        'use strict';

        var allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        $scope.years = _.range(ARCHIVED_REPORTS_START_YEAR, new Date().getFullYear() + 1);

        $scope.months = function () {
            var today = new Date();
            if ($scope.selectedYear.year !== today.getFullYear()) {
                return allMonths;
            } else {
                return _.filter(allMonths, function (month) {
                    return allMonths.indexOf(month) <= today.getMonth();
                });
            }
        };

        $scope.selectedYear = {};
        $scope.selectedMonth = {};

        $scope.downloadReport = function () {
            $scope.downloadStatus = 'preparing';
            ANMService
                .prepareReportFor(anm.identifier, allMonths.indexOf($scope.selectedMonth.month), $scope.selectedYear.year)
                .then(function (data) {
                    $scope.downloadStatus = 'ready';
                    $scope.downloadURL = data;
                }, function () {

                }
            );
        };

        $scope.close = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });