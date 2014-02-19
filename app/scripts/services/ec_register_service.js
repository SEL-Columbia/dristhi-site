angular.module('drishtiSiteApp')
    .service('ECRegisterService', function ($http, $q, $moment, $filter, DRISHTI_WEB_BASE_URL, JSON_TO_XLS_BASE_URL, JSONXLSService, REGISTER_TOKENS) {
        'use strict';

        var prepareRegister = function (anm) {
            var getRegisterUrl = DRISHTI_WEB_BASE_URL + '/registers/ec?anm-id=' + anm.identifier;
            return $http({method: 'GET', url: getRegisterUrl})
                .then(function (result) {
                    return result.data;
                }, function () {
                    console.log('Error when getting EC register for anm:' + anm.identifier);
                    return $q.reject('Error when getting EC register for anm:' + anm.identifier);
                })
                .then(function (register) {
                    updateRegisterWithDate(register);
                    updateRegisterWithLocation(register, anm);
                    register.ecRegisterEntries.forEach(function (entry) {
                        entry.village = $filter('humanizeAndTitleize')(entry.village);
                        entry.householdDetails = entry.householdNumber +
                            (entry.householdAddress ? ', ' + entry.householdAddress : '') +
                            (entry.headOfHousehold ? ', ' + entry.headOfHousehold : '');
                        entry.economicStatus = (entry.economicStatus || '').toUpperCase();
                        entry.educationLevel = (entry.wifeEducationLevel ? entry.wifeEducationLevel : '') +
                            (entry.husbandEducationLevel ? ' / ' + entry.husbandEducationLevel : '');
                        entry.ageDetails = entry.wifeAge + (entry.husbandAge ? ' / ' + entry.husbandAge : '');
                        entry.caste = $filter('castesFriendlyName')(entry.caste);
                        entry.currentFPMethod = $filter('fpMethodsFriendlyName')(entry.currentFPMethod);
                        entry.isPregnant = $filter('humanizeAndTitleize')(entry.isPregnant);
                    });
                    return JSONXLSService.prepareRegister(REGISTER_TOKENS.ec, register);
                }
            );
        };

        var updateRegisterWithDate = function (register) {
            register.generatedDate = $moment().format('YYYY-MM-DD');
        };

        var updateRegisterWithLocation = function (register, anm) {
            register.anmDetails = {
                location: anm.location,
                name: anm.name
            };
        };

        return {
            prepareRegister: function (anm) {
                return prepareRegister(anm);
            }
        };
    });