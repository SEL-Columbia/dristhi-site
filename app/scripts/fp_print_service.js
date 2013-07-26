'use strict';

angular.module('drishtiSiteApp')
    .service('FPPrintRegisterService', function () {
        var allECs = [
            {
                "registrationDate": "2013-01-01",
                "ecNumber": "1",
                "wifeName": "Maanu",
                "husbandName": "Putta",
                "village": "Bherya",
                "wifeDOB": "1987-09-17",
                "husbandDOB": "1985-12-20",
                "caste": "c_others",
                "religion": "hindu",
                "wifeEducationLevel": "graduate",
                "husbandEducationLevel": "graduate",
                "lmp": "2012-12-15",
                "upt": "-ve",
                "maleChildren": "0",
                "femaleChildren": "0",
                "fpDetails": {
                    "method": "condom",
                    "details": {
                        "refillDates": [
                            "2013-04-03",
                            "2013-05-05",
                            "", "2013-07-07", "2013-08-15", "", "", "2013-11-20", "", "", "", ""
                        ],
                        "remarks": "Need to supply Condom to this couple"
                    }
                }
            },
            {
                "registrationDate": "2013-02-01",
                "ecNumber": "12",
                "wifeName": "Pavani",
                "husbandName": "Pavan",
                "village": "T Narasipura",
                "wifeDOB": "1990-01-14",
                "husbandDOB": "1986-08-13",
                "caste": "c_others",
                "religion": "hindu",
                "wifeEducationLevel": "graduate",
                "husbandEducationLevel": "graduate",
                "lmp": "2013-01-27",
                "upt": "-ve",
                "maleChildren": "0",
                "femaleChildren": "0",
                "fpDetails": {
                    "method": "condom",
                    "details": {
                        "refillDates": [
                            "2013-04-19",
                            "2013-05-04",
                            "2013-06-05",
                            "2013-07-06",
                            "", "2013-09-20", "", "2013-10-10", "", "", "2013-02-01", "2013-03-17"
                        ],
                        "remarks": "Have to meet them during village visit next week"
                    }
                }
            },
            {
                "registrationDate": "2013-02-26",
                "ecNumber": "12",
                "wifeName": "Ahalya",
                "husbandName": "Pandu",
                "village": "Bannur",
                "wifeDOB": "1988-03-11",
                "husbandDOB": "1985-07-11",
                "caste": "sc",
                "religion": "hindu",
                "wifeEducationLevel": "illeterate",
                "husbandEducationLevel": "puc",
                "lmp": "2013-02-10",
                "upt": "-ve",
                "maleChildren": "1",
                "femaleChildren": "0",
                "fpDetails": {
                    "method": "condom",
                    "details": {
                        "refillDates": [
                            "2013-04-01",
                            "2013-05-06",
                            "2013-06-02",
                            "2013-07-15",
                            "2013-08-11", "", "2013-10-22", "2013-11-01", "2013-12-20", "", "2013-2-01", "2013-02-17"
                        ]
                    }
                }
            },
            {
                "registrationDate": "2013-03-02",
                "ecNumber": "2",
                "wifeName": "Rani",
                "husbandName": "Raja",
                "village": "Keelanapura",
                "wifeDOB": "1984-08-01",
                "husbandDOB": "1983-01-01",
                "caste": "sc",
                "religion": "hindu",
                "wifeEducationLevel": "illiterate",
                "husbandEducationLevel": "illiterate",
                "lmp": "",
                "upt": "-ve",
                "maleChildren": "0",
                "femaleChildren": "1",
                "fpDetails": {
                    "method": "iud",
                    "details": {
                        "iudDateOfInsertion": "2013-04-01",
                        "iudPlaceOfInsertion": "phc",
                        "iudInserterName": "bhagya",
                        "remarks": "Have to meet them during village visit next week"
                    }
                }
            },
            {
                "registrationDate": "2013-04-01",
                "ecNumber": "245",
                "wifeName": "baby",
                "husbandName": "Anthony",
                "village": "bherya",
                "wifeDOB": "1982-06-01",
                "husbandDOB": "1978-08-01",
                "caste": "c_others",
                "religion": "christian",
                "wifeEducationLevel": "graduate",
                "husbandEducationLevel": "post graduate",
                "lmp": "2013-02-01",
                "upt": "-ve",
                "maleChildren": "1",
                "femaleChildren": "1",
                "fpDetails": {
                    "method": "iud",
                    "details": {
                        "iudDateOfInsertion": "2012-03-01",
                        "iudPlaceOfInsertion": "subcenter",
                        "iudInserterName": "Dr Rangachari",
                        "remarks": "Follow up in 2 months"
                    }
                }
            },
            {
                "registrationDate": "2013-04-10",
                "ecNumber": "25",
                "wifeName": "Fathima",
                "husbandName": "Abdullaha",
                "village": "bherya",
                "wifeDOB": "1985-02-23",
                "husbandDOB": "1977-12-28",
                "caste": "",
                "religion": "muslim",
                "wifeEducationLevel": "illeterate",
                "husbandEducationLevel": "sslc",
                "lmp": "2013-03-18",
                "upt": "-ve",
                "maleChildren": "0",
                "femaleChildren": "1",
                "fpDetails": {
                    "method": "iud",
                    "details": {
                        "iudDateOfInsertion": "2013-02-23",
                        "iudPlaceOfInsertion": "district hospital",
                        "iudInserterName": "LHV Latha",
                        "remarks": "Follow up in 1 months"
                    }
                }
            },
            {
                "registrationDate": "2013-02-01",
                "ecNumber": "34",
                "wifeName": "Gayathri",
                "husbandName": "Raju",
                "village": "Gauribidanur",
                "wifeDOB": "1980-01-03",
                "husbandDOB": "1975-04-02",
                "caste": "sc",
                "religion": "hindu",
                "wifeEducationLevel": "illiterate",
                "husbandEducationLevel": "illiterate",
                "lmp": "",
                "upt": "-ve",
                "maleChildren": "1",
                "femaleChildren": "1",
                "fpDetails": {
                    "method": "ocp",
                    "details": {
                        "refillDates": [
                            "2013-02-01",
                            "2013-02-04",
                            "", "", "", "", "", "", "", "", "", ""
                        ],
                        "remarks": ""
                    }
                }
            },
            {
                "registrationDate": "2013-04-02",
                "ecNumber": "54",
                "wifeName": "Fiza",
                "husbandName": "Farooq",
                "village": "Dammatmari",
                "wifeDOB": "1982-01-01",
                "husbandDOB": "1981-01-02",
                "caste": "",
                "religion": "muslim",
                "wifeEducationLevel": "graduate",
                "husbandEducationLevel": "graduate",
                "lmp": "",
                "upt": "",
                "maleChildren": "1",
                "femaleChildren": "1",
                "fpDetails": {
                    "method": "male_sterilization",
                    "details": {
                        "doctorName": "krishna murthy",
                        "typeOfSterilization": "nsv",
                        "sterilizationDate": "2013-05-01",
                        "followupVisitDates": [
                            "2013-05-06",
                            "2013-05-10",
                            "2013-06-10"
                        ],
                        "remarks": ""
                    }
                }
            },
            {
                "registrationDate": "2013-05-12",
                "ecNumber": "543",
                "wifeName": "Rangamma",
                "husbandName": "Chandru",
                "village": "Bychapura",
                "wifeDOB": "1986-03-01",
                "husbandDOB": "1984-03-04",
                "caste": "",
                "religion": "jain",
                "wifeEducationLevel": "",
                "husbandEducationLevel": "",
                "lmp": "",
                "upt": "",
                "maleChildren": "1",
                "femaleChildren": "0",
                "fpDetails": {
                    "method": "female_sterilization",
                    "details": {
                        "doctorName": "bhyrappa",
                        "typeOfSterilization": "",
                        "sterilizationDate": "2013-06-02",
                        "followupVisitDates": [
                            "2013-06-06",
                            "2013-06-10",
                            "2013-07-10"
                        ],
                        "remarks": ""
                    }
                }
            }
        ];

        var getFPUsers = function () {
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
            fpUsers: function () {
                return getFPUsers()
            }
        }
    });