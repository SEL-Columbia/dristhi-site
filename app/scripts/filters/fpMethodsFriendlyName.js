angular.module('drishtiSiteApp.filters')
    .filter('fpMethodsFriendlyName', function () {
        'use strict';

        return function (input) {
            /*jshint camelcase: false*/
            var methods = {
                ocp: 'OCP',
                iud: 'IUD',
                condom: 'Condom',
                female_sterilization: 'Female Sterilization',
                male_sterilization: 'Male Sterilization',
                none: 'None',
                traditional_methods: 'Traditional Methods',
                dmpa_injectable: 'DMPA Injectable',
                lam: 'LAM'
            };
            /*jshint camelcase: true*/

            return methods[input] || input;
        };
    });
