angular.module('drishtiSiteApp')
    .service('LoginService', function ($http, Authentication, Base64, DRISHTI_WEB_BASE_URL) {
        'use strict';

        var login = function (username, password) {
            var authenticationURL = DRISHTI_WEB_BASE_URL + '/authenticate-user';
            Authentication.authenticate(username, password);
            return $http({method: 'GET', url: authenticationURL})
                .success(function (data) {
                    console.log('Authentication Successful: ' + data);
                    return true;
                }).error(function () {
                    console.log('Authentication failed for user' + username);
                    return false;
                });
        };

        return {
            login: function (username, password) {
                return login(username, password);
            }
        };
    });