'use strict';

angular.module('drishtiSiteApp', ['ngCookies'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/indicators-month', {
                templateUrl: 'views/indicators-month.html',
                controller: 'MainCtrl'
            })
            .when('/indicators-cumulative', {
                templateUrl: 'views/indicators-cumulative.html',
                controller: 'MainCtrl'
            })
            .when('/registers', {
                templateUrl: 'views/registers.html',
                controller: 'MainCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .run(function($rootScope, $location){
        $rootScope.$on('$locationChangeStart', function(evt, newUrl, currentUrl){
        });

        $rootScope.$on('$locationChangeSuccess', function(evt, newUrl, currentUrl){
        })
    })
    .constant('AUTH_URL', 'https://drishti.modilabs.org/authenticate-user');
