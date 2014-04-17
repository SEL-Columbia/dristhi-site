angular.module('drishtiSiteApp')
    .service('FPRegisterService', function ($http, $q, $moment, $filter, DRISHTI_WEB_BASE_URL, DATE_FORMAT, MONTH_FORMAT, DAY_MONTH_FORMAT, NEW_LINE, JSONXLSService, REGISTER_TOKENS) {
        'use strict';

        var REPORT_MONTH_END_DAY = 25;
        var REPORT_MONTH_START_DAY = 26;
        var JANUARY = 0;
        var FEBRUARY = 1;
        var MARCH = 2;
        var APRIL = 3;
        var DECEMBER = 11;

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
                    updateRegisterWithStartAndEndOfReportingYear(register);
                    updateRegisterWithLocation(register, anm);
                    register.iudRegisterEntries = updateIUDFPRegistries(register.iudRegisterEntries);
                    register.condomRegisterEntries = updateCondomFPRegistries(register.condomRegisterEntries);
                    register.ocpRegisterEntries = updateOCPFPRegistries(register.ocpRegisterEntries);
                    register.maleSterilizationRegisterEntries =
                        updateMaleSterilizationFPRegistries(register.maleSterilizationRegisterEntries);
                    register.femaleSterilizationRegisterEntries =
                        updateFemaleSterilizationFPRegistries(register.femaleSterilizationRegisterEntries);
                    return JSONXLSService.prepareExcel(REGISTER_TOKENS.fp, register);
                }
            );
        };

        var updateIUDFPRegistries = function (iudFPRegistries) {
            iudFPRegistries = sortRegistries(iudFPRegistries);
            var serialNumber = 0;
            iudFPRegistries.forEach(function (iudFPRegistry) {
                updateFPRegistriesWithSerialNumberAndAddressDetails(iudFPRegistry, ++serialNumber);
                iudFPRegistry.fpDetails.lmpDate = iudFPRegistry.fpDetails.lmpDate ? formatDate(iudFPRegistry.fpDetails.lmpDate) : '';
                iudFPRegistry.fpDetails.uptResult = $filter('friendlyName')(iudFPRegistry.fpDetails.uptResult);
                updateHusbandAge(iudFPRegistry);
            });
            return iudFPRegistries;
        };

        var updateCondomFPRegistries = function (condomFPRegistries) {
            var serialNumber = 0;
            var startOfReportingYear = startDateOfCurrentReportYear();
            var endOfReportingYear = endDateOfCurrentReportYear();
            var reportingCondomFPRegistries = _.filter(condomFPRegistries, function (registry) {
                return  $moment(registry.fpDetails.fpAcceptanceDate) >= $moment(startOfReportingYear) &&
                    $moment(registry.fpDetails.fpAcceptanceDate) <= $moment(endOfReportingYear);
            });
            reportingCondomFPRegistries = sortRegistries(reportingCondomFPRegistries);
            reportingCondomFPRegistries.forEach(function (condomFPRegistry) {
                updateFPRegistriesWithSerialNumberAndAddressDetails(condomFPRegistry, ++serialNumber);
                updateRefill(condomFPRegistry);
            });
            return reportingCondomFPRegistries;
        };

        var updateOCPFPRegistries = function (ocpFPRegistries) {
            var serialNumber = 0;
            var startOfReportingYear = startDateOfCurrentReportYear();
            var endOfReportingYear = endDateOfCurrentReportYear();
            var reportingOCPFPRegistries = _.filter(ocpFPRegistries, function (registry) {
                return  $moment(registry.fpDetails.fpAcceptanceDate) >= $moment(startOfReportingYear) &&
                    $moment(registry.fpDetails.fpAcceptanceDate) <= $moment(endOfReportingYear);
            });
            reportingOCPFPRegistries = sortRegistries(reportingOCPFPRegistries);
            reportingOCPFPRegistries.forEach(function (ocpFPRegistry) {
                updateFPRegistriesWithSerialNumberAndAddressDetails(ocpFPRegistry, ++serialNumber);
                updateRefill(ocpFPRegistry);
                ocpFPRegistry.fpDetails.lmpDate = ocpFPRegistry.fpDetails.lmpDate ? formatDate(ocpFPRegistry.fpDetails.lmpDate) : '';
                ocpFPRegistry.fpDetails.uptResult = $filter('friendlyName')(ocpFPRegistry.fpDetails.uptResult);
            });
            return reportingOCPFPRegistries;
        };

        var updateMaleSterilizationFPRegistries = function (maleSterilizationFPRegistries) {
            var serialNumber = 0;
            var today = new Date();
            var sixMonthsAgo = new Date(today.getUTCFullYear(), today.getMonth() - 6, today.getDate());
            var reportingMaleSterilizationFPRegistries = _.filter(maleSterilizationFPRegistries, function (registry) {
                return $moment(registry.fpDetails.sterilizationDate) >= $moment(sixMonthsAgo);
            });
            reportingMaleSterilizationFPRegistries = sortSterilizationRegistries(reportingMaleSterilizationFPRegistries);
            reportingMaleSterilizationFPRegistries.forEach(function (maleSterilizationFPRegistry) {
                updateFPRegistriesWithSerialNumberAndAddressDetails(maleSterilizationFPRegistry, ++serialNumber);
                updateSterilizationDetailsFormat(maleSterilizationFPRegistry);
                updateHusbandAge(maleSterilizationFPRegistry);
            });
            return reportingMaleSterilizationFPRegistries;
        };

        var updateFemaleSterilizationFPRegistries = function (femaleSterilizationFPRegistries) {
            var serialNumber = 0;
            var today = new Date();
            var sixMonthsAgo = new Date(today.getUTCFullYear(), today.getMonth() - 6, today.getDate());
            var reportingFemaleSterilizationFPRegistries = _.filter(femaleSterilizationFPRegistries, function (registry) {
                return $moment(registry.fpDetails.sterilizationDate) >= $moment(sixMonthsAgo);
            });
            reportingFemaleSterilizationFPRegistries = sortSterilizationRegistries(reportingFemaleSterilizationFPRegistries);
            reportingFemaleSterilizationFPRegistries.forEach(function (femaleSterilizationFPRegistry) {
                updateFPRegistriesWithSerialNumberAndAddressDetails(femaleSterilizationFPRegistry, ++serialNumber);
                updateSterilizationDetailsFormat(femaleSterilizationFPRegistry);
                updateHusbandAge(femaleSterilizationFPRegistry);
            });
            return reportingFemaleSterilizationFPRegistries;
        };

        var sortRegistries = function (registries) {
            return _.sortBy(registries, function (registry) {
                return registry.fpDetails.fpAcceptanceDate;
            });
        };

        var sortSterilizationRegistries = function (registries) {
            return _.sortBy(registries, function (registry) {
                return registry.fpDetails.sterilizationDate;
            });
        };


        var updateSterilizationDetailsFormat = function (sterilizationFPRegistry) {
            sterilizationFPRegistry.fpDetails.typeOfSterilization = sterilizationFPRegistry.fpDetails.typeOfSterilization ?
                sterilizationFPRegistry.fpDetails.typeOfSterilization : '';
            sterilizationFPRegistry.fpDetails.sterilizationDate = formatDate(sterilizationFPRegistry.fpDetails.sterilizationDate);
            sterilizationFPRegistry.fpDetails.followupVisitDates = sterilizationFPRegistry.fpDetails.followupVisitDates.map(function (date) {
                return formatDate(date);
            });
        };

        var updateHusbandAge = function (fpRegisterEntry) {
            fpRegisterEntry.husbandAge = fpRegisterEntry.husbandAge ? fpRegisterEntry.husbandAge : '';
        };

        var updateFPRegistriesWithSerialNumberAndAddressDetails = function (entry, serialNumber) {
            updateEducationLevelDetails(entry);
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

        var updateEducationLevelDetails = function (fpRegisterEntry) {
            fpRegisterEntry.wifeHusbandEducationLevels =
                fpRegisterEntry.wifeEducationLevel ? fpRegisterEntry.wifeEducationLevel : '';
            fpRegisterEntry.wifeHusbandEducationLevels +=
                (fpRegisterEntry.wifeEducationLevel && fpRegisterEntry.husbandEducationLevel) ? ' / ' : '';
            fpRegisterEntry.wifeHusbandEducationLevels +=
                fpRegisterEntry.husbandEducationLevel ? fpRegisterEntry.husbandEducationLevel : '';
        };

        var updateRegisterWithGeneratedDate = function (register) {
            register.generatedDate = $moment().format(DATE_FORMAT);
        };

        var updateRegisterWithStartAndEndOfReportingYear = function (register) {
            register.startOfReportingYear = startDateOfCurrentReportYear().getUTCFullYear();
            var year = endDateOfCurrentReportYear();
            register.endOfReportingYear = year.getUTCFullYear();
        };

        var endDateOfCurrentReportYear = function () {
            var today = new Date();
            if ((today.getMonth() === MARCH && today.getDate() > REPORT_MONTH_END_DAY) ||
                (today.getMonth() >= APRIL && today.getMonth() <= DECEMBER)) {
                return new Date(today.getUTCFullYear() + 1, MARCH, REPORT_MONTH_END_DAY);
            }
            if ((today.getMonth() >= JANUARY && today.getMonth() <= FEBRUARY) ||
                (today.getMonth() === MARCH && today.getDate() <= REPORT_MONTH_END_DAY)) {
                return new Date(today.getUTCFullYear(), MARCH, REPORT_MONTH_END_DAY);
            }
        };

        var startDateOfCurrentReportYear = function () {
            var today = new Date();
            if ((today.getMonth() === MARCH && today.getDate() < REPORT_MONTH_START_DAY) ||
                (today.getMonth() >= JANUARY && today.getMonth() <= FEBRUARY)) {
                return new Date(today.getUTCFullYear() - 1, MARCH, REPORT_MONTH_START_DAY);
            }
            if ((today.getMonth() >= APRIL && today.getMonth() <= DECEMBER) ||
                (today.getMonth() === MARCH && today.getDate() >= REPORT_MONTH_START_DAY)) {
                return new Date(today.getUTCFullYear(), MARCH, REPORT_MONTH_START_DAY);
            }
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
