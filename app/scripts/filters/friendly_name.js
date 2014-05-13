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
                iud: 'IUCD',
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
                ttbooster: 'TT Booster',
                //Blood Group
                a_positive: 'A+',
                a_negative: 'A-',
                b_positive: 'B+',
                b_negative: 'B-',
                ab_positive: 'AB+',
                ab_negative: 'AB-',
                o_positive: 'O+',
                o_negative: 'O-',
                home: 'Home',
                phc: 'PHC',
                sub_center: 'SubCenter',
                anm: 'ANM',
                asha: 'Asha',
                others: 'Others',
                aww: 'AWW',
                // Upt Result
                positive: '+Ve',
                negative: '-Ve'
            };
            /*jshint camelcase: true*/
            return input ?
                (nameMap[input] || input) :
                '';
        };
    });
