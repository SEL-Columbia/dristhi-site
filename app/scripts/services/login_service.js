angular.module('drishtiSiteApp')
    .service('LoginService', function ($q, $http, Authentication, Base64, DRISHTI_WEB_BASE_URL) {
        'use strict';

        var login = function (username, password) {
            var authenticationURL = DRISHTI_WEB_BASE_URL + '/authenticate-user';
            var authorizationHeader = 'Basic ' + Base64.encode(username + ':' + password);
            Authentication.clearCredentials();
            return  $http({method: 'GET', url: authenticationURL, headers: {'Authorization': authorizationHeader}})
                .then(function () {
                    return true;
                }, function () {
                    delete  $http.defaults.headers.common.Authorization;
                    return false;
                });
        };

        return {
            login: function (username, password) {
                return login(username, password);
            }
        };
    });