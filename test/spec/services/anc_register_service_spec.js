'use strict';

describe('ANC Register Service:', function () {

    var httpBackend, service, q, moment;

    beforeEach(module('drishtiSiteApp'));
    beforeEach(inject(function ($httpBackend, $q, $moment, ANCRegisterService) {
        httpBackend = $httpBackend;
        q = $q;
        moment = $moment;
        service = ANCRegisterService;
    }));

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
                    "wifeDOB": [1988, 5, 15],
                    "wifeAge": 25,
                    "phoneNumber": null,
                    "wifeEducationLevel": null,
                    "husbandEducationLevel": null,
                    "caste": "st",
                    "religion": "r_others",
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
                    "bloodGroup": "o_negative",
                    "isHRP": "no",
                    "ancVisits": [
                        {
                            "ancVisitDate": "2014-06-23",
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
                            "ancVisitDate": "2014-05-23",
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
                            "ttDose": "tt2",
                            "ttDate": "2014-04-23"
                        },
                        {
                            "ttDose": "tt1",
                            "ttDate": "2014-03-23"
                        },
                        {
                            "ttDose": "ttbooster",
                            "ttDate": "2014-05-23"
                        }
                    ],
                    "ifaTablets": [
                        {
                            "ifaTabletsDate": "2013-08-27",
                            "numberOfIFATabletsGiven": "60"
                        },
                        {
                            "ifaTabletsDate": "2013-09-24",
                            "numberOfIFATabletsGiven": "60"
                        }
                    ],
                    "hbTests": [
                        {
                            "hbTestDate": "2014-05-23",
                            "hbLevel": "10.9"
                        }
                    ],
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
            }
        };

        var expectedPostBodyPayload = {
            "ancRegisterEntries": [
                {
                    "ancNumber": "5",
                    "registrationDate": "10-09-2013",
                    "ecNumber": "71",
                    "thayiCardNumber": "8188514",
                    "aadharCardNumber": null,
                    "wifeName": "Kamala",
                    "husbandName": "Manju Nayaka",
                    "address": null,
                    "wifeDOB": [1988, 5, 15],
                    "wifeAge": 25,
                    "phoneNumber": null,
                    "wifeEducationLevel": "",
                    "husbandEducationLevel": "",
                    "caste": "st",
                    "religion": "r_others",
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
                    "bloodGroup": "O-",
                    "isHRP": "no",
                    "ancVisits": [
                        {
                            "ancVisitDate": "23-05-2014",
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
                            "ancVisitDate": "23-06-2014",
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
                            "rtiSTIValue": "",
                            "bp": ""
                        }
                    ],
                    "ttDoses": [
                        {
                            "ttDose": "TT1",
                            "ttDate": "23-03-2014"
                        },
                        {
                            "ttDose": "TT2",
                            "ttDate": "23-04-2014"
                        },
                        {
                            "ttDose": "TT Booster",
                            "ttDate": "23-05-2014"
                        }
                    ],
                    "ifaTablets": [
                        {
                            "ifaTabletsDate": "27-08-2013",
                            "numberOfIFATabletsGiven": "60"
                        },
                        {
                            "ifaTabletsDate": "24-09-2013",
                            "numberOfIFATabletsGiven": "60"
                        },
                        {}
                    ],
                    "hbTests": [
                        {
                            "hbTestDate": "23-05-2014",
                            "hbLevel": "10.9"
                        },
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
                    "casteReligionDetails": "ST/Others",
                    "lmpEDDDetails": "06-08-2013 13-05-2014",
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
            "generatedDate": "04-02-2014"
        };
        Timecop.install();
        Timecop.freeze(Date.parse('2014-02-04'));

        var expectedRegisterDownloadURL = '/register_download_url';
        httpBackend.expectGET('https://smartregistries.org/registers/anc?anm-id=demo1')
            .respond(200, expectedRegisters);
        httpBackend.expectPOST('https://smartregistries.org/json-to-xls/xls/dd3ac9bd3d7f469fbc7d0c7d73a442e6', expectedPostBodyPayload).respond(201, expectedRegisterDownloadURL);

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
