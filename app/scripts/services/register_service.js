angular.module('drishtiSiteApp')
    .service('RegisterService', function (ECRegisterService, FPRegisterService, ANCRegisterService) {
        'use strict';

        var getFPUsers = function (allECs) {
            return FPRegisterService.fpUsers(allECs);
        };

        var prepareRegisterForEC = function (anm) {
            return ECRegisterService.prepareRegister(anm);
        };

        var prepareRegisterForANC = function (anm) {
            return ANCRegisterService.prepareRegister(anm);
        };

        return {
            fpUsers: function (allECs) {
                return getFPUsers(allECs);
            },
            prepareRegisterForEC: function (anm) {
                return prepareRegisterForEC(anm);
            },
            prepareRegisterForANC: function (anm) {
                return prepareRegisterForANC(anm);
            }
        };
    });