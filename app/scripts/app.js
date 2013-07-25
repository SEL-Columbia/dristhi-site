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
                redirectTo: '/login'
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
    })
    .constant('AUTH_URL', 'https://drishti.modilabs.org/authenticate-user');
