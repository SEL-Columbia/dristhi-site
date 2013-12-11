angular.module('drishtiSiteApp')
    .controller('ANMDataSummaryCtrl', function ($scope, $http, DRISHTI_BASE_URL, JSON_TO_XLS_BASE_URL, NRHM_REPORT_TOKEN) {
        'use strict';

        var getANMs = function () {
            var url = DRISHTI_BASE_URL + '/anms';
            $http({method: 'GET', url: url})
                .success(function (data) {
                    $scope.anms = data;
                }).error(function () {
                    console.log('Error when getting ANMs micro service.');
                });
        };

        var getJSONReportForANM = function (anm) {
            var url = DRISHTI_BASE_URL + '/anms/' + anm.username + '/jsonReport';
            var http = $http({method: 'GET', url: url});
            http.success(function (data) {
                $scope.jsonReportForANM = data;
                return $scope.jsonReportForANM;
            }).error(function () {
                    $scope.error = true;
                });
        };

        getANMs();

        $scope.excelReportsForANM = function (anm, month, year) {
            anm.downloadStatus = 'preparing';
            var drishti_url = DRISHTI_BASE_URL + '/aggregated-reports?anm-id=' + anm.identifier + '&month=' + month + '&year=' + year;
            $http({method: 'GET', url: drishti_url})
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

        $scope.jsonReportsForANM = function (anm) {
            return getJSONReportForANM(anm);
        };

        $scope.goBackToReadyState = function (anm) {
            delete anm.downloadStatus;
        };

        var endOfCurrentReportMonth = function () {
            var date = new Date();
            var report_month_end_day = 25;
            var january = 0;
            if (date.getDate() > report_month_end_day) {
                if ((date.getMonth()) == 11) {
                    return new Date(date.getUTCFullYear() + 1, january, report_month_end_day);
                } else {
                    return new Date(date.getUTCFullYear(), date.getMonth() + 1, report_month_end_day);
                }
            } else {
                return new Date(date.getUTCFullYear(), date.getMonth(), report_month_end_day);
            }

        };

        $scope.currentMonth = function () {
            return endOfCurrentReportMonth().getMonth()+1;
        };

        $scope.currentYear = function () {
            return endOfCurrentReportMonth().getUTCFullYear();
        };
    });
