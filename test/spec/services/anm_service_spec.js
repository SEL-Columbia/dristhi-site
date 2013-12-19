'use strict';

describe('ANM Service', function () {

    var httpBackend, service;

    beforeEach(module('drishtiSiteApp'));
    beforeEach(inject(function ($httpBackend, ANMService) {
        httpBackend = $httpBackend;
        service = ANMService;
    }));

    describe('Display list of ANMs', function () {
        it('should get list of ANMs from dristhi report service', function () {
            var expectedANMs = [
                {"identifier": "c", "subCenter": "bherya - a"},
                {"identifier": "demo1", "subCenter": "bherya - b"},
                {"identifier": "admin", "subCenter": "klp 2"}
            ];
            httpBackend.expectGET('https://smartregistries.org/drishti-reporting/anms').respond(expectedANMs);

            service.all().then(function (result) {
                expect(result.data).toEqual(expectedANMs);
            });

            httpBackend.flush();
        });
    });

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });
});
