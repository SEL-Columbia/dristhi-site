angular.module('drishtiSiteApp.filters', []);
angular.module('drishtiSiteApp', ['ngCookies', 'ui.bootstrap', 'drishtiSiteApp.filters'])
    .constant('AUTH_URL', 'https://smartregistries.org/authenticate-user')
    .constant('REPORT_DATASET', '0f07189134224f089a1a53e0aa5fb19c')
    .constant('DRISHTI_REPORT_BASE_URL', 'https://smartregistries.org/drishti-reporting')
    .constant('JSON_TO_XLS_BASE_URL', 'http://xls.ona.io')
    .constant('NRHM_REPORT_TOKEN', 'e0739ade6dbb47a49c9115a93b3f433a')
//    .constant('DRISHTI_REPORT_BASE_URL', 'http://localhost:9980')
//    .constant('JSON_TO_XLS_BASE_URL', 'http://localhost:8080')
//    .constant('NRHM_REPORT_TOKEN', 'db899ee1472f482991fd0aa6f638d0fe')
//    .constant('DRISHTI_REPORT_BASE_URL', 'http://drishti.modilabs.org/drishti-reporting')
//    .constant('JSON_TO_XLS_BASE_URL', 'http://xls.ona.io:9090')
//    .constant('NRHM_REPORT_TOKEN', 'e0739ade6dbb47a49c9115a93b3f433a')
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
_.mixin(_.str.exports());