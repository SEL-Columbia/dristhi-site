angular.module('drishtiSiteApp')
    .controller('ANMDataSummaryCtrl', function ($scope, $http, DRISHTI_BASE_URL) {
        'use strict';

        var getANMs = function () {
            var url = DRISHTI_BASE_URL + '/anms';
            $http({method: 'GET', url: url
            }).success(function (data) {
                    $scope.anms = data;
                }).error(function () {
                    $scope.error = true;
                });
        };

        var getXLS = function (anm) {
            return DRISHTI_BASE_URL + '/anms/' + anm.username + '/excelreport';
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

        $scope.excelReportsForANM = function (anm) {
            return getXLS(anm);
        };

        $scope.jsonReportsForANM = function (anm) {
            return getJSONReportForANM(anm);
        };
    });
