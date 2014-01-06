angular.module('drishtiSiteApp')
    .controller('ANMDataSummaryCtrl', function ($scope, ANMService, RegisterService) {
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
            ANMService
                .prepareReportFor(anm.identifier, month, year)
                .then(function (data) {
                    anm.downloadStatus = 'ready';
                    anm.excelReport = data;
                }, function () {
                    delete anm.downloadStatus;
                }
            );
        };

        $scope.getRegister = function (anm, type) {
            anm.ancRegisterDownloadStatus = 'preparing';
            RegisterService
                .prepareRegisterFor(anm.identifier, type)
                .then(function (data) {
                    anm.ancRegisterDownloadStatus = 'ready';
                    anm.ancRegister = data;
                }, function () {
                    delete anm.ancRegisterDownloadStatus;
                }
            );
        };

        $scope.goBackToReadyState = function (anm, status) {
            delete anm[status];
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
