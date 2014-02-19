angular.module('drishtiSiteApp')
    .service('JSONXLSService', function ($http, $q, $moment, JSON_TO_XLS_BASE_URL, REGISTER_TOKENS) {
        'use strict';
        var prepareRegister = function(registerToken, register) {
            var xRequestedWith = $http.defaults.headers.common['X-Requested-With'];
            var authorization = $http.defaults.headers.common.Authorization;
            delete $http.defaults.headers.common['X-Requested-With'];
            delete $http.defaults.headers.common.Authorization;
            return $http({method: 'POST', url: JSON_TO_XLS_BASE_URL + '/xls/' + registerToken, data: register})
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
            prepareRegister: function(token, registers) {
                return prepareRegister(token, registers);
            }
        };
    });