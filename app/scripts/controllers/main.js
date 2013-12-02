'use strict';

angular.module('drishtiSiteApp')
    .controller('LoginCtrl', function ($scope, $location, $http, $window, Authentication) {
        $scope.loginUser = function () {
            if ($scope.username === 'c' && $scope.password === '1') {
                Authentication.authenticate($scope.username, $scope.password);
                $location.path('#/');
                if (!$scope.$$phase) {
                    //this will kickstart angular to notice the change
                    $scope.$apply();
                }
                else {
                    $window.location = '#/';
                }
            }
        };
    })
    .controller('LogoutCtrl', function ($scope, $location, $http, $window, Authentication) {
        Authentication.logout();
        $location.path('#/');
        if (!$scope.$$phase) {
            //this will kickstart angular to notice the change
            $scope.$apply();
        }
        else {
            $window.location = '#/';
        }
    })
    .controller('MainCtrl', function ($scope) {

    })
    .controller('IndicatorMonthCtrl', function ($scope, $routeParams, ReportsDefinitions, BambooAPI, REPORT_DATASET) {
        $scope.indicator = $routeParams.indicator;
        var def = ReportsDefinitions[$scope.indicator];
        var promise = BambooAPI.querySummary(REPORT_DATASET, {'indicator': 1}, 'service_provider');
        $scope.services_provided = def.services;
        promise.then(function (data) {
            $scope.service_providers = Object.keys(data.service_provider);
            $scope.data = data.service_provider;
            $scope.data.totals = {service_providers: {}, services_provided: {}, all: 0};

            /// sum numbers per service provider
            $scope.service_providers.forEach(function (service_provider_key) {
                var sum = 0;
                var summary = data.service_provider[service_provider_key].indicator.summary;
                $scope.services_provided.forEach(function (service_provided) {
                    sum += summary[service_provided] || 0;
                });
                $scope.data.totals.service_providers[service_provider_key] = sum;
            });

            // sum numbers per service provided
            var total_sum = 0;
            $scope.services_provided.forEach(function (service_provided) {
                var sum = 0;
                $scope.service_providers.forEach(function (service_provider_key) {
                    sum += data.service_provider[service_provider_key].indicator.summary[service_provided] || 0
                });
                $scope.data.totals.services_provided[service_provided] = sum;
                total_sum += sum;
            });
            $scope.data.totals.all = total_sum;
        });
    })
    .controller('IndicatorCumulativeCtrl', function ($scope, $routeParams, ReportsDefinitions, BambooAPI, REPORT_DATASET) {
        $scope.indicator = $routeParams.indicator;
    });
