angular.module('drishtiSiteApp')
    .service('ANCRegisterService', function ($http, $q, $moment, $filter, DRISHTI_WEB_BASE_URL, DATE_FORMAT, JSONXLSService, REGISTER_TOKENS) {
        'use strict';

        var prepareRegister = function (anm) {
            var getRegisterUrl = DRISHTI_WEB_BASE_URL + '/registers/anc?anm-id=' + anm.identifier;
            return $http({method: 'GET', url: getRegisterUrl})
                .then(function (result) {
                    return result.data;
                }, function (err) {
                    console.log('Error when getting ANC register for anm:' + anm.identifier + ', error: ' + err);
                    return $q.reject('Error when getting ANC register for anm:' + anm.identifier + ', error: ' + err);
                })
                .then(function (register) {
                    updateRegisterWithDate(register);
                    updateRegisterWithLocation(register, anm);
                    register.ancRegisterEntries.forEach(function (entry) {
                        fillMissingValues(entry);
                        entry.registrationDate = $moment(entry.registrationDate).format(DATE_FORMAT);
                        entry.wifeAge = $filter('humanizeWifeAge')(entry.wifeDOB);
                        entry.addressDetails = $filter('humanizeAndTitleize')(entry.wifeName) +
                            (entry.husbandName ? ', W/O ' + $filter('humanizeAndTitleize')(entry.husbandName) : '') +
                            (entry.address ? ', C/O ' + entry.address : '');
                        entry.casteReligionDetails = entry.caste ? $filter('friendlyName')(entry.caste) : '';
                        entry.casteReligionDetails = (entry.casteReligionDetails === '' ? '' : entry.casteReligionDetails) +
                            (entry.religion ? '/' + $filter('friendlyName')(entry.religion) : '');
                        entry.economicStatus = (entry.economicStatus ? entry.economicStatus.toUpperCase() : '') + (entry.bplCardNumber ? '(' + entry.bplCardNumber + ')' : '');
                        if (entry.youngestChildDOB) {
                            entry.youngestChildAge = $filter('humanizeChildAge')(entry.youngestChildDOB);
                        }
                        entry.lmpEDDDetails = $moment(entry.lmp).format(DATE_FORMAT) + ' ' + $moment(entry.edd).format(DATE_FORMAT);
                        entry.husbandEducationLevel = $filter('humanizeAndTitleize')(entry.husbandEducationLevel);
                        entry.wifeEducationLevel = $filter('humanizeAndTitleize')(entry.wifeEducationLevel);
                        entry.bloodGroup = $filter('friendlyName')(entry.bloodGroup);
                        sortEntryByDate(entry);
                        updateRTISTIValues(entry.ancVisits);
                        updateBPValues(entry.ancVisits);
                        updateTTDosageValues(entry.ttDoses);
                        updateIFADateFormat(entry.ifaTablets);
                        updateHBTestDateFormat(entry.hbTests);
                    });
                    return JSONXLSService.prepareExcel(REGISTER_TOKENS.anc, register);
                }
            );
        };

        var sortEntryByDate = function(entry) {
            entry.ancVisits = _.sortBy(entry.ancVisits, function(ancVisit){
                return ancVisit.ancVisitDate;
            });
            entry.ttDoses = _.sortBy(entry.ttDoses, function(dose){
                return dose.ttDate;
            });
            entry.ifaTablets = _.sortBy(entry.ifaTablets, function(ifa){
                return ifa.ifaTabletsDate;
            });
            entry.hbTests = _.sortBy(entry.hbTests, function(hbTest){
                return hbTest.hbTestDate;
            });
        };

        var fillMissingValues = function (entry) {
            var services = ['ttDoses', 'ifaTablets', 'ancVisits', 'remarks', 'hbTests', 'contentHolder'];
            var servicesLength = [];
            services.forEach(function (service) {
                entry[service] = entry[service] || [];
                servicesLength.push(entry[service].length);
            });
            entry.maxLength = _.max(servicesLength);
            services.forEach(function (service) {
                fillValuesToMatchLength(entry, service);
            });
            return entry;
        };

        var fillValuesToMatchLength = function (entry, service) {
            entry[service] = entry[service].concat(_(entry.maxLength - entry[service].length).times(function () {
                return {};
            }));
        };

        var updateRTISTIValues = function (ancVisits) {
            ancVisits.forEach(function (visit) {
                visit.rtiSTIValue = (visit.rti ? visit.rti : '') + (visit.sti ? '/' + visit.sti : '');
                if (visit.ancVisitDate) {
                    visit.ancVisitDate = $moment(visit.ancVisitDate).format(DATE_FORMAT);
                }
            });
        };

        var updateBPValues = function (ancVisits) {
            ancVisits.forEach(function (visit) {
                visit.bp = (visit.bpSystolic || '') + (visit.bpDiastolic ? '/' + visit.bpDiastolic : '');
            });
        };

        var updateTTDosageValues = function (ttDoses) {
            ttDoses.forEach(function (dose) {
                dose.ttDose = $filter('friendlyName')(dose.ttDose);
                if (dose.ttDate) {
                    dose.ttDate = $moment(dose.ttDate).format(DATE_FORMAT);
                }
            });
        };

        var updateIFADateFormat = function (ifaTablets) {
            ifaTablets.forEach(function (ifaTablet) {
                if (ifaTablet.ifaTabletsDate) {
                    ifaTablet.ifaTabletsDate = $moment(ifaTablet.ifaTabletsDate).format(DATE_FORMAT);
                }
            });
        };

        var updateHBTestDateFormat = function (hbTests) {
            hbTests.forEach(function (hbTest) {
                if (hbTest.hbTestDate) {
                    hbTest.hbTestDate = $moment(hbTest.hbTestDate).format(DATE_FORMAT);
                }
            });
        };

        var updateRegisterWithLocation = function (register, anm) {
            register.anmDetails = {
                location: anm.location,
                name: anm.name
            };
        };

        var updateRegisterWithDate = function (register) {
            register.generatedDate = $moment().format(DATE_FORMAT);
        };

        return {
            prepareRegister: function (anm) {
                return prepareRegister(anm);
            }
        };
    });