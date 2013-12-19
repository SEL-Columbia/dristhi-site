angular.module('drishtiSiteApp')
    .controller('ANMDataSummaryCtrl', function (ANMService, $scope, $http, DRISHTI_REPORT_BASE_URL, JSON_TO_XLS_BASE_URL, NRHM_REPORT_TOKEN) {
        'use strict';

        var REPORT_MONTH_END_DAY = 25;
        var JANUARY = 0;
        var DECEMBER = 11;

        ANMService.all()
            .then(function (result) {
                $scope.anms = result.data;
            });

        $scope.excelReportsForANM = function (anm, month, year) {
            anm.downloadStatus = 'preparing';
            var drishtiUrl = DRISHTI_REPORT_BASE_URL + '/report/aggregated-reports?anm-id=' + anm.identifier + '&month=' + month + '&year=' + year;
            $http({method: 'GET', url: drishtiUrl})
                .success(function (aggregatedReports) {
                    $http({method: 'POST', url: JSON_TO_XLS_BASE_URL + '/xls/' + NRHM_REPORT_TOKEN, data: aggregatedReports})
                        .success(function (data) {
                            anm.downloadStatus = 'ready';
                            anm.excelReport = JSON_TO_XLS_BASE_URL + data;
                        }).error(function () {
                            delete anm.downloadStatus;
                            console.log('Error when getting excel from json-to-xls service');
                        });
                }).error(function () {
                    delete anm.downloadStatus;
                    console.log('Error when getting aggregated reports.');
                });
        };

        $scope.goBackToReadyState = function (anm) {
            delete anm.downloadStatus;
        };

        $scope.currentReportMonth = function () {
            return endOfCurrentReportMonth().getMonth() + 1;
        };

        $scope.currentReportYear = function () {
            return endOfCurrentReportMonth().getUTCFullYear();
        };

        var endOfCurrentReportMonth = function () {
            var today = new Date();
            if (today.getDate() > REPORT_MONTH_END_DAY) {
                if ((today.getMonth()) === DECEMBER) {
                    return new Date(nextYear(today), JANUARY, REPORT_MONTH_END_DAY);
                } else {
                    return new Date(today.getUTCFullYear(), nextMonth(today), REPORT_MONTH_END_DAY);
                }
            } else {
                return new Date(today.getUTCFullYear(), today.getMonth(), REPORT_MONTH_END_DAY);
            }
        };

        var nextYear = function (today) {
            return today.getUTCFullYear() + 1;
        };

        var nextMonth = function (today) {
            return today.getMonth() + 1;
        };
    });
