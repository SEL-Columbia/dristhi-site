'use strict';

describe('PNC Register Service:', function () {

    var httpBackend, service, q, moment;

    beforeEach(module('drishtiSiteApp'));
    beforeEach(inject(function ($httpBackend, $q, $moment, PNCRegisterService) {
        httpBackend = $httpBackend;
        q = $q;
        moment = $moment;
        service = PNCRegisterService;
    }));

    it('should be able to download PNC register for an ANM', function () {
        var expectedRegisters = {
            "pncRegisterEntries": [
                {
                    "registrationDate": "2013-09-10",
                    "thayiCardNumber": "8188514",
                    "wifeName": "Kamala",
                    "husbandName": "Manju Nayaka",
                    "wifeDOB": [1988, 5, 15],
                    "wifeAge": 25,
                    "address": null,
                    "dateOfDelivery": "2013-01-01",
                    "placeOfDelivery": "phc",
                    "dischargeDate": "2013-01-01",
                    "childDetails": [
                        {
                            "sex": "male",
                            "birthWeight": 2,
                            "breastFeedingInOneHour": "yes"
                        },
                        {
                            "sex": "female",
                            "birthWeight": 2,
                            "breastFeedingInOneHour": "yes"
                        }
                    ],
                    "pncVisitDetails": [
                        {
                            "pncVisitDate": "2013-01-01",
                            "complications": "difficulty_urine"
                        },
                        {
                            "pncVisitDate": "2013-02-01",
                            "complications": "difficulty_breathing"
                        }
                    ],
                    "fpMethodName": "condom",
                    "fpMethodDate": "2013-01-01"
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
            "pncRegisterEntries": [
                {
                    "registrationDate": "10-09-2013",
                    "thayiCardNumber": "8188514",
                    "wifeName": "Kamala",
                    "husbandName": "Manju Nayaka",
                    "wifeDOB": [1988, 5, 15],
                    "wifeAge": 25,
                    "address": null,
                    "dateOfDelivery": "2013-01-01",
                    "placeOfDelivery": "phc",
                    "dischargeDate": "2013-01-01",
                    "childDetails": [
                        {
                            "sex": "male",
                            "birthWeight": 2,
                            "breastFeedingInOneHour": "yes"
                        },
                        {
                            "sex": "female",
                            "birthWeight": 2,
                            "breastFeedingInOneHour": "yes"
                        }
                    ],
                    "pncVisitDetails": [
                        {
                            "pncVisitDate": "2013-01-01",
                            "complications": "difficulty_urine"
                        },
                        {
                            "pncVisitDate": "2013-02-01",
                            "complications": "difficulty_breathing"
                        }
                    ],
                    "fpMethodName": "condom",
                    "fpMethodDate": "2013-01-01",
                    "addressDetails": "Kamala, W/O Manju Nayaka",
                    "pncVisit1Details": "2013-01-01",
                    "pncVisit2Details": "2013-02-01",
                    "complications": "difficulty_breathing",
                    "fpMethodDetails": "condom 2013-01-01"

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
        httpBackend.expectGET('https://smartregistries.org/registers/pnc?anm-id=demo1')
            .respond(200, expectedRegisters);
        httpBackend.expectPOST('https://smartregistries.org/json-to-xls/xls/37375c2b940347948c7cc44034e155cc', expectedPostBodyPayload).respond(201, expectedRegisterDownloadURL);

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