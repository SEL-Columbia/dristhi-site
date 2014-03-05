angular.module('drishtiSiteApp.filters')
    .filter('friendlyName', function () {
        'use strict';

        return function (input) {
            /*jshint camelcase: false*/
            var nameMap = {
                //Caste
                sc: 'SC',
                st: 'ST',
                c_others: 'Others',
                //Religion
                hindu: 'Hindu',
                muslim: 'Muslim',
                christian: 'Christian',
                r_others: 'Others',
                //FP Method
                ocp: 'OCP',
                iud: 'IUD',
                condom: 'Condom',
                female_sterilization: 'Female Sterilization',
                male_sterilization: 'Male Sterilization',
                none: 'None',
                traditional_methods: 'Traditional Methods',
                dmpa_injectable: 'DMPA Injectable',
                lam: 'LAM',
                //TT doses
                tt1: 'TT1',
                tt2: 'TT2',
                ttbooster: 'TT Booster'
            };
            /*jshint camelcase: true*/
            return nameMap[input] || input;
        };
    });
