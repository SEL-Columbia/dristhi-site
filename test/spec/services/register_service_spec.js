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

    describe('Printable Registers:', function () {

        describe('ANC Register:', function () {
            it('should be able to download ANC register for an ANM', function () {
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
                            "wifeAge": 25,
                            "phoneNumber": null,
                            "wifeEducationLevel": null,
                            "husbandEducationLevel": null,
                            "caste": "st",
                            "religion": "Hindu",
                            "economicStatus": "bpl",
                            "bplCardNumber": "1234",
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
                                    "bpSystolic": "120",
                                    "bpDiastolic": "80",
                                    "hb": "567",
                                    "urineSugar": "23",
                                    "urineAlbumin": "11",
                                    "rti": "22",
                                    "sti": "33",
                                    "rtiSTIValue": "22/33"
                                },
                                {
                                    "ancVisitDate": "23/6/2014",
                                    "weight": "343",
                                    "bpSystolic": "120",
                                    "bpDiastolic": "80",
                                    "hb": "567",
                                    "urineSugar": "23",
                                    "urineAlbumin": "11",
                                    "rti": "22",
                                    "sti": "33",
                                    "rtiSTIValue": "22/33"
                                },
                                {
                                    "rtiSTIValue": ""
                                }
                            ],
                            "ttDoses": [
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
                            "ifaTablets": null,
                            "remarks": [
                                {
                                    "remark": "Good"
                                }
                            ],
                            "maxLength": 3,
                            "addressDetails": "Kamala, W/O Manju Nayaka",
                            "casteReligionDetails": "ST/Hindu",
                            "lmpEDDDetails": "2013-08-06 2014-05-13"
                        }
                    ],
                    "anmDetails": {
                        "location": {
                            "phc": "phc"
                        },
                        "name": "Demo 1"
                    },
                    "generatedDate": "2014-02-04"
                };

                var expectedPostBodyPayload = {
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
                            "wifeAge": 25,
                            "phoneNumber": null,
                            "wifeEducationLevel": null,
                            "husbandEducationLevel": null,
                            "caste": "st",
                            "religion": "Hindu",
                            "economicStatus": "BPL(1234)",
                            "bplCardNumber": "1234",
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
                                    "bpSystolic": "120",
                                    "bpDiastolic": "80",
                                    "hb": "567",
                                    "urineSugar": "23",
                                    "urineAlbumin": "11",
                                    "rti": "22",
                                    "sti": "33",
                                    "rtiSTIValue": "22/33",
                                    "bp": "120/80"
                                },
                                {
                                    "ancVisitDate": "23/6/2014",
                                    "weight": "343",
                                    "bpSystolic": "120",
                                    "bpDiastolic": "80",
                                    "hb": "567",
                                    "urineSugar": "23",
                                    "urineAlbumin": "11",
                                    "rti": "22",
                                    "sti": "33",
                                    "rtiSTIValue": "22/33",
                                    "bp": "120/80"
                                },
                                {
                                    "rtiSTIValue": "",
                                    "bp": ""
                                }
                            ],
                            "ttDoses": [
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
                            "ifaTablets": [
                                {},
                                {},
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
                            "addressDetails": "Kamala, W/O Manju Nayaka",
                            "casteReligionDetails": "ST/Hindu",
                            "lmpEDDDetails": "2013-08-06 2014-05-13",
                            "contentHolder": [
                                {},
                                {},
                                {}
                            ]
                        }
                    ],
                    "anmDetails": {
                        "location": {
                            "phc": "phc"
                        },
                        "name": "Demo 1"
                    },
                    "generatedDate": "2014-02-04"
                };
                Timecop.install();
                Timecop.freeze(Date.parse('2014-02-04'));

                var expectedRegisterDownloadURL = '/register_download_url';
                httpBackend.expectGET('https://smartregistries.org/registers/anc?anm-id=demo1')
                    .respond(200, expectedRegisters);
                httpBackend.expectPOST('http://xls.ona.io/xls/dd3ac9bd3d7f469fbc7d0c7d73a442e6', expectedPostBodyPayload).respond(201, expectedRegisterDownloadURL);

                var url = null;
                service.prepareRegisterForANC({identifier: 'demo1', name: 'Demo 1', location: { phc: "phc" }})
                    .then(function (result) {
                        url = result
                    });

                httpBackend.flush();
                expect(url).toEqual('http://xls.ona.io' + expectedRegisterDownloadURL);
                Timecop.returnToPresent();
                Timecop.uninstall();
            });
        });


        describe('EC Register:', function () {
            it('should be able to download EC register for an ANM', function () {
                var jsonResponse = {
                    "ecRegisterEntries": [
                        {
                            "registrationDate": "2013-05-15",
                            "ecNumber": "90",
                            "wifeName": "Sowmya",
                            "husbandName": "Manjunatha",
                            "householdAddress": null,
                            "householdNumber": "77",
                            "headOfHousehold": null,
                            "village": "hosa_agrahara",
                            "subCenter": "hosa_agrahara",
                            "phc": "bherya",
                            "wifeAge": "27",
                            "husbandAge": "38",
                            "wifeEducationLevel": null,
                            "husbandEducationLevel": null,
                            "caste": "c_others",
                            "religion": "Hindu",
                            "economicStatus": "bpl",
                            "gravida": "2",
                            "parity": "2",
                            "numberOfLivingChildren": "2",
                            "numberOfStillBirths": "0",
                            "numberOfAbortions": "0",
                            "numberOfLivingMaleChildren": "1",
                            "numberOfLivingFemaleChildren": "1",
                            "youngestChildAge": "24",
                            "currentFPMethod": "female_sterilization",
                            "currentFPMethodStartDate": "2009-04-28",
                            "isPregnant": "no"
                        }
                    ],
                    "anmDetails": {
                        "name": "Demo 1",
                        "location": {
                            "phc": "phc"
                        }
                    }
                };

                var expectedPayload = {
                    "ecRegisterEntries": [
                        {
                            "registrationDate": "2013-05-15",
                            "ecNumber": "90",
                            "wifeName": "Sowmya",
                            "husbandName": "Manjunatha",
                            "householdAddress": null,
                            "householdNumber": "77",
                            "headOfHousehold": null,
                            "village": "Hosa Agrahara",
                            "subCenter": "hosa_agrahara",
                            "phc": "bherya",
                            "wifeAge": "27",
                            "husbandAge": "38",
                            "wifeEducationLevel": null,
                            "husbandEducationLevel": null,
                            "caste": "Others",
                            "religion": "Hindu",
                            "economicStatus": "BPL",
                            "gravida": "2",
                            "parity": "2",
                            "numberOfLivingChildren": "2",
                            "numberOfStillBirths": "0",
                            "numberOfAbortions": "0",
                            "numberOfLivingMaleChildren": "1",
                            "numberOfLivingFemaleChildren": "1",
                            "youngestChildAge": "24",
                            "currentFPMethod": "Female Sterilization",
                            "currentFPMethodStartDate": "2009-04-28",
                            "isPregnant": "No",
                            "householdDetails": "77",
                            "educationLevel": "",
                            "ageDetails": "27 / 38"
                        }
                    ],
                    "anmDetails": {
                        "location": {
                            "phc": "phc"
                        },
                        "name": "Demo 1"
                    },
                    "generatedDate": "2014-02-04"
                };
                Timecop.install();
                Timecop.freeze(Date.parse('2014-02-04'));
                var expectedRegisterDownloadURL = '/register_download_url';
                httpBackend.expectGET('https://smartregistries.org/registers/ec?anm-id=demo1').respond(200, jsonResponse);
                httpBackend.expectPOST('http://xls.ona.io/xls/e86e0e2211f54b128181cdec0b63cb11', expectedPayload).respond(201, expectedRegisterDownloadURL);

                var url = null;
                service.prepareRegisterForEC({identifier: 'demo1', name: 'Demo 1', location: { phc: "phc" }})
                    .then(function (result) {
                        url = result
                    });

                httpBackend.flush();
                expect(url).toEqual('http://xls.ona.io' + expectedRegisterDownloadURL);
                Timecop.returnToPresent();
                Timecop.uninstall();
            });
        });
    });
});
