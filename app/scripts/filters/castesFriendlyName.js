angular.module('drishtiSiteApp.filters')
    .filter('castesFriendlyName', function () {
        'use strict';

        return function (input) {
            /*jshint camelcase: false*/
            var castes = {
                sc: 'SC',
                st: 'ST',
                c_others: 'Others'
            };
            /*jshint camelcase: true*/
            return castes[input] || input;
        };
    });
