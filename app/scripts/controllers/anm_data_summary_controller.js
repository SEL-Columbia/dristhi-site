'use strict';

angular.module('drishtiSiteApp')
    .controller('ANMDataSummaryCtrl', function ($scope, ANMDataSummaryService, $http) {
        ANMDataSummaryService.anms($scope, $http);

        $scope.excelReportsForANM = function (anm) {
            return ANMDataSummaryService.excelReportsForANM($scope, $http, anm);
        };

        $scope.jsonReportsForANM = function (anm) {
            return ANMDataSummaryService.jsonReportsForANM($scope, $http, anm);
        };
    });
