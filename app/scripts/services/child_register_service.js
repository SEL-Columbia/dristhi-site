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
                    updateRegisterWithDate(register);
                    updateRegisterWithLocation(register, anm);
                    register.childRegisterEntries.forEach(function (entry) {
                        entry.dob = $moment(entry.dob).format('DD-MM-YYYY');
                        entry.wifeAge = $filter('humanizeWifeAge')(entry.wifeDOB);
                        entry.addressDetails = $filter('humanizeAndTitleize')(entry.wifeName) +
                            ( $filter('humanizeWifeAge')(entry.wifeDOB) ? ' (' + $filter('humanizeWifeAge')(entry.wifeDOB) + ')' : '') +
                            (entry.husbandName ? ', W/O ' + $filter('humanizeAndTitleize')(entry.husbandName) : '') +
                            (entry.address ? ', C/O ' + entry.village : '');
                        updateImmunizationDatesFormat(entry.immunizations);
                    });
                    return JSONXLSService.prepareExcel(REGISTER_TOKENS.child, register);
                }
            );
        };

        var updateImmunizationDatesFormat = function (immunizations) {

            function formatDate(date) {
                if (date) {
                    return $moment(date).format('DD-MM-YYYY');
                }
            }
            immunizations.bcg = formatDate(immunizations.bcg);
            immunizations.opv_0 = formatDate(immunizations.opv_0);
            immunizations.hepb_0 = formatDate(immunizations.hepb_0);
            immunizations.dptbooster_1 = formatDate(immunizations.dptbooster_1);
            immunizations.pentavalent_1 = formatDate(immunizations.pentavalent_1);
            immunizations.opv_1 = formatDate(immunizations.opv_1);
            immunizations.dptbooster_2 = formatDate(immunizations.dptbooster_2);
            immunizations.pentavalent_2 = formatDate(immunizations.pentavalent_2);
            immunizations.opv_2 = formatDate(immunizations.opv_2);
            immunizations.pentavalent_3 = formatDate(immunizations.pentavalent_3);
            immunizations.opv_3 = formatDate(immunizations.opv_3);
            immunizations.measles = formatDate(immunizations.measles);
            immunizations.vitamin_a1 = formatDate(immunizations.vitamin_a1);
            immunizations.je = formatDate(immunizations.je);
            immunizations.measlesbooster = formatDate(immunizations.measlesbooster);
            immunizations.mmr = formatDate(immunizations.mmr);
            immunizations.dptbooster = formatDate(immunizations.dptbooster);
            immunizations.opvbooster = formatDate(immunizations.opvbooster);
            immunizations.vitamin_a2 = formatDate(immunizations.vitamin_a2);
            immunizations.je_2 = formatDate(immunizations.je_2);
        };

        var updateRegisterWithDate = function (register) {
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