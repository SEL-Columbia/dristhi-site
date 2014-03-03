angular.module('drishtiSiteApp.filters', []);
angular.module('drishtiSiteApp', ['ngCookies', 'ngRoute', 'angular-momentjs', 'ui.bootstrap', 'drishtiSiteApp.filters'])
    .constant('AUTH_URL', 'https://smartregistries.org/authenticate-user')
    .constant('REPORT_DATASET', '0f07189134224f089a1a53e0aa5fb19c')
    .constant('DRISHTI_REPORT_BASE_URL', 'https://smartregistries.org/drishti-reporting')
    .constant('DRISHTI_WEB_BASE_URL', 'https://smartregistries.org')
    .constant('JSON_TO_XLS_BASE_URL', 'http://xls.ona.io')
    .constant('NRHM_REPORT_TOKEN', 'e0739ade6dbb47a49c9115a93b3f433a')
    .constant('REGISTER_TOKENS', {
        'ec': 'e86e0e2211f54b128181cdec0b63cb11',
        'anc': 'dd3ac9bd3d7f469fbc7d0c7d73a442e6',
        'fp': 'e0739ade6dbb47a49c9115a93b3f433b'
    })

    // To avoid CORS issues while running site on localhost, we need to proxy the URLs
    // This is achieved with corsproxy utility (https://github.com/gr2m/CORS-Proxy).
    // Install corsproxy through 'npm install -g corsproxy'
    // Start corsproxy on 9292
    // Route all destination URLs through 9292 as this: http://localhost:9292/my.url/path/to/resource
    
//    .constant('DRISHTI_REPORT_BASE_URL', 'http://localhost:9292/localhost:9980')
//    .constant('DRISHTI_WEB_BASE_URL', 'http://localhost:9292/localhost:9979')
//    .constant('JSON_TO_XLS_BASE_URL', 'http://localhost:8080')
//    .constant('NRHM_REPORT_TOKEN', 'e0739ade6dbb47a49c9115a93b3f433a')
//    .constant('REGISTER_TOKENS', {
//        'ec': 'e86e0e2211f54b128181cdec0b63cb11',
//        'anc': 'dd3ac9bd3d7f469fbc7d0c7d73a442e6',
//        'fp': 'e0739ade6dbb47a49c9115a93b3f433b'
//    })

//    .constant('DRISHTI_REPORT_BASE_URL', 'http://qa.smartregistries.org/drishti-reporting')
//    .constant('DRISHTI_WEB_BASE_URL', 'http://qa.smartregistries.org')
//    .constant('JSON_TO_XLS_BASE_URL', 'http://xls.ona.io')
//    .constant('NRHM_REPORT_TOKEN', 'e0739ade6dbb47a49c9115a93b3f433a')
//    .constant('REGISTER_TOKENS', {
//        'ec': 'e86e0e2211f54b128181cdec0b63cb11',
//        'anc': 'dd3ac9bd3d7f469fbc7d0c7d73a442e6',
//        'fp': 'e0739ade6dbb47a49c9115a93b3f433b'
//    })

    .constant('ARCHIVED_REPORTS_START_YEAR', 2013)
    .config(function ($routeProvider, $momentProvider) {
        'use strict';
        $momentProvider
            .asyncLoading(false)
            .scriptUrl('bower_components/moment/moment.js');
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

        $rootScope.$on('$locationChangeStart', function () {
            if (!Authentication.isAuthenticated()) {
                //evt.preventDefault();
                $location.path('/login');
                if (!$rootScope.$$phase) {
                    //this will kickstart angular if to notice the change
                    $rootScope.$apply();
                }
                else {
                    $window.location = '#/login';
                }
                delete $http.defaults.headers.common['X-Requested-With'];
                delete $http.defaults.headers.common.Authorization;
            }
        });
    });
_.mixin(_.str.exports());