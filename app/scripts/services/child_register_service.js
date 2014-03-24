angular.module('drishtiSiteApp')
    .service('ChildRegisterService', function ($http, $q, $moment, $filter, DRISHTI_WEB_BASE_URL, DATE_FORMAT, JSONXLSService, REGISTER_TOKENS) {
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
                    var serialNumber = 0;
                    var defaultsForImmunizations = {};
                    var defaultsForVitaminADoses = {};
                    updateRegisterWithGeneratedDate(register);
                    updateRegisterWithLocation(register, anm);
                    register.childRegisterEntries.forEach(function (entry) {
                        entry.serialNumber = ++serialNumber;
                        entry.dob = $moment(entry.dob).format(DATE_FORMAT);
                        updateAddressDetails(entry);
                        updateImmunizationDatesFormat(entry.immunizations);
                        updateVitaminADoseDatesFormat(entry.vitaminADoses);
                        updateDefaultsForImmunizations(entry.immunizations, defaultsForImmunizations);
                        updateDefaultsVitaminADoses(entry.vitaminADoses, defaultsForVitaminADoses);
                    });
                    defaultImmunizationsAndVitaminADosesOfAllChildrenWhenThereIsNoValue(
                        register.childRegisterEntries, defaultsForImmunizations, defaultsForVitaminADoses);
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
                    immunizations[immunization] = immunizations[immunization] ? $moment(immunizations[immunization]).format(DATE_FORMAT) : '';
                }
            }
            immunizations.measlesMmr = (immunizations.measles ? immunizations.measles : '');
            immunizations.measlesMmr += (immunizations.mmr ? immunizations.mmr : '');
        };

        var updateVitaminADoseDatesFormat = function (vitaminADoses) {
            for (var vitaminADose in vitaminADoses) {
                if (vitaminADoses.hasOwnProperty(vitaminADose)) {
                    vitaminADoses[vitaminADose] = vitaminADoses[vitaminADose] ? $moment(vitaminADoses[vitaminADose]).format(DATE_FORMAT) : '';
                }
            }
        };

        var updateDefaultsForImmunizations = function (immunizations, allImmunizations) {
            for (var immunization in immunizations) {
                if (immunizations.hasOwnProperty(immunization)) {
                    allImmunizations[immunization] = '';
                }
            }
        };

        var updateDefaultsVitaminADoses = function (vitaminADoses, allVitaminADoses) {
            for (var vitaminADose in vitaminADoses) {
                if (vitaminADoses.hasOwnProperty(vitaminADose)) {
                    allVitaminADoses[vitaminADose] = '';
                }
            }
        };

        var defaultImmunizationsAndVitaminADosesOfAllChildrenWhenThereIsNoValue =
            function (childRegisterEntries, allImmunizationsDefault, allVitaminADosesDefault) {
                childRegisterEntries.forEach(function (entry) {
                    entry.immunizations = _.defaults(entry.immunizations, allImmunizationsDefault);
                    entry.vitaminADoses = _.defaults(entry.vitaminADoses, allVitaminADosesDefault);
                });
            };

        var updateRegisterWithGeneratedDate = function (register) {
            register.generatedDate = $moment().format(DATE_FORMAT);
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