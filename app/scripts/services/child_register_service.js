angular.module('drishtiSiteApp')
    .service('ChildRegisterService', function ($http, $q, $moment, $filter, DRISHTI_WEB_BASE_URL, JSONXLSService, REGISTER_TOKENS) {
        'use strict';

        var prepareRegister = function (anm) {
            var getRegisterUrl = DRISHTI_WEB_BASE_URL + '/registers/child?anm-id=' + anm.identifier;
            return $http({method: 'GET', url: getRegisterUrl})
                .then(function (result) {
                    return result.data;
                }, function () {
                    console.log('Error when getting Child register for anm:' + anm.identifier);
                    return $q.reject('Error when getting Child register for anm:' + anm.identifier);
                })
                .then(function (register) {
                    updateRegisterWithGeneratedDate(register);
                    updateRegisterWithLocation(register, anm);
                    register.childRegisterEntries.forEach(function (entry) {
                        entry.dob = $moment(entry.dob).format('DD-MM-YYYY');
                        updateAddressDetails(entry);
                        updateImmunizationDatesFormat(entry.immunizations);
                    });
                    return JSONXLSService.prepareExcel(REGISTER_TOKENS.child, register);
                }
            );
        };

        var updateAddressDetails = function (childRegisterEntry) {
            var motherName = $filter('humanizeAndTitleize')(childRegisterEntry.wifeName);
            var motherAge = $filter('humanizeWifeAge')(childRegisterEntry.wifeDOB) ? ' (' + $filter('humanizeWifeAge')(childRegisterEntry.wifeDOB) + ')' : '';
            var fatherName = childRegisterEntry.husbandName ? ', W/O ' + $filter('humanizeAndTitleize')(childRegisterEntry.husbandName) : '';
            var village = childRegisterEntry.village ? ', C/O ' + $filter('humanizeAndTitleize')(childRegisterEntry.village) : '';
            childRegisterEntry.addressDetails = motherName + motherAge + fatherName + village;
        };

        var updateImmunizationDatesFormat = function (immunizations) {
            for (var immunization in immunizations) {
                if (immunizations.hasOwnProperty(immunization)) {
                    immunizations[immunization] = immunizations[immunization] ? $moment(immunizations[immunization]).format('DD-MM-YYYY') : '';
                }
            }
        };

        var updateRegisterWithGeneratedDate = function (register) {
            register.generatedDate = $moment().format('DD-MM-YYYY');
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