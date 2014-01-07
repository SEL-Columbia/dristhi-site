angular.module('drishtiSiteApp')
    .service('RegisterService', function ($http, $q, DRISHTI_WEB_BASE_URL, JSON_TO_XLS_BASE_URL, REGISTER_TOKENS) {
        'use strict';

        var getFPUsers = function (allECs) {
            var fpUsers = {
                iudUsers: [],
                condomUsers: [],
                ocpUsers: [],
                maleSterilizationUsers: [],
                femaleSterilizationUsers: []
            };
            allECs.forEach(function (ec) {
                ec.wifeAge =
                    Math.floor((new Date() - new Date(Date.parse(ec.wifeDOB))) / 1000 / 60 / 60 / 24 / 365);
                ec.husbandAge =
                    Math.floor((new Date() - new Date(Date.parse(ec.husbandDOB))) / 1000 / 60 / 60 / 24 / 365);
                if (ec.fpDetails.method === 'iud') {
                    fpUsers.iudUsers.push(ec);
                } else if (ec.fpDetails.method === 'condom') {
                    fpUsers.condomUsers.push(ec);
                } else if (ec.fpDetails.method === 'ocp') {
                    fpUsers.ocpUsers.push(ec);
                } else if (ec.fpDetails.method === 'male_sterilization') {
                    fpUsers.maleSterilizationUsers.push(ec);
                } else if (ec.fpDetails.method === 'female_sterilization') {
                    fpUsers.femaleSterilizationUsers.push(ec);
                }
            });
            return fpUsers;
        };

        var prepareRegisterFor = function (anmIdentifier, type) {
            var getRegisterUrl = DRISHTI_WEB_BASE_URL + '/registers/' + type + '?anm-id=' + anmIdentifier;

            return $http({method: 'GET', url: getRegisterUrl})
                .then(function (result) {
                    return result.data;
                }, function () {
                    console.log('Error when getting register for anm:' + anmIdentifier + ', type:' + type);
                    return $q.reject('Error when getting register for anm:' + anmIdentifier + ', type:' + type);
                })
                .then(function (register) {
                    return $http({method: 'POST', url: JSON_TO_XLS_BASE_URL + '/xls/' + REGISTER_TOKENS[type], data: register})
                        .then(function (result) {
                            return JSON_TO_XLS_BASE_URL + result.data;
                        }, function () {
                            console.log('Error when getting register from json-to-xls service.');
                            return $q.reject('Error when getting register from json-to-xls service.');
                        });
                }
            );
        };


        return {
            fpUsers: function (allECs) {
                return getFPUsers(allECs);
            },
            prepareRegisterFor: function (anmIdentifier, type) {
                return prepareRegisterFor(anmIdentifier, type);
            }
        };
    });