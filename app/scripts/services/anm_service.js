angular.module('drishtiSiteApp')
    .service('ANMService', function ($http, $q, DRISHTI_REPORT_BASE_URL, JSON_TO_XLS_BASE_URL, NRHM_REPORT_TOKEN) {
        'use strict';

        var getANMs = function () {
            var url = DRISHTI_REPORT_BASE_URL + '/anms';

            return $http({method: 'GET', url: url})
                .success(function (data) {
                    return data;
                }).error(function () {
                    console.log('Error when getting ANMs micro service.');
                    return $q.reject('Error when getting ANMs micro service.');
                });
        };

        var prepareReportFor = function (anmIdentifier, month, year) {
            var drishtiUrl = DRISHTI_REPORT_BASE_URL + '/report/aggregated-reports?anm-id=' + anmIdentifier + '&month=' + month + '&year=' + year;

            return $http({method: 'GET', url: drishtiUrl})
                .then(function (result) {
                    return result.data;
                }, function () {
                    console.log('Error when getting aggregated reports.');
                    return $q.reject('Error when getting aggregated reports.');
                })
                .then(function (aggregatedReports) {
                    return $http({method: 'POST', url: JSON_TO_XLS_BASE_URL + '/xls/' + NRHM_REPORT_TOKEN, data: aggregatedReports})
                        .then(function (result) {
                            return JSON_TO_XLS_BASE_URL + result.data;
                        }, function () {
                            console.log('Error when getting excel from json-to-xls service.');
                            return $q.reject('Error when getting excel from json-to-xls service.');
                        });
                }
            );
        };

        return {
            all: function () {
                return getANMs();
            },
            prepareReportFor: function (anmIdentifier, month, year) {
                return prepareReportFor(anmIdentifier, month, year);
            }
        };
    });