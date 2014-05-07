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
        var pncRegisterEntriesResponse = {
            "pncRegisterEntries": [
                {
                    "registrationDate": "2013-09-10",
                    "thayiCardNumber": "8188514",
                    "wifeName": "Kamala",
                    "husbandName": "Manju Nayaka",
                    "wifeDOB": [1988, 5, 15],
                    "wifeAge": 25,
                    "address": null,
                    "dateOfDelivery": null,
                    "placeOfDelivery": "phc",
                    "typeOfDelivery": "normal",
                    "dischargeDate": "2013-01-01",
                    "childrenDetails": [
                        {
                            "id": "234",
                            "gender": "female",
                            "weight": 2,
                            "breastFeedingInOneHour": "yes"
                        },
                        {
                            "id": "123",
                            "gender": "male",
                            "weight": 2,
                            "breastFeedingInOneHour": "yes"
                        }
                    ],
                    "pncVisits": [
                        {
                            "date": "2013-01-01",
                            "person": "asha",
                            "place": "home",
                            "difficulties": "difficulty_urine",
                            "abdominalProblems": "abdominal_pain",
                            "vaginalProblems": "infected_perineum_suture",
                            "urinalProblems": "difficult_passing_urine",
                            "breastProblems": "breast_hardness",
                            "childrenDetails": [
                                {
                                    "id": "123",
                                    "difficulties": "diarrhea",
                                    "activityProblems": "convulsions",
                                    "breathingProblems": "breathing_too_fast",
                                    "skinProblems": "skin_blisters"
                                },
                                {
                                    "id": "234",
                                    "difficulties": "vomiting",
                                    "activityProblems": "convulsions",
                                    "breathingProblems": "breathing_too_fast",
                                    "skinProblems": "skin_blisters"
                                }

                            ]
                        },
                        {
                            "date": "2013-02-01",
                            "person": "asha",
                            "place": "phc",
                            "difficulties": "difficulty_urine",
                            "abdominalProblems": "abdominal_pain",
                            "vaginalProblems": "infected_perineum_suture heavy_bleeding",
                            "urinalProblems": "",
                            "breastProblems": "nipple_hardness",
                            "childrenDetails": [
                                {
                                    "id": "234",
                                    "difficulties": "vomiting",
                                    "activityProblems": "convulsions",
                                    "breathingProblems": "breathing_too_fast breathing_too_slow",
                                    "skinProblems": "skin_blisters"
                                },
                                {
                                    "id": "123",
                                    "difficulties": "",
                                    "activityProblems": "convulsions",
                                    "breathingProblems": "breathing_too_fast",
                                    "skinProblems": "skin_blisters"
                                }
                            ]
                        }
                    ],
                    "fpMethodName": "condom",
                    "fpMethodDate": "2013-01-01",
                    "deliveryComplications": "hemorrage "
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
                    "dateOfDelivery": '',
                    "placeOfDelivery": "PHC",
                    "typeOfDelivery": "normal",
                    "dischargeDate": "01-01-2013",
                    "childrenDetails": [
                        {
                            "id": "123",
                            "gender": "male",
                            "weight": 2,
                            "breastFeedingInOneHour": "yes"
                        },
                        {
                            "id": "234",
                            "gender": "female",
                            "weight": 2,
                            "breastFeedingInOneHour": "yes"
                        }
                    ],
                    "pncVisits": [
                        {
                            "date": "2013-01-01",
                            "person": "asha",
                            "place": "home",
                            "difficulties": "difficulty_urine",
                            "abdominalProblems": "abdominal_pain",
                            "vaginalProblems": "infected_perineum_suture",
                            "urinalProblems": "difficult_passing_urine",
                            "breastProblems": "breast_hardness",
                            "childrenDetails": [
                                {
                                    "id": "123",
                                    "difficulties": "diarrhea",
                                    "activityProblems": "convulsions",
                                    "breathingProblems": "breathing_too_fast",
                                    "skinProblems": "skin_blisters"
                                },
                                {
                                    "id": "234",
                                    "difficulties": "vomiting",
                                    "activityProblems": "convulsions",
                                    "breathingProblems": "breathing_too_fast",
                                    "skinProblems": "skin_blisters"
                                }

                            ]
                        },
                        {
                            "date": "2013-02-01",
                            "person": "asha",
                            "place": "phc",
                            "difficulties": "difficulty_urine",
                            "abdominalProblems": "abdominal_pain",
                            "vaginalProblems": "infected_perineum_suture, heavy_bleeding",
                            "urinalProblems": "",
                            "breastProblems": "nipple_hardness",
                            "childrenDetails": [
                                {
                                    "id": "234",
                                    "difficulties": "vomiting",
                                    "activityProblems": "convulsions",
                                    "breathingProblems": "breathing_too_fast, breathing_too_slow",
                                    "skinProblems": "skin_blisters"
                                },
                                {
                                    "id": "123",
                                    "difficulties": "",
                                    "activityProblems": "convulsions",
                                    "breathingProblems": "breathing_too_fast",
                                    "skinProblems": "skin_blisters"
                                }
                            ]
                        }
                    ],
                    "fpMethodName": "condom",
                    "fpMethodDate": "01-01-2013",
                    "deliveryComplications": "Hemorrage",
                    "serialNumber": 1,
                    "addressDetails": "Kamala, W/O Manju Nayaka",
                    "pncVisit1Details": "01-01-2013 Home, Asha",
                    "pncVisit2Details": "01-02-2013 PHC, Asha",
                    "motherComplications": "Difficulty urine, abdominal pain, infected perineum suture, heavy bleeding, nipple hardness",
                    "childrenComplications": [
                        {
                            "id": "123",
                            "complications": "Convulsions, breathing too fast, skin blisters"
                        },
                        {
                            "id": "234",
                            "complications": "Vomiting, convulsions, breathing too fast, breathing too slow, skin blisters"
                        }
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
        httpBackend.expectGET('https://smartregistries.org/registers/pnc?anm-id=demo1')
            .respond(200, pncRegisterEntriesResponse);
        httpBackend.expectPOST('https://smartregistries.org/json-to-xls/xls/73b356bbd75243908b3533123e453820', expectedPostBodyPayload).respond(201, expectedRegisterDownloadURL);

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