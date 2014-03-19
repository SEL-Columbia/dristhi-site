'use strict';

describe('Child Printable Register: ', function () {

    var httpBackend, service, q, moment;

    beforeEach(module('drishtiSiteApp'));
    beforeEach(inject(function ($httpBackend, $q, $moment, RegisterService) {
        httpBackend = $httpBackend;
        q = $q;
        moment = $moment;
        service = RegisterService;
    }));

    it('should be able to download Child register for an ANM', function () {

        var childRegisterResponse = {
            "childRegisterEntries": [
                {
                    "thayiCardNumber": "8188514",
                    "wifeName": "Kamala",
                    "husbandName": "Manju Nayaka",
                    "village": "harambanahalli_koppalu",
                    "subCenter": "hosa_agrahara",
                    "wifeDOB": [
                        1988,
                        5,
                        15
                    ],
                    "dob": [2013, 8, 10],
                    "immunizations": {
                        "bcg": "2013-09-10",
                        "opv_0": "2013-09-10",
                        "hepb_0": "2013-09-10",
                        "dptbooster_1": "2013-09-10",
                        "pentavalent_1": "2013-09-10",
                        "opv_1": "2013-10-10",
                        "dptbooster_2": "2013-10-10",
                        "pentavalent_2": "2013-10-10",
                        "opv_2": "2013-11-10",
                        "pentavalent_3": "2013-11-10",
                        "opv_3": "2013-12-10",
                        "measles": "2013-11-10",
                        "vitamin_a1": "2013-11-10",
                        "je": "2013-11-10",
                        "measlesbooster": "2013-11-10",
                        "mmr": "2013-11-10",
                        "dptbooster": "2013-09-10",
                        "opvbooster": "2013-11-10",
                        "vitamin_a2": "2013-11-10",
                        "je_2": "2013-11-10"
                    }
                }
            ],
            "anmDetails": {
                "location": {
                    "phc": "phc"
                },
                "name": "Demo 1"
            },
            "generatedDate": moment().format('YYYY-MM-DD')
        };

        var expectedPostBodyPayload = {
            "childRegisterEntries": [
                {
                    "thayiCardNumber": "8188514",
                    "wifeName": "Kamala",
                    "husbandName": "Manju Nayaka",
                    "village": "harambanahalli_koppalu",
                    "subCenter": "hosa_agrahara",
                    "wifeDOB": [
                        1988,
                        5,
                        15
                    ],
                    "dob": "10-09-2013",
                    "wifeAge": 25,
                    "immunizations": {
                        "bcg": "10-09-2013",
                        "opv_0": "10-09-2013",
                        "hepb_0": "10-09-2013",
                        "dptbooster_1": "10-09-2013",
                        "pentavalent_1": "10-09-2013",
                        "opv_1": "10-10-2013",
                        "dptbooster_2": "10-10-2013",
                        "pentavalent_2": "10-10-2013",
                        "opv_2": "10-11-2013",
                        "pentavalent_3": "10-11-2013",
                        "opv_3": "10-12-2013",
                        "measles": "10-11-2013",
                        "vitamin_a1": "10-11-2013",
                        "je": "10-11-2013",
                        "measlesbooster": "10-11-2013",
                        "mmr": "10-11-2013",
                        "dptbooster": "10-09-2013",
                        "opvbooster": "10-11-2013",
                        "vitamin_a2": "10-11-2013",
                        "je_2": "10-11-2013"
                    },
                    "addressDetails" : "Kamala (25), W/O Manju Nayaka"
                }
            ],
            "anmDetails": {
                "location": {
                    "phc": "phc"
                },
                "name": "Demo 1"
            },
            "generatedDate": moment().format('DD-MM-YYYY')
        };

        var expectedRegisterDownloadURL = '/register_download_url';

        httpBackend.expectGET('https://smartregistries.org/registers/child?anm-id=demo1')
            .respond(200, childRegisterResponse);
        httpBackend.expectPOST('https://smartregistries.org/json-to-xls/xls/e86e0e2211f54b128181cdec0b63cb12',
            expectedPostBodyPayload).respond(201, expectedRegisterDownloadURL);

        var url = null;
        service.prepareRegisterForChild({identifier: 'demo1', name: 'Demo 1', location: { phc: "phc" }})
            .then(function (result) {
                url = result
            });

        httpBackend.flush();
        expect(url).toEqual('https://smartregistries.org/json-to-xls' + expectedRegisterDownloadURL);
    });
});
