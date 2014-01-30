angular.module('drishtiSiteApp')
    .controller('ANMDataSummaryCtrl', function ($scope, ANMService, RegisterService) {
        'use strict';

        var REPORT_MONTH_END_DAY = 25;
        var JANUARY = 0;
        var DECEMBER = 11;

        ANMService.all()
            .then(function (result) {
                $scope.anms = result.data.anmDetails;
            });

        $scope.excelReportsForANM = function (anm, month, year) {
            anm.nrhmReportDownloadStatus = DownloadStatus.Preparing;
            ANMService
                .prepareReportFor(anm.identifier, month, year)
                .then(function (data) {
                    anm.nrhmReportDownloadStatus = DownloadStatus.Ready;
                    anm.excelReport = data;
                }, function () {
                    delete anm.nrhmReportDownloadStatus;
                }
            );
        };

        $scope.getRegister = function (anm, type) {
            var downloadStatusForType = (type.toLowerCase() + 'RegisterDownloadStatus');
            anm[downloadStatusForType] = DownloadStatus.Preparing;
            RegisterService['prepareRegisterFor' + type](anm)
            .then(function (data) {
                    anm[type.toLowerCase() + 'RegisterDownloadStatus'] = DownloadStatus.Ready;
                    anm[type.toLowerCase() + 'Register'] = data;
                }, function () {
                    delete anm[type.toLowerCase() + 'RegisterDownloadStatus'];
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
