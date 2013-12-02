'use strict';

angular.module('drishtiSiteApp')
    .service('FPPrintRegisterService', function () {
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
                if (ec.fpDetails.method === "iud") {
                    fpUsers.iudUsers.push(ec);
                } else if (ec.fpDetails.method === "condom") {
                    fpUsers.condomUsers.push(ec);
                } else if (ec.fpDetails.method === "ocp") {
                    fpUsers.ocpUsers.push(ec);
                } else if (ec.fpDetails.method === "male_sterilization") {
                    fpUsers.maleSterilizationUsers.push(ec);
                } else if (ec.fpDetails.method === "female_sterilization") {
                    fpUsers.femaleSterilizationUsers.push(ec);
                }
            });
            return fpUsers;
        };

        return {
            fpUsers: function (allECs) {
                return getFPUsers(allECs)
            }
        }
    });