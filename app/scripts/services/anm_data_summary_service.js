'use strict';

angular.module('drishtiSiteApp')
    .service('ANMDataSummaryService', function () {

        var getANMs = function ($scope, $http) {
            var url = 'http://localhost:4567/anms';
            $http({method: 'GET', url: url}).success(function (data) {
                $scope.anms = data;
                return $scope.anms;
            }).error(function (data, status, headers, config) {
                    $scope.error = true;
                });
        };

        var getXLS = function ($scope, $http, anm) {
            return 'http://localhost:4567/anms/' + anm.username + '/excelreport';
        };

        var getJSONReportForANM = function ($scope, $http, anm) {
            var url = 'http://localhost:4567/anms/' + anm.username + '/jsonReport';
            var http = $http({method: 'GET', url: url});
            http.success(function (data) {
                $scope.jsonReportForANM = data;
                return $scope.jsonReportForANM;
            }).error(function (data, status, headers, config) {
                    $scope.error = true;
                });
        };

        return {
            anms: function ($scope, $http) {
                return getANMs($scope, $http);
            },
            excelReportsForANM: function ($scope, $http, anm) {
                return getXLS($scope, $http, anm);
            },
            jsonReportsForANM: function ($scope, $http, anm) {
                return getJSONReportForANM($scope, $http, anm);
            }
        };
    });

