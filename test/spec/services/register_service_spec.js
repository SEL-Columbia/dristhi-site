'use strict';

describe('RegisterService: ', function () {

    var httpBackend, service, q;

    beforeEach(module('drishtiSiteApp'));
    beforeEach(inject(function ($httpBackend, $q, RegisterService) {
        httpBackend = $httpBackend;
        q = $q;
        service = RegisterService;
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

        var fpUsers = service.fpUsers(allECs);

        expect(fpUsers).toEqual(expectedFPUsers);
        Timecop.returnToPresent();
        Timecop.uninstall();
    });

    describe('Printable Registers: ', function () {
        it('should be able to download register for an ANM', function () {
            var expectedRegisters = {
                "ancRegisterEntries": [
                    {
                        "ancNumber": "5",
                        "registrationDate": "2013-09-10",
                        "ecNumber": "71",
                        "thayiCardNumber": "8188514",
                        "aadharCardNumber": null,
                        "wifeName": "Kamala",
                        "husbandName": "Manju Nayaka",
                        "address": null,
                        "wifeDOB": [
                            1988,
                            5,
                            15
                        ],
                        "phoneNumber": null,
                        "wifeEducationLevel": null,
                        "husbandEducationLevel": null,
                        "caste": "st",
                        "religion": "Hindu",
                        "economicStatus": "bpl",
                        "bplCardNumber": null,
                        "jsyBeneficiary": "yes",
                        "gravida": "1",
                        "parity": "1",
                        "numberOfLivingChildren": "1",
                        "numberOfStillBirths": "0",
                        "numberOfAbortions": "0",
                        "youngestChildDOB": null,
                        "lmp": "2013-08-06",
                        "edd": "Tue, 13 May 2014 00:00:00 GMT",
                        "height": null,
                        "bloodGroup": null,
                        "isHRP": "no",
                        "ancVisits": [
                            {
                                "ancVisitDate": "23/5/2014",
                                "weight": "34",
                                "bp": "233",
                                "hb": "567",
                                "urineSugar": "23",
                                "urineAlbumin": "11",
                                "rti": "22",
                                "sti": "33"
                            },
                            {
                                "ancVisitDate": "23/6/2014",
                                "weight": "343",
                                "bp": "233",
                                "hb": "567",
                                "urineSugar": "23",
                                "urineAlbumin": "11",
                                "rti": "22",
                                "sti": "33"
                            },
                            {}
                        ],
                        "tt": [
                            {
                                "dose": "TT1",
                                "date": "23/5/2014"
                            },
                            {
                                "dose": "TT2",
                                "date": "23/5/2014"
                            },
                            {
                                "dose": "TT3",
                                "date": "23/5/2014"
                            }
                        ],
                        "ifa": [
                            {
                                "numberOfTablets": "12",
                                "date": "22/12/2015"
                            },
                            {
                                "numberOfTablets": "12",
                                "date": "22/12/2015"
                            },
                            {}
                        ],
                        "remarks": [
                            {
                                "remark": "Good"
                            },
                            {},
                            {}
                        ],
                        "maxLength": 3,
                        "contentHolder": [{},{},{}]
                    }
                ]
            };
            var expectedRegisterDownloadURL = '/register_download_url';
            httpBackend.expectGET('https://smartregistries.org/registers/anc?anm-id=demo1')
                .respond(200, expectedRegisters);
            httpBackend.expectPOST('http://xls.ona.io/xls/e0739ade6dbb47a49c9115a93b3f433a', expectedRegisters).respond(201, expectedRegisterDownloadURL);

            var url = null;
            service.prepareRegisterFor('demo1', 'anc')
                .then(function (result) {
                    url = result
                });

            httpBackend.flush();
            expect(url).toEqual('http://xls.ona.io' + expectedRegisterDownloadURL);
        });

        it('should fill all services with empty objects to match length', function () {
            var entry = {
                "remarks": [
                    {
                        "remark": "Remark 1"
                    },
                    {
                        "remark": "Remark 2"
                    }
                ]
            };
            var expectedRegisters = {
                "remarks": [
                    {
                        "remark": "Remark 1"
                    },
                    {
                        "remark": "Remark 2"
                    }
                ],
                "ancVisits": [{},{}],
                tt: [{},{}],
                ifa: [{},{}],
                contentHolder: [{},{}],
                maxLength: 2
            };
            var registersWithServicesFilled = service.fillMissingValues(entry);
            expect(expectedRegisters).toEqual(registersWithServicesFilled);
        });
    });
});
