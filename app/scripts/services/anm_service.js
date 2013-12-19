angular.module('drishtiSiteApp')
    .service('ANMService', function ($http, DRISHTI_REPORT_BASE_URL) {
        'use strict';

        var getANMs = function () {
            var url = DRISHTI_REPORT_BASE_URL + '/anms';

            return $http({method: 'GET', url: url})
                .success(function (data) {
                    return data;
                }).error(function () {
                    console.log('Error when getting ANMs micro service.');
                });
        };

        return {
            all: function () {
                return getANMs();
            }
        };
    });