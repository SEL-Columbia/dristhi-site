angular.module('drishtiSiteApp')
    .service('RegisterService', function (ECRegisterService, FPRegisterService, ANCRegisterService, ChildRegisterService) {
        'use strict';

        return {
            fpUsers: function (allECs) {
                return FPRegisterService.fpUsers(allECs);
            },
            prepareRegisterForEC: function (anm) {
                return ECRegisterService.prepareRegister(anm);
            },
            prepareRegisterForANC: function (anm) {
                return ANCRegisterService.prepareRegister(anm);
            },
            prepareRegisterForChild: function (anm) {
                return ChildRegisterService.prepareRegister(anm);
            }
        };
    });