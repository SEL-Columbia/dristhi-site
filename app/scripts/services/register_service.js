angular.module('drishtiSiteApp')
    .service('RegisterService', function (ECRegisterService, FPRegisterService, ANCRegisterService, ChildRegisterService) {
        'use strict';

        return {
            prepareRegisterForEC: function (anm) {
                return ECRegisterService.prepareRegister(anm);
            },
            prepareRegisterForFP: function (anm) {
                return FPRegisterService.prepareRegister(anm);
            },
            prepareRegisterForANC: function (anm) {
                return ANCRegisterService.prepareRegister(anm);
            },
            prepareRegisterForPNC: function (anm) {
                return PNCRegisterService.prepareRegister(anm);
            },
            prepareRegisterForChild: function (anm) {
                return ChildRegisterService.prepareRegister(anm);
            }
        };
    });