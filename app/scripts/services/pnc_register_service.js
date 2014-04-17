angular.module('drishtiSiteApp')
    .service('PNCRegisterService', function ($http, $q, $moment, $filter, DRISHTI_WEB_BASE_URL, DATE_FORMAT, JSONXLSService, REGISTER_TOKENS) {
        'use strict';

        var prepareRegister = function (anm) {
            var getRegisterUrl = DRISHTI_WEB_BASE_URL + '/registers/pnc?anm-id=' + anm.identifier;
            return $http({method: 'GET', url: getRegisterUrl})
                .then(function (result) {
                    return result.data;
                }, function (err) {
                    console.log('Error when getting PNC register for anm:' + anm.identifier + ', error: ' + err);
                    return $q.reject('Error when getting PNC register for anm:' + anm.identifier + ', error: ' + err);
                })
                .then(function (register) {
                    updateRegisterWithDate(register);
                    updateRegisterWithLocation(register, anm);
                    register.pncRegisterEntries.forEach(function (entry) {
                        entry.registrationDate = $moment(entry.registrationDate).format(DATE_FORMAT);
                        entry.wifeAge = $filter('humanizeWifeAge')(entry.wifeDOB);
                        entry.addressDetails = $filter('humanizeAndTitleize')(entry.wifeName) +
                            (entry.husbandName ? ', W/O ' + $filter('humanizeAndTitleize')(entry.husbandName) : '') +
                            (entry.address ? ', C/O ' + entry.address : '');
                        var sortedPNCVisits = _.sortBy(entry.pncVisitDetails, function (pncVisit) {
                            return pncVisit.pncVisitDate;
                        });

                        for (var index = 0; index < sortedPNCVisits.length; index++) {
                            entry['pncVisit' + (index + 1) + 'Details'] = sortedPNCVisits[index].pncVisitDate;
                            entry.complications = sortedPNCVisits[index].complications;
                        }
                        entry.fpMethodDetails = entry.fpMethodName + ' ' + entry.fpMethodDate;


                    });
                    return JSONXLSService.prepareExcel(REGISTER_TOKENS.pnc, register);
                }
            );
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