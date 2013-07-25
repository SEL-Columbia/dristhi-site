'use strict';

angular.module('drishtiSiteApp')
    .controller('LoginCtrl', function($scope, $location, $http, $window, Authentication, BasicAuth, AUTH_URL){
        $scope.loginUser = function(){
            /*var promise = $http.post(AUTH_URL);
            promise.success(function(){
                console.log("--------Success--------");
                console.log(arguments);
            });

            promise.error(function(){
                console.log("--------Error--------");
                console.log(arguments);
            })

            promise.then(function(){
                console.log("--------Then--------");
                console.log(arguments);
            })*/
            if($scope.username === 'c' && $scope.password === '1')
            {
                Authentication.setAuthenticated(true);
                $location.path('#/');
                if(!$scope.$$phase) {
                    //this will kickstart angular if to notice the change
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
    });
