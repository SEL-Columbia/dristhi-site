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
                    var serialNumber = 0;
                    updateRegisterWithDate(register);
                    updateRegisterWithLocation(register, anm);
                    register.pncRegisterEntries.forEach(function (entry) {
                        entry.serialNumber = ++serialNumber;
                        entry.registrationDate = $moment(entry.registrationDate).format(DATE_FORMAT);
                        entry.wifeAge = $filter('humanizeWifeAge')(entry.wifeDOB);
                        entry.addressDetails = $filter('humanizeAndTitleize')(entry.wifeName) +
                            (entry.husbandName ? ', W/O ' + $filter('humanizeAndTitleize')(entry.husbandName) : '') +
                            (entry.address ? ', C/O ' + entry.address : '');
                        entry.placeOfDelivery = $filter('friendlyName')(entry.placeOfDelivery);
                        entry.deliveryComplications = entry.deliveryComplications ? _.str.humanize(entry.deliveryComplications.trim().split(' ').join(', ')) : '';
                        entry.dateOfDelivery = entry.dateOfDelivery ? $moment(entry.dateOfDelivery).format(DATE_FORMAT) : '';
                        entry.dischargeDate = entry.dischargeDate ? $moment(entry.dischargeDate).format(DATE_FORMAT) : '';
                        entry.fpMethodDate = entry.fpMethodDate ? $moment(entry.fpMethodDate).format(DATE_FORMAT) : '';

                        entry.childrenDetails = _.sortBy(entry.childrenDetails, function (child) {
                            return child.id;
                        });

                        var sortedPNCVisits = _.sortBy(entry.pncVisits, function (pncVisit) {
                            return pncVisit.date;
                        });

                        for (var index = 0; index < sortedPNCVisits.length; index++) {
                            entry['pncVisit' + (index + 1) + 'Details'] = $moment(sortedPNCVisits[index].date).format(DATE_FORMAT) + ' ' +
                                $filter('friendlyName')(sortedPNCVisits[index].place) + ', ' +
                                $filter('friendlyName')(sortedPNCVisits[index].person);
                        }

                        if (sortedPNCVisits.length !== 0) {
                            var motherProblems = ['difficulties', 'abdominalProblems', 'vaginalProblems', 'urinalProblems', 'breastProblems'];
                            var lastPNCVisit = _.last(sortedPNCVisits);
                            _.each(motherProblems, function (problem) {
                                lastPNCVisit[problem] = lastPNCVisit[problem] ? lastPNCVisit[problem].trim().split(' ').join(', ') : '';
                            });
                            entry.motherComplications = _.str.humanize(_.compact((_.values(
                                _.omit(lastPNCVisit, 'date', 'person', 'place', 'childrenDetails'))))
                                .join(', '));
                            entry.childrenComplications = _.sortBy(_.map(lastPNCVisit.childrenDetails, function (child) {
                                var childProblems = ['difficulties', 'activityProblems', 'breathingProblems', 'skinProblems'];
                                _.each(childProblems, function (problem) {
                                    child[problem] = child[problem] ? child[problem].trim().split(' ').join(', ') : '';
                                });
                                return {
                                    id: child.id,
                                    complications: _.str.humanize((_.compact(_.values(_.omit(child, 'id'))).join(', ')))
                                };
                            }), function (child) {
                                return child.id;
                            });
                        }
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