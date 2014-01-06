'use strict';

describe('Service: RegisterService', function () {

    var registerService;

    beforeEach(module('drishtiSiteApp'));
    beforeEach(inject(function (RegisterService) {
        registerService = RegisterService;
    }));

    it('should return empty fpUsers', function () {
        var allECs = [
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
                        "remarks": ""
                    }
                }
            },
            {
                "registrationDate": "2013-01-01",
                "ecNumber": "1",
                "wifeName": "Meenakshi",
                "husbandName": "Parameshwara",
                "village": "Bherya",
                "wifeDOB": "1987-09-17",
                "husbandDOB": "1984-11-10",
                "caste": "c_others",
                "religion": "hindu",
                "wifeEducationLevel": "graduate",
                "husbandEducationLevel": "graduate",
                "lmp": "",
                "upt": "-ve",
                "maleChildren": "0",
                "femaleChildren": "0",
                "fpDetails": {
                    "method": "condom",
                    "details": {
                        "refillDates": [
                            "2013-01-03",
                            "2013-02-05"
                        ],
                        "remarks": "Need to supply Condom to this couple"
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
                "caste": "",
                "religion": "hindu",
                "wifeEducationLevel": "",
                "husbandEducationLevel": "",
                "lmp": "",
                "upt": "",
                "maleChildren": "",
                "femaleChildren": "",
                "fpDetails": {
                    "method": "ocp",
                    "details": {
                        "refillDates": [
                            "2013-02-01",
                            "2013-02-04"
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
                "wifeEducationLevel": "",
                "husbandEducationLevel": "",
                "lmp": "",
                "upt": "",
                "maleChildren": "",
                "femaleChildren": "",
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
                "maleChildren": "",
                "femaleChildren": "",
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

        var expectedFPUsers = {
            "iudUsers": [
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
                            "remarks": ""
                        }
                    },
                    "wifeAge": 29,
                    "husbandAge": 31
                }
            ],
            "condomUsers": [
                {
                    "registrationDate": "2013-01-01",
                    "ecNumber": "1",
                    "wifeName": "Meenakshi",
                    "husbandName": "Parameshwara",
                    "wifeDOB": "1987-09-17",
                    "village": "Bherya",
                    "husbandDOB": "1984-11-10",
                    "caste": "c_others",
                    "religion": "hindu",
                    "wifeEducationLevel": "graduate",
                    "husbandEducationLevel": "graduate",
                    "lmp": "",
                    "upt": "-ve",
                    "maleChildren": "0",
                    "femaleChildren": "0",
                    "fpDetails": {
                        "method": "condom",
                        "details": {
                            "refillDates": [
                                "2013-01-03",
                                "2013-02-05"
                            ],
                            "remarks": "Need to supply Condom to this couple"
                        }
                    },
                    "wifeAge": 26,
                    "husbandAge": 29
                }
            ],
            "ocpUsers": [
                {
                    "registrationDate": "2013-02-01",
                    "ecNumber": "34",
                    "wifeName": "Gayathri",
                    "husbandName": "Raju",
                    "village": "Gauribidanur",
                    "wifeDOB": "1980-01-03",
                    "husbandDOB": "1975-04-02",
                    "caste": "",
                    "religion": "hindu",
                    "wifeEducationLevel": "",
                    "husbandEducationLevel": "",
                    "lmp": "",
                    "upt": "",
                    "maleChildren": "",
                    "femaleChildren": "",
                    "fpDetails": {
                        "method": "ocp",
                        "details": {
                            "refillDates": [
                                "2013-02-01",
                                "2013-02-04"
                            ],
                            "remarks": ""
                        }
                    },
                    "wifeAge": 34,
                    "husbandAge": 38
                }
            ],
            "maleSterilizationUsers": [
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
                    "wifeEducationLevel": "",
                    "husbandEducationLevel": "",
                    "lmp": "",
                    "upt": "",
                    "maleChildren": "",
                    "femaleChildren": "",
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
                    },
                    "wifeAge": 32,
                    "husbandAge": 33
                }
            ],
            "femaleSterilizationUsers": [
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
                    "maleChildren": "",
                    "femaleChildren": "",
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
                    },
                    "wifeAge": 27,
                    "husbandAge": 29
                }
            ]
        };
        Timecop.install();
        Timecop.freeze(Date.parse('2014-01-01'));

        var fpUsers = registerService.fpUsers(allECs);

        expect(fpUsers).toEqual(expectedFPUsers);
        Timecop.returnToPresent();
        Timecop.uninstall();
    });
});
