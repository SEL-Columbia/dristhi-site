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
            "fpRegisterEntries": {
                "iud": [
                    {
                        "registrationDate": "2014-05-15",
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
                        "lmpDate": "2014-05-12",
                        "uptResult": "+ve",
                        "wifeEducationLevel": "illiterate",
                        "husbandEducationLevel": "illiterate",
                        "fpDetails": {
                            "iudDate": "2014-02-23",
                            "iudPlace": "district hospital",
                            "iudPerson": "LHV Latha",
                            "remarks": "Follow up in 1 month"
                        }
                    },
                    {
                        "registrationDate": "2014-05-25",
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
                        "lmpDate": "2014-05-12",
                        "uptResult": "+ve",
                        "wifeEducationLevel": "illiterate",
                        "husbandEducationLevel": "illiterate",
                        "fpDetails": {
                            "iudDate": "2014-02-25",
                            "iudPlace": "phc",
                            "iudPerson": "LHV Latha",
                            "remarks": "Follow up in 1 month"
                        }

                    }
                ],
                "condom": [
                    {
                        "registrationDate": "2014-05-15",
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
                            "refills": [
                                {
                                    "date": "2014-10-23",
                                    "pieces": "20"

                                },
                                {
                                    "date": "2014-11-22",
                                    "pieces": "10"

                                }
                            ]
                        }
                    }
                ],
                "ocp": [
                    {
                        "registrationDate": "2014-05-15",
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
                            "refills": [
                                {
                                    "date": "2014-10-23",
                                    "pieces": "20"

                                },
                                {
                                    "date": "2014-11-02",
                                    "pieces": "10"

                                },
                                {
                                    "date": "2014-11-12",
                                    "pieces": "10"

                                },
                                {
                                    "date": "2014-11-22",
                                    "pieces": "10"

                                }
                            ]
                        }
                    },
                    {
                        "registrationDate": "2014-05-15",
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
                        "lmpDate": "2014-05-12",
                        "uptResult": "+ve",
                        "wifeEducationLevel": "illiterate",
                        "husbandEducationLevel": "illiterate",
                        "fpDetails": {
                            "refills": [
                                {
                                    "date": "2015-01-23",
                                    "pieces": "20"

                                },
                                {
                                    "date": "2014-12-22",
                                    "pieces": "10"

                                }
                            ]
                        }
                    }
                ],
                "maleSterilization": [
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
                            "doctorName": "krishna murthy",
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
                "femaleSterilization": [
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
                            "doctorName": "bhyrappa",
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
                ]
            },
            "reportingYear": 2014
        };

        var expectedPayload = {
            "fpRegisterEntries": {
                "iud": [
                    {
                        "registrationDate": "15-05-2014",
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
                        "lmpDate": "2014-05-12",
                        "uptResult": "+ve",
                        "wifeEducationLevel": "illiterate",
                        "husbandEducationLevel": "illiterate",
                        "fpDetails": {
                            "iudDate": "2014-02-23",
                            "iudPlace": "district hospital",
                            "iudPerson": "LHV Latha",
                            "remarks": "Follow up in 1 month"
                        },
                        "serialNumber": 1,
                        "addressDetails": "Saranya, W/O Manjunatha, C/O Hosa Agrahara",
                        "casteReligionDetails": "Others / Hindu"
                    },
                    {
                        "registrationDate": "25-05-2014",
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
                        "lmpDate": "2014-05-12",
                        "uptResult": "+ve",
                        "wifeEducationLevel": "illiterate",
                        "husbandEducationLevel": "illiterate",
                        "fpDetails": {
                            "iudDate": "2014-02-25",
                            "iudPlace": "phc",
                            "iudPerson": "LHV Latha",
                            "remarks": "Follow up in 1 month"
                        },
                        "serialNumber": 2,
                        "addressDetails": "Suganya, W/O Raghu, C/O Hosa Agrahara",
                        "casteReligionDetails": "Others / Hindu"
                    }
                ],
                "condom": [
                    {
                        "registrationDate": "15-05-2014",
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
                            "refills": [
                                {
                                    "date": "2014-10-23",
                                    "pieces": "20"

                                },
                                {
                                    "date": "2014-11-22",
                                    "pieces": "10"

                                }
                            ],
                            "refill": {
                                "apr": "",
                                "may": "",
                                "jun": "",
                                "jul": "",
                                "aug": "",
                                "sep": "",
                                "oct": "23 Oct (20)",
                                "nov": "22 Nov (10)",
                                "dec": "",
                                "jan": "",
                                "feb": "",
                                "mar": ""
                            }
                        },
                        "serialNumber": 1,
                        "addressDetails": "Saranya, W/O Manjunatha, C/O Hosa Agrahara",
                        "casteReligionDetails": "Others / Hindu"                    }
                ],
                "ocp": [
                    {
                        "registrationDate": "15-05-2014",
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
                            "refills": [
                                {
                                    "date": "2014-10-23",
                                    "pieces": "20"

                                },
                                {
                                    "date": "2014-11-02",
                                    "pieces": "10"

                                },
                                {
                                    "date": "2014-11-12",
                                    "pieces": "10"

                                },
                                {
                                    "date": "2014-11-22",
                                    "pieces": "10"

                                }
                            ],
                            "refill": {
                                "apr": "",
                                "may": "",
                                "jun": "",
                                "jul": "",
                                "aug": "",
                                "sep": "",
                                "oct": "23 Oct (20)",
                                "nov": "02 Nov (10)\n12 Nov (10)\n22 Nov (10)",
                                "dec": "",
                                "jan": "",
                                "feb": "",
                                "mar": ""
                            }
                        },
                        "serialNumber": 1,
                        "addressDetails": "Saranya, W/O Manjunatha, C/O Hosa Agrahara",
                        "casteReligionDetails": "Others / Hindu"
                    },
                    {
                        "registrationDate": "15-05-2014",
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
                        "lmpDate": "2014-05-12",
                        "uptResult": "+ve",
                        "wifeEducationLevel": "illiterate",
                        "husbandEducationLevel": "illiterate",
                        "fpDetails": {
                            "refills": [
                                {
                                    "date": "2015-01-23",
                                    "pieces": "20"

                                },
                                {
                                    "date": "2014-12-22",
                                    "pieces": "10"

                                }
                            ],
                            "refill": {
                                "apr": "",
                                "may": "",
                                "jun": "",
                                "jul": "",
                                "aug": "",
                                "sep": "",
                                "oct": "",
                                "nov": "",
                                "dec": "22 Dec (10)",
                                "jan": "23 Jan (20)",
                                "feb": "",
                                "mar": ""
                            }
                        },
                        "serialNumber": 2,
                        "addressDetails": "Saranya, W/O Manjunatha, C/O Hosa Agrahara",
                        "casteReligionDetails": "Others / Hindu"
                    }
                ],
                "maleSterilization": [
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
                            "doctorName": "krishna murthy",
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
                "femaleSterilization": [
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
                            "doctorName": "bhyrappa",
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
                ]
            },
            "reportingYear": 2014,
            "generatedDate": "04-12-2014",
            "anmDetails": {
                "location": {
                    "phc": "phc"
                },
                "name": "Demo 1"
            },
            "endOfReportingYear": 2015
        };
        Timecop.install();
        Timecop.freeze(Date.parse('2014-12-04'));

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
    })
    ;
})
;
