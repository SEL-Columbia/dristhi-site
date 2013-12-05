angular.module('drishtiSiteApp')
    .controller('ANMDataSummaryCtrl', function ($scope, $http, DRISHTI_BASE_URL, JSON_TO_XLS_URL) {
        'use strict';

        var getANMs = function () {
            var url = DRISHTI_BASE_URL + '/anms';
            $http({method: 'GET', url: url
            }).success(function (data) {
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

        $scope.excelReportsForANM = function (anm, month) {
            anm.downloadStatus = 'preparing';
            var drishti_url = DRISHTI_BASE_URL + '/aggregated-reports?anm-id=' + anm.identifier + '&month=' + month;
            $http({method: 'GET', url: drishti_url
            }).success(function (aggregatedReports) {
                    $http({method: 'POST', url: JSON_TO_XLS_URL, data: aggregatedReports
                    }).success(function (data) {
                            anm.downloadStatus = 'ready';
                            $scope.excelreport = data;
                        }).error(function () {
                            anm.downloadStatus = 'start';
                            console.log('Error when getting excel from json-to-xls service');
                        });

                }).error(function () {
                    anm.downloadStatus = 'start';
                    console.log('Error when getting aggregated reports.');
                });
        };

        $scope.jsonReportsForANM = function (anm) {
            return getJSONReportForANM(anm);
        };
    });
