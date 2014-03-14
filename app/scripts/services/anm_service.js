angular.module('drishtiSiteApp')
    .service('ANMService', function ($http, $q, JSONXLSService, DRISHTI_REPORT_BASE_URL, DRISHTI_WEB_BASE_URL, NRHM_REPORT_TOKEN) {
        'use strict';

        var getANMs = function () {
            var url = DRISHTI_WEB_BASE_URL + '/anms';

            return $http({method: 'GET', url: url})
                .success(function (data) {
                    return _.map(data.anmDetails, function (anm) {
                        return new ANM(anm.identifier, anm.name, anm.location, anm.ecCount, anm.fpCount, anm.ancCount, anm.pncCount, anm.childCount);
                    });
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
                    return JSONXLSService.prepareExcel(NRHM_REPORT_TOKEN, aggregatedReports);
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