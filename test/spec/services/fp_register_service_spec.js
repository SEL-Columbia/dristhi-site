'use strict';

describe('FP Register Service: ', function () {

    var httpBackend, service, q, moment;

    beforeEach(module('drishtiSiteApp'));
    beforeEach(inject(function ($httpBackend, $q, $moment, FPRegisterService) {
        httpBackend = $httpBackend;
        q = $q;
        moment = $moment;
        service = FPRegisterService;
    }));

    it('should be able to download FP register for an ANM', function () {
        var expectedRegisters = {
            "iudRegisterEntries": [
                {
                    "ecNumber": "90",
                    "wifeName": "Saranya",
                    "husbandName": "Manjunatha",
                    "village": "hosa_agrahara",
                    "subCenter": "hosa_agrahara",
                    "wifeAge": "27",
                    "husbandAge": "38",
                    "caste": "c_others",
                    "religion": "Hindu",
                    "numberOfLivingMaleChildren": "1",
                    "numberOfLivingFemaleChildren": "1",
                    "wifeEducationLevel": "illiterate",
                    "husbandEducationLevel": "illiterate",
                    "fpDetails": {
                        "fpAcceptanceDate": "2014-02-23",
                        "iudPlace": "district hospital",
                        "remarks": "Follow up in 1 month",
                        "lmpDate": "2014-05-12",
                        "uptResult": "+ve"
                    }
                },
                {
                    "ecNumber": "92",
                    "wifeName": "Suganya",
                    "husbandName": "Raghu",
                    "village": "hosa_agrahara",
                    "subCenter": "hosa_agrahara",
                    "wifeAge": "27",
                    "husbandAge": "38",
                    "caste": "c_others",
                    "religion": "Hindu",
                    "numberOfLivingMaleChildren": "1",
                    "numberOfLivingFemaleChildren": "1",
                    "wifeEducationLevel": "illiterate",
                    "husbandEducationLevel": "illiterate",
                    "fpDetails": {
                        "fpAcceptanceDate": "2014-02-25",
                        "iudPlace": "phc",
                        "remarks": "Follow up in 1 month",
                        "lmpDate": "2014-05-12",
                        "uptResult": "+ve"
                    }

                }
            ],
            "condomRegisterEntries": [
                {
                    "ecNumber": "90",
                    "wifeName": "Saranya",
                    "husbandName": "Manjunatha",
                    "village": "hosa_agrahara",
                    "subCenter": "hosa_agrahara",
                    "wifeAge": "27",
                    "caste": "c_others",
                    "religion": "Hindu",
                    "numberOfLivingMaleChildren": "1",
                    "numberOfLivingFemaleChildren": "1",
                    "wifeEducationLevel": "illiterate",
                    "husbandEducationLevel": "illiterate",
                    "fpDetails": {
                        "fpAcceptanceDate": "2014-02-25",
                        "refills": [
                            {
                                "date": "2014-10-23",
                                "quantity": "20"

                            },
                            {
                                "date": "2014-11-22",
                                "quantity": "10"

                            }
                        ]
                    }
                }
            ],
            "ocpRegisterEntries": [
                {
                    "ecNumber": "90",
                    "wifeName": "Saranya",
                    "husbandName": "Manjunatha",
                    "village": "hosa_agrahara",
                    "subCenter": "hosa_agrahara",
                    "wifeAge": "27",
                    "caste": "c_others",
                    "religion": "Hindu",
                    "numberOfLivingMaleChildren": "1",
                    "numberOfLivingFemaleChildren": "1",
                    "wifeEducationLevel": "illiterate",
                    "husbandEducationLevel": "illiterate",
                    "fpDetails": {
                        "fpAcceptanceDate": "2014-02-25",
                        "refills": [
                            {
                                "date": "2014-10-23",
                                "quantity": "20"
                            },
                            {
                                "date": "2014-11-02",
                                "quantity": "10"
                            },
                            {
                                "date": "2014-11-12",
                                "quantity": "10"
                            },
                            {
                                "date": "2014-11-22",
                                "quantity": "10"
                            }
                        ],
                        "lmpDate": "",
                        "uptResult": ""
                    }
                },
                {
                    "ecNumber": "90",
                    "wifeName": "Saranya",
                    "husbandName": "Manjunatha",
                    "village": "hosa_agrahara",
                    "subCenter": "hosa_agrahara",
                    "wifeAge": "27",
                    "caste": "c_others",
                    "religion": "Hindu",
                    "numberOfLivingMaleChildren": "1",
                    "numberOfLivingFemaleChildren": "1",
                    "wifeEducationLevel": "illiterate",
                    "husbandEducationLevel": "illiterate",
                    "fpDetails": {
                        "fpAcceptanceDate": "2014-02-25",
                        "refills": [
                            {
                                "date": "2015-01-23",
                                "quantity": "20"
                            },
                            {
                                "date": "2015-02-23",
                                "quantity": "20"
                            },
                            {
                                "date": "2015-03-23",
                                "quantity": "20"
                            },
                            {
                                "date": "2014-04-23",
                                "quantity": "20"
                            },
                            {
                                "date": "2014-05-23",
                                "quantity": "20"
                            },
                            {
                                "date": "2014-06-23",
                                "quantity": "20"

                            },
                            {
                                "date": "2014-07-23",
                                "quantity": "20"

                            },
                            {
                                "date": "2014-08-23",
                                "quantity": "20"

                            },
                            {
                                "date": "2014-09-23",
                                "quantity": "20"

                            },
                            {
                                "date": "2014-10-23",
                                "quantity": "20"

                            },
                            {
                                "date": "2014-11-23",
                                "quantity": "20"

                            },
                            {
                                "date": "2014-12-22",
                                "quantity": "10"

                            }
                        ],
                        "lmpDate": "2014-05-12",
                        "uptResult": "+ve"
                    }
                }
            ],
            "maleSterilizationRegisterEntries": [
                {
                    "ecNumber": "90",
                    "wifeName": "Saranya",
                    "husbandName": "Manjunatha",
                    "village": "hosa_agrahara",
                    "subCenter": "hosa_agrahara",
                    "wifeAge": "27",
                    "husbandAge": "30",
                    "caste": "c_others",
                    "religion": "Hindu",
                    "numberOfLivingMaleChildren": "1",
                    "numberOfLivingFemaleChildren": "1",
                    "wifeEducationLevel": "illiterate",
                    "husbandEducationLevel": "illiterate",
                    "fpDetails": {
                        "typeOfSterilization": "nsv",
                        "sterilizationDate": "2014-05-01",
                        "followupVisitDates": [
                            "2014-05-06",
                            "2014-05-10"
                        ],
                        "remarks": "Follow up in 1 month"
                    }
                }
            ],
            "femaleSterilizationRegisterEntries": [
                {
                    "ecNumber": "90",
                    "wifeName": "Saranya",
                    "husbandName": "Manjunatha",
                    "village": "hosa_agrahara",
                    "subCenter": "hosa_agrahara",
                    "wifeAge": "27",
                    "husbandAge": "30",
                    "caste": "c_others",
                    "religion": "Hindu",
                    "numberOfLivingMaleChildren": "1",
                    "numberOfLivingFemaleChildren": "1",
                    "wifeEducationLevel": "illiterate",
                    "husbandEducationLevel": "illiterate",
                    "fpDetails": {
                        "typeOfSterilization": "minilap",
                        "sterilizationDate": "2014-06-02",
                        "followupVisitDates": [
                            "2014-06-06",
                            "2014-06-10",
                            "2014-07-10"
                        ],
                        "remarks": "Follow up in 1 month"
                    }
                }
            ],
            "reportingYear": 2014
        };

        var expectedPayload = {
            "iudRegisterEntries": [
                {
                    "ecNumber": "90",
                    "wifeName": "Saranya",
                    "husbandName": "Manjunatha",
                    "village": "hosa_agrahara",
                    "subCenter": "hosa_agrahara",
                    "wifeAge": "27",
                    "husbandAge": "38",
                    "caste": "c_others",
                    "religion": "Hindu",
                    "numberOfLivingMaleChildren": "1",
                    "numberOfLivingFemaleChildren": "1",
                    "wifeEducationLevel": "illiterate",
                    "husbandEducationLevel": "illiterate",
                    "fpDetails": {
                        "fpAcceptanceDate": "23-02-2014",
                        "iudPlace": "district hospital",
                        "remarks": "Follow up in 1 month",
                        "lmpDate": "12-05-2014",
                        "uptResult": "+ve"
                    },
                    "serialNumber": 1,
                    "addressDetails": "Saranya, W/O Manjunatha, C/O Hosa Agrahara",
                    "casteReligionDetails": "Others / Hindu"
                },
                {
                    "ecNumber": "92",
                    "wifeName": "Suganya",
                    "husbandName": "Raghu",
                    "village": "hosa_agrahara",
                    "subCenter": "hosa_agrahara",
                    "wifeAge": "27",
                    "husbandAge": "38",
                    "caste": "c_others",
                    "religion": "Hindu",
                    "numberOfLivingMaleChildren": "1",
                    "numberOfLivingFemaleChildren": "1",
                    "wifeEducationLevel": "illiterate",
                    "husbandEducationLevel": "illiterate",
                    "fpDetails": {
                        "fpAcceptanceDate": "25-02-2014",
                        "iudPlace": "phc",
                        "remarks": "Follow up in 1 month",
                        "lmpDate": "12-05-2014",
                        "uptResult": "+ve"
                    },
                    "serialNumber": 2,
                    "addressDetails": "Suganya, W/O Raghu, C/O Hosa Agrahara",
                    "casteReligionDetails": "Others / Hindu"
                }
            ],
            "condomRegisterEntries": [
                {
                    "ecNumber": "90",
                    "wifeName": "Saranya",
                    "husbandName": "Manjunatha",
                    "village": "hosa_agrahara",
                    "subCenter": "hosa_agrahara",
                    "wifeAge": "27",
                    "caste": "c_others",
                    "religion": "Hindu",
                    "numberOfLivingMaleChildren": "1",
                    "numberOfLivingFemaleChildren": "1",
                    "wifeEducationLevel": "illiterate",
                    "husbandEducationLevel": "illiterate",
                    "fpDetails": {
                        "fpAcceptanceDate": "25-02-2014",
                        "refills": [
                            {
                                "date": "2014-10-23",
                                "quantity": "20"

                            },
                            {
                                "date": "2014-11-22",
                                "quantity": "10"

                            }
                        ],
                        "reportingRefills": {
                            "Apr": "",
                            "May": "",
                            "Jun": "",
                            "Jul": "",
                            "Aug": "",
                            "Sep": "",
                            "Oct": "23 Oct (20)",
                            "Nov": "22 Nov (10)",
                            "Dec": "",
                            "Jan": "",
                            "Feb": "",
                            "Mar": ""
                        }
                    },
                    "serialNumber": 1,
                    "addressDetails": "Saranya, W/O Manjunatha, C/O Hosa Agrahara",
                    "casteReligionDetails": "Others / Hindu"                    }
            ],
            "ocpRegisterEntries": [
                {
                    "ecNumber": "90",
                    "wifeName": "Saranya",
                    "husbandName": "Manjunatha",
                    "village": "hosa_agrahara",
                    "subCenter": "hosa_agrahara",
                    "wifeAge": "27",
                    "caste": "c_others",
                    "religion": "Hindu",
                    "numberOfLivingMaleChildren": "1",
                    "numberOfLivingFemaleChildren": "1",
                    "wifeEducationLevel": "illiterate",
                    "husbandEducationLevel": "illiterate",
                    "fpDetails": {
                        "fpAcceptanceDate": "25-02-2014",
                        "refills": [
                            {
                                "date": "2014-10-23",
                                "quantity": "20"

                            },
                            {
                                "date": "2014-11-02",
                                "quantity": "10"

                            },
                            {
                                "date": "2014-11-12",
                                "quantity": "10"

                            },
                            {
                                "date": "2014-11-22",
                                "quantity": "10"

                            }
                        ],
                        "lmpDate": "",
                        "uptResult": "",
                        "reportingRefills": {
                            "Apr": "",
                            "May": "",
                            "Jun": "",
                            "Jul": "",
                            "Aug": "",
                            "Sep": "",
                            "Oct": "23 Oct (20)",
                            "Nov": "02 Nov (10)\n12 Nov (10)\n22 Nov (10)",
                            "Dec": "",
                            "Jan": "",
                            "Feb": "",
                            "Mar": ""
                        }
                    },
                    "serialNumber": 1,
                    "addressDetails": "Saranya, W/O Manjunatha, C/O Hosa Agrahara",
                    "casteReligionDetails": "Others / Hindu"
                },
                {
                    "ecNumber": "90",
                    "wifeName": "Saranya",
                    "husbandName": "Manjunatha",
                    "village": "hosa_agrahara",
                    "subCenter": "hosa_agrahara",
                    "wifeAge": "27",
                    "caste": "c_others",
                    "religion": "Hindu",
                    "numberOfLivingMaleChildren": "1",
                    "numberOfLivingFemaleChildren": "1",
                    "wifeEducationLevel": "illiterate",
                    "husbandEducationLevel": "illiterate",
                    "fpDetails": {
                        "fpAcceptanceDate": "25-02-2014",
                        "refills": [
                            {
                                "date": "2015-01-23",
                                "quantity": "20"

                            },
                            {
                                "date": "2015-02-23",
                                "quantity": "20"

                            },
                            {
                                "date": "2015-03-23",
                                "quantity": "20"
                            },
                            {
                                "date": "2014-04-23",
                                "quantity": "20"
                            },
                            {
                                "date": "2014-05-23",
                                "quantity": "20"
                            },
                            {
                                "date": "2014-06-23",
                                "quantity": "20"
                            },
                            {
                                "date": "2014-07-23",
                                "quantity": "20"
                            },
                            {
                                "date": "2014-08-23",
                                "quantity": "20"
                            },
                            {
                                "date": "2014-09-23",
                                "quantity": "20"
                            },
                            {
                                "date": "2014-10-23",
                                "quantity": "20"
                            },
                            {
                                "date": "2014-11-23",
                                "quantity": "20"
                            },
                            {
                                "date": "2014-12-22",
                                "quantity": "10"
                            }
                        ],
                        "lmpDate": "12-05-2014",
                        "uptResult": "+ve",
                        "reportingRefills": {
                            "Apr": "23 Apr (20)",
                            "May": "23 May (20)",
                            "Jun": "23 Jun (20)",
                            "Jul": "23 Jul (20)",
                            "Aug": "23 Aug (20)",
                            "Sep": "23 Sep (20)",
                            "Oct": "23 Oct (20)",
                            "Nov": "23 Nov (20)",
                            "Dec": "22 Dec (10)",
                            "Jan": "23 Jan (20)",
                            "Feb": "23 Feb (20)",
                            "Mar": "23 Mar (20)"
                        }
                    },
                    "serialNumber": 2,
                    "addressDetails": "Saranya, W/O Manjunatha, C/O Hosa Agrahara",
                    "casteReligionDetails": "Others / Hindu"
                }
            ],
            "maleSterilizationRegisterEntries": [
                {
                    "ecNumber": "90",
                    "wifeName": "Saranya",
                    "husbandName": "Manjunatha",
                    "village": "hosa_agrahara",
                    "subCenter": "hosa_agrahara",
                    "wifeAge": "27",
                    "husbandAge": "30",
                    "caste": "c_others",
                    "religion": "Hindu",
                    "numberOfLivingMaleChildren": "1",
                    "numberOfLivingFemaleChildren": "1",
                    "wifeEducationLevel": "illiterate",
                    "husbandEducationLevel": "illiterate",
                    "fpDetails": {
                        "typeOfSterilization": "nsv",
                        "sterilizationDate": "01-05-2014",
                        "followupVisitDates": [
                            "06-05-2014",
                            "10-05-2014"
                        ],
                        "remarks": "Follow up in 1 month"
                    },
                    "serialNumber": 1,
                    "addressDetails": "Saranya, W/O Manjunatha, C/O Hosa Agrahara",
                    "casteReligionDetails": "Others / Hindu"
                }
            ],
            "femaleSterilizationRegisterEntries": [
                {
                    "ecNumber": "90",
                    "wifeName": "Saranya",
                    "husbandName": "Manjunatha",
                    "village": "hosa_agrahara",
                    "subCenter": "hosa_agrahara",
                    "wifeAge": "27",
                    "husbandAge": "30",
                    "caste": "c_others",
                    "religion": "Hindu",
                    "numberOfLivingMaleChildren": "1",
                    "numberOfLivingFemaleChildren": "1",
                    "wifeEducationLevel": "illiterate",
                    "husbandEducationLevel": "illiterate",
                    "fpDetails": {
                        "typeOfSterilization": "minilap",
                        "sterilizationDate": "02-06-2014",
                        "followupVisitDates": [
                            "06-06-2014",
                            "10-06-2014",
                            "10-07-2014"
                        ],
                        "remarks": "Follow up in 1 month"
                    },
                    "serialNumber": 1,
                    "addressDetails": "Saranya, W/O Manjunatha, C/O Hosa Agrahara",
                    "casteReligionDetails": "Others / Hindu"
                }
            ],
            "reportingYear": 2014,
            "generatedDate": "24-02-2014",
            "startOfReportingYear": 2013,
            "endOfReportingYear": 2014,
            "anmDetails": {
                "location": {
                    "phc": "phc"
                },
                "name": "Demo 1"
            }
        };
        Timecop.install();
        Timecop.freeze(Date.parse('2014-02-24'));

        var expectedRegisterDownloadURL = '/register_download_url';

        httpBackend.expectGET('https://smartregistries.org/registers/fp?anm-id=demo1')
            .respond(200, expectedRegisters);
        httpBackend.expectPOST('https://smartregistries.org/json-to-xls/xls/8ab37044c46e432d8feade4d69e70e5c',
            expectedPayload).respond(201, expectedRegisterDownloadURL);

        var url = null;
        service.prepareRegister({identifier: 'demo1', name: 'Demo 1', location: { phc: "phc" }})
            .then(function (result) {
                url = result
            });

        httpBackend.flush();
        expect(url).toEqual('https://smartregistries.org/json-to-xls' + expectedRegisterDownloadURL);
        Timecop.returnToPresent();
        Timecop.uninstall();
    });
});
