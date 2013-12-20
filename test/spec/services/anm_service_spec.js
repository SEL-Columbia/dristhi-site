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

    describe('NRHM report excel', function () {
        it('should be able to download current month NRHM report excel for an ANM', function () {
            var expectedAggregatedReports = {
                'ind': {
                    "anc": "1",
                    "anc_12": "2"
                }
            };
            var expectedExcelDownloadURL = '/download_url';
            httpBackend.expectGET('https://smartregistries.org/drishti-reporting/report/aggregated-reports?anm-id=demo1&month=12&year=2013')
                .respond(200, expectedAggregatedReports);
            httpBackend.expectPOST('http://xls.ona.io/xls/e0739ade6dbb47a49c9115a93b3f433a', expectedAggregatedReports).respond(201, expectedExcelDownloadURL);

            var url = null;
            service.prepareReportFor('demo1', '12', '2013')
                .then(function (result) {
                    url = result
                });

            httpBackend.flush();
            expect(url).toEqual('http://xls.ona.io' + expectedExcelDownloadURL);
        });
    });

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });
});
