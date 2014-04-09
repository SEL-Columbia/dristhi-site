angular.module('drishtiSiteApp')
    .service('FPRegisterService', function ($http, $q, $moment, $filter, DRISHTI_WEB_BASE_URL, DATE_FORMAT, MONTH_FORMAT, DAY_MONTH_FORMAT, NEW_LINE, JSONXLSService, REGISTER_TOKENS) {
        'use strict';

        var prepareRegister = function (anm) {
            var getRegisterUrl = DRISHTI_WEB_BASE_URL + '/registers/fp?anm-id=' + anm.identifier;
            return $http({method: 'GET', url: getRegisterUrl})
                .then(function (result) {
                    return result.data;
                }, function () {
                    console.log('Error when getting FP register for anm:' + anm.identifier);
                    return $q.reject('Error when getting FP register for anm:' + anm.identifier);
                })
                .then(function (register) {
                    updateRegisterWithGeneratedDate(register);
                    updateRegisterWithLocation(register, anm);
                    updateIUDFPRegistries(register.iudRegisterEntries);
                    updateCondomFPRegistries(register.condomRegisterEntries);
                    updateOCPFPRegistries(register.ocpRegisterEntries);
                    updateMaleSterilizationFPRegistries(register.maleSterilizationRegisterEntries);
                    updateFemaleSterilizationFPRegistries(register.femaleSterilizationRegisterEntries);
                    register.endOfReportingYear = register.reportingYear + 1;
                    return JSONXLSService.prepareExcel(REGISTER_TOKENS.fp, register);
                }
            );
        };

        var updateIUDFPRegistries = function (iudFPRegistries) {
            var serialNumber = 0;
            iudFPRegistries.forEach(function (iudFPRegistry) {
                updateFPRegistriesWithSerialNumberAndAddressDetails(iudFPRegistry, ++serialNumber);
            });
        };

        var updateCondomFPRegistries = function (condomFPRegistries) {
            var serialNumber = 0;
            condomFPRegistries.forEach(function (condomFPRegistry) {
                updateFPRegistriesWithSerialNumberAndAddressDetails(condomFPRegistry, ++serialNumber);
                updateRefill(condomFPRegistry);
            });
        };

        var updateOCPFPRegistries = function (ocpFPRegistries) {
            var serialNumber = 0;
            ocpFPRegistries.forEach(function (ocpFPRegistry) {
                updateFPRegistriesWithSerialNumberAndAddressDetails(ocpFPRegistry, ++serialNumber);
                updateRefill(ocpFPRegistry);
            });

        };

        var updateMaleSterilizationFPRegistries = function (maleSterilizationFPRegistries) {
            var serialNumber = 0;
            maleSterilizationFPRegistries.forEach(function (maleSterilizationFPRegistry) {
                updateFPRegistriesWithSerialNumberAndAddressDetails(maleSterilizationFPRegistry, ++serialNumber);
                updateSterilizationAndFollowupVisitDatesFormat(maleSterilizationFPRegistry);
            });

        };

        var updateFemaleSterilizationFPRegistries = function (femaleSterilizationFPRegistries) {
            var serialNumber = 0;
            femaleSterilizationFPRegistries.forEach(function (femaleSterilizationFPRegistry) {
                updateFPRegistriesWithSerialNumberAndAddressDetails(femaleSterilizationFPRegistry, ++serialNumber);
                updateSterilizationAndFollowupVisitDatesFormat(femaleSterilizationFPRegistry);
            });
        };

        var updateSterilizationAndFollowupVisitDatesFormat = function (sterilizationFPRegistry) {
            sterilizationFPRegistry.fpDetails.sterilizationDate = formatDate(sterilizationFPRegistry.fpDetails.sterilizationDate);
            sterilizationFPRegistry.fpDetails.followupVisitDates = sterilizationFPRegistry.fpDetails.followupVisitDates.map(function (date) {
                return formatDate(date);
            });
        };

        var updateFPRegistriesWithSerialNumberAndAddressDetails = function (entry, serialNumber) {
            entry.serialNumber = serialNumber;
            if (entry.fpDetails.fpAcceptanceDate) {
                entry.fpDetails.fpAcceptanceDate = formatDate(entry.fpDetails.fpAcceptanceDate);
            }
            updateAddressDetails(entry);
            entry.casteReligionDetails = $filter('friendlyName')(entry.caste);
            entry.casteReligionDetails += (entry.caste && entry.religion) ? ' / ' : '';
            entry.casteReligionDetails += $filter('friendlyName')(entry.religion);
        };

        var formatDate = function (date) {
            return $moment(date).format(DATE_FORMAT);
        };

        var updateRefill = function (entry) {
            entry.fpDetails.reportingRefills = {};
            var months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
            _.each(months, function (month) {
                var refillsForGivenMonth = _.filter(entry.fpDetails.refills, function (refill) {
                    return $moment(refill.date).format(MONTH_FORMAT) === month;
                });
                entry.fpDetails.reportingRefills[month] = _.map(refillsForGivenMonth,function (refill) {
                    return $moment(refill.date).format(DAY_MONTH_FORMAT) + ' (' + refill.quantity + ')';
                }).join(NEW_LINE);
            });
        };

        var updateAddressDetails = function (fpRegisterEntry) {
            var motherName = $filter('humanizeAndTitleize')(fpRegisterEntry.wifeName);
            var fatherName = fpRegisterEntry.husbandName ? ', W/O ' + $filter('humanizeAndTitleize')(fpRegisterEntry.husbandName) : '';
            var village = fpRegisterEntry.village ? ', C/O ' + $filter('humanizeAndTitleize')(fpRegisterEntry.village) : '';
            fpRegisterEntry.addressDetails = motherName + fatherName + village;
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
    }
)
;