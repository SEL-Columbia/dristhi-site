'use strict';

angular.module('drishtiSiteApp', [])
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
            .otherwise({
                redirectTo: '/'
            });
    });
