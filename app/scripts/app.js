angular.module('drishtiSiteApp', ['ngCookies'])
    .constant('AUTH_URL', 'https://smartregistries.org/authenticate-user')
    .constant('DRISHTI_BASE_URL', 'https://smartregistries.org')
    .constant('JSON_TO_XLS_BASE_URL', 'http://xls.ona.io:9090')
    .constant('NRHM_REPORT_TOKEN', 'ca00b812938c476eba40478ff5191afb')
//    .constant('DRISHTI_BASE_URL', 'http://localhost:9979')
//    .constant('JSON_TO_XLS_BASE_URL', 'http://localhost:8080')
//    .constant('NRHM_REPORT_TOKEN', 'b6eb1836b7ae46b7ba2d751f5f726342')
    .constant('REPORT_DATASET', '0f07189134224f089a1a53e0aa5fb19c')
    .config(function ($routeProvider) {
        'use strict';

        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/indicators-month/:indicator', {
                templateUrl: 'views/indicators-month.html',
                controller: 'IndicatorMonthCtrl'
            })
            .when('/indicators-cumulative/:indicator', {
                templateUrl: 'views/indicators-cumulative.html',
                controller: 'IndicatorCumulativeCtrl'
            })
            .when('/registers', {
                templateUrl: 'views/registers.html',
                controller: 'PrintRegisterCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/logout', {
                templateUrl: 'views/login.html',
                controller: 'LogoutCtrl'
            })
            .when('/404', {
                templateUrl: 'views/404.html',
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '404'
            });
    })
    .run(function ($rootScope, $location, $window, Authentication, $http) {
        'use strict';

        $rootScope.$on('$locationChangeStart', function (evt, newUrl) {
            if (!Authentication.isAuthenticated() && newUrl.match(/\/login/) === null) {
                //evt.preventDefault();
                $location.path('/login');
                if (!$rootScope.$$phase) {
                    //this will kickstart angular if to notice the change
                    $rootScope.$apply();
                }
                else {
                    $window.location = '#/login';
                }
            }
            delete $http.defaults.headers.common['X-Requested-With'];
            delete $http.defaults.headers.common.Authorization;
        });
    });
