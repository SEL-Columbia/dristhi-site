'use strict';

angular.module('drishtiSiteApp')
    .controller('ANMDataSummaryCtrl', function ($scope, $http) {
        var getANMs = function () {
            var url = 'http://localhost:4567/anms';
            $http({method: 'GET', url: url}).success(function (data) {
                $scope.anms = data;
                return $scope.anms;
            }).error(function (data, status, headers, config) {
                    $scope.error = true;
                });
        };

        var getXLS = function (anm) {
            return 'http://localhost:4567/anms/' + anm.username + '/excelreport';
        };

        var getJSONReportForANM = function (anm) {
            var url = 'http://localhost:4567/anms/' + anm.username + '/jsonReport';
            var http = $http({method: 'GET', url: url});
            http.success(function (data) {
                $scope.jsonReportForANM = data;
                return $scope.jsonReportForANM;
            }).error(function (data, status, headers, config) {
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
