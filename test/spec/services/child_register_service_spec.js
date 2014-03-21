'use strict';

describe('Child Register Service:', function () {

    var httpBackend, service, q, moment;

    beforeEach(module('drishtiSiteApp'));
    beforeEach(inject(function ($httpBackend, $q, $moment, ChildRegisterService) {
        httpBackend = $httpBackend;
        q = $q;
        moment = $moment;
        service = ChildRegisterService;
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
                    "wifeDOB": [1988, 5, 15],
                    "dob": [2013, 8, 10],
                    "immunizations": {
                        "bcg": "2013-09-11",
                        "opv_0": "2013-09-12",
                        "hepb_0": "2013-09-13",
                        "dptbooster_1": "2013-09-14",
                        "pentavalent_1": "2013-09-15",
                        "opv_1": "2013-10-16",
                        "dptbooster_2": "2013-10-17",
                        "pentavalent_2": "2013-10-18",
                        "opv_2": "2013-11-19",
                        "pentavalent_3": "2013-11-20",
                        "opv_3": "2013-12-21",
                        "measles": "2013-11-22",
                        "vitamin_a1": "2013-11-23",
                        "je": "2013-11-24",
                        "measlesbooster": "2013-11-25",
                        "mmr": "2013-11-26",
                        "dptbooster": "2013-09-27",
                        "opvbooster": "2013-11-28",
                        "vitamin_a2": "2013-11-29",
                        "je_2": "2013-11-30"
                    }
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
            "childRegisterEntries": [
                {
                    "thayiCardNumber": "8188514",
                    "wifeName": "Kamala",
                    "husbandName": "Manju Nayaka",
                    "village": "harambanahalli_koppalu",
                    "subCenter": "hosa_agrahara",
                    "wifeDOB": [1988, 5, 15],
                    "dob": "10-09-2013",
                    "immunizations": {
                        "bcg": "11-09-2013",
                        "opv_0": "12-09-2013",
                        "hepb_0": "13-09-2013",
                        "dptbooster_1": "14-09-2013",
                        "pentavalent_1": "15-09-2013",
                        "opv_1": "16-10-2013",
                        "dptbooster_2": "17-10-2013",
                        "pentavalent_2": "18-10-2013",
                        "opv_2": "19-11-2013",
                        "pentavalent_3": "20-11-2013",
                        "opv_3": "21-12-2013",
                        "measles": "22-11-2013",
                        "vitamin_a1": "23-11-2013",
                        "je": "24-11-2013",
                        "measlesbooster": "25-11-2013",
                        "mmr": "26-11-2013",
                        "dptbooster": "27-09-2013",
                        "opvbooster": "28-11-2013",
                        "vitamin_a2": "29-11-2013",
                        "je_2": "30-11-2013",
                        "dptPentavalent1": "/15-09-2013",
                        "dptPentavalent2": "/18-10-2013",
                        "dptPentavalent3": "/20-11-2013",
                        "measlesMmr": "22-11-2013/26-11-2013"
                    },
                    "addressDetails": "Kamala (25), W/O Manju Nayaka, C/O Harambanahalli Koppalu"
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
        httpBackend.expectPOST('https://smartregistries.org/json-to-xls/xls/507ac495c3c6483e8eb449a5789d506b',
            expectedPostBodyPayload).respond(201, expectedRegisterDownloadURL);

        var url = null;
        service.prepareRegister({identifier: 'demo1', name: 'Demo 1', location: { phc: "phc" }})
            .then(function (result) {
                url = result
            });

        httpBackend.flush();
        expect(url).toEqual('https://smartregistries.org/json-to-xls' + expectedRegisterDownloadURL);
    });
});
