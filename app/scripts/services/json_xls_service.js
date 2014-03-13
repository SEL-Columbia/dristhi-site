angular.module('drishtiSiteApp')
    .service('JSONXLSService', function ($http, $q, $moment, JSON_TO_XLS_BASE_URL) {
        'use strict';
        var prepareExcel = function (token, data) {
            var xRequestedWith = $http.defaults.headers.common['X-Requested-With'];
            var authorization = $http.defaults.headers.common.Authorization;
            delete $http.defaults.headers.common['X-Requested-With'];
            delete $http.defaults.headers.common.Authorization;
            return $http({method: 'POST', url: JSON_TO_XLS_BASE_URL + '/xls/' + token, data: data})
                .then(function (result) {
                    return JSON_TO_XLS_BASE_URL + result.data;
                }, function () {
                    console.log('Error when getting register from json-to-xls service.');
                    return $q.reject('Error when getting register from json-to-xls service.');
                })
                .finally(function () {
                    $http.defaults.headers.common['X-Requested-With'] = xRequestedWith;
                    $http.defaults.headers.common.Authorization = authorization;
                });
        };

        return {
            prepareExcel: function (token, data) {
                return prepareExcel(token, data);
            }
        };
    });