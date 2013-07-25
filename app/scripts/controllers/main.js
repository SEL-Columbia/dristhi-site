'use strict';

angular.module('drishtiSiteApp')
    .controller('LoginCtrl', function($scope, $location, $http, $window, Authentication){
        $scope.loginUser = function(){
            if($scope.username === 'c' && $scope.password === '1')
            {
                Authentication.authenticate($scope.username, $scope.password);
                $location.path('#/');
                if(!$scope.$$phase) {
                    //this will kickstart angular to notice the change
                    $scope.$apply();
                }
                else
                {
                    $window.location = '#/';
                }
            }
        };
    })
    .controller('MainCtrl', function ($scope) {
    })
    .controller('IndicatorMonthCtrl', function($scope, $routeParams, ReportsDefinitions){
        var def = ReportsDefinitions[$routeParams.indicator];
    });
