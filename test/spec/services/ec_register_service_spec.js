'use strict';

describe('EC Register Service:', function () {

    var httpBackend, service, q, moment;

    beforeEach(module('drishtiSiteApp'));
    beforeEach(inject(function ($httpBackend, $q, $moment, ECRegisterService) {
        httpBackend = $httpBackend;
        q = $q;
        moment = $moment;
        service = ECRegisterService;
    }));

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
                    "wifeEducationLevel": "illiterate",
                    "husbandEducationLevel": "illiterate",
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
                    "registrationDate": "15-05-2013",
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
                    "wifeEducationLevel": "illiterate",
                    "husbandEducationLevel": "illiterate",
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
                    "currentFPMethodStartDate": "28-04-2009",
                    "isPregnant": "No",
                    "householdDetails": "77",
                    "educationLevel": "Illiterate / Illiterate",
                    "ageDetails": "27 / 38"
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
        httpBackend
            .expectGET('https://smartregistries.org/registers/ec?anm-id=demo1').respond(200, jsonResponse);
        httpBackend
            .expectPOST('https://smartregistries.org/json-to-xls/xls/e86e0e2211f54b128181cdec0b63cb11', expectedPayload)
            .respond(201, expectedRegisterDownloadURL);

        var url = null;
        service.prepareRegister({identifier: 'demo1', name: 'Demo 1', location: { phc: "phc" }})
            .then(function (result) {
                url = result
            });

        httpBackend.flush();
        expect(url).toEqual('https://smartregistries.org/json-to-xls' + expectedRegisterDownloadURL);
    });
    it('should display blank when household details of EC is empty', function () {
        var jsonResponse = {
            "ecRegisterEntries": [
                {
                    "registrationDate": "2013-05-15",
                    "ecNumber": "90",
                    "wifeName": "Sowmya",
                    "husbandName": "Manjunatha",
                    "householdAddress": null,
                    "householdNumber": null,
                    "headOfHousehold": null,
                    "village": "hosa_agrahara",
                    "subCenter": "hosa_agrahara",
                    "phc": "bherya",
                    "wifeAge": "27",
                    "husbandAge": "38",
                    "wifeEducationLevel": "illiterate",
                    "husbandEducationLevel": "illiterate",
                    "caste": "c_others",
                    "religion": "r_others",
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
                    "registrationDate": "15-05-2013",
                    "ecNumber": "90",
                    "wifeName": "Sowmya",
                    "husbandName": "Manjunatha",
                    "householdAddress": null,
                    "householdNumber": null,
                    "headOfHousehold": null,
                    "village": "Hosa Agrahara",
                    "subCenter": "hosa_agrahara",
                    "phc": "bherya",
                    "wifeAge": "27",
                    "husbandAge": "38",
                    "wifeEducationLevel": "illiterate",
                    "husbandEducationLevel": "illiterate",
                    "caste": "Others",
                    "religion": "Others",
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
                    "currentFPMethodStartDate": "28-04-2009",
                    "isPregnant": "No",
                    "householdDetails": "",
                    "educationLevel": "Illiterate / Illiterate",
                    "ageDetails": "27 / 38"
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
        httpBackend.expectGET('https://smartregistries.org/registers/ec?anm-id=demo1').respond(200, jsonResponse);
        httpBackend.expectPOST('https://smartregistries.org/json-to-xls/xls/e86e0e2211f54b128181cdec0b63cb11', expectedPayload).respond(201, expectedRegisterDownloadURL);

        var url = null;
        service.prepareRegister({identifier: 'demo1', name: 'Demo 1', location: { phc: "phc" }})
            .then(function (result) {
                url = result
            });

        httpBackend.flush();
        expect(url).toEqual('https://smartregistries.org/json-to-xls' + expectedRegisterDownloadURL);
    });
});
