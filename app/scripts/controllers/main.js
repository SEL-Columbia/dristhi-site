angular.module('drishtiSiteApp')
    .controller('LoginCtrl', function ($scope, $location, $http, $window, Authentication) {
        'use strict';

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
        'use strict';

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
    .controller('MainCtrl', function () {

    })
    .controller('IndicatorMonthCtrl', function ($scope, $routeParams, ReportsDefinitions, BambooAPI, REPORT_DATASET) {
        'use strict';

        $scope.indicator = $routeParams.indicator;
        var def = ReportsDefinitions[$scope.indicator];
        var promise = BambooAPI.querySummary(REPORT_DATASET, {'indicator': 1}, 'service_provider');
        $scope.servicesProvided = def.services;
        promise.then(function (data) {
            /*jshint camelcase: false*/

            $scope.serviceProviders = Object.keys(data.service_provider);
            $scope.data = data.service_provider;
            $scope.data.totals = {serviceProviders: {}, servicesProvided: {}, all: 0};

            /// sum numbers per service provider
            $scope.serviceProviders.forEach(function (serviceProviderKey) {
                var sum = 0;
                var summary = data.service_provider[serviceProviderKey].indicator.summary;
                $scope.servicesProvided.forEach(function (serviceProvided) {
                    sum += summary[serviceProvided] || 0;
                });
                $scope.data.totals.serviceProviders[serviceProviderKey] = sum;
            });

            // sum numbers per service provided
            var totalSum = 0;
            $scope.servicesProvided.forEach(function (serviceProvided) {
                var sum = 0;
                $scope.serviceProviders.forEach(function (serviceProviderKey) {
                    sum += data.service_provider[serviceProviderKey].indicator.summary[serviceProvided] || 0;
                });
                $scope.data.totals.servicesProvided[serviceProvided] = sum;
                totalSum += sum;
            });
            $scope.data.totals.all = totalSum;
            /*jshint camelcase: true*/
        });
    })
    .controller('IndicatorCumulativeCtrl', function ($scope, $routeParams) {
        'use strict';

        $scope.indicator = $routeParams.indicator;
    });
