'use strict';

angular.module('drishtiSiteApp', ['ngCookies'])
    .constant('AUTH_URL', 'https://drishti.modilabs.org/authenticate-user')
    //.constant('FP_DATASET_URL', 'http://ubuntu-server:8080/datasets/6e258415430b48989c9c90f6fa13a581')
    .constant('REPORT_DATASET', '0f07189134224f089a1a53e0aa5fb19c')
    .config(function ($routeProvider) {
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
    .run(function($rootScope, $location, $window, Authentication){
        $rootScope.$on('$locationChangeStart', function(evt, newUrl, currentUrl){
            if(!Authentication.isAuthenticated() && newUrl.match(/\/login/) === null)
            {
                //evt.preventDefault();
                $location.path('/login');
                if(!$rootScope.$$phase) {
                    //this will kickstart angular if to notice the change
                    $rootScope.$apply();
                }
                else
                {
                    $window.location = '#/login';
                }
            }
        });

        $rootScope.$on('$locationChangeSuccess', function(evt, newUrl, currentUrl){
        })
    });
