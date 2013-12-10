'use strict';

describe('Controller: ANMDataSummaryCtrl', function () {

    var scope, httpBackend, createController;

    beforeEach(module('drishtiSiteApp'));
    beforeEach(inject(function ($rootScope, $controller, $httpBackend) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        createController = function () {
            var controller = $controller(
                'ANMDataSummaryCtrl', {
                    '$scope': scope,
                    DRISHTI_BASE_URL: 'http://drishti-server',
                    JSON_TO_XLS_BASE_URL: 'http://xls.ona.io',
                    NRHM_REPORT_TOKEN: 'token1'
                });
            return controller;
        };
    }));

    describe('Display list of ANMs', function () {
        it('should get list of ANMs from server and set it on scope', function () {
            var expectedANMs = [
                {"identifier": "c", "subCenter": "bherya - a"},
                {"identifier": "demo1", "subCenter": "bherya - b"},
                {"identifier": "admin", "subCenter": "klp 2"}
            ];
            httpBackend.expectGET('http://drishti-server/anms').respond(expectedANMs);

            createController();

            httpBackend.flush();
            expect(scope.anms).toEqual(expectedANMs);
        });
    });

    describe('NRHM report excel', function () {
        it('should be able to download current month NRHM report excel for an ANM', function () {
            var anm =
            {
                'identifier': 'demo1',
                'subCenter': 'bherya - b'
            };
            var expectedANMs = [
                {"identifier": "c", "subCenter": "bherya - a"},
                {"identifier": "demo1", "subCenter": "bherya - b"},
                {"identifier": "admin", "subCenter": "klp 2"}
            ];
            var expectedAggregatedReports = {
                'ind': {
                    "anc": "1",
                    "anc_12": "2"
                }
            };
            var expectedExcelDownloadURL = '/download_url';
            httpBackend.expectGET('http://drishti-server/anms').respond(expectedANMs);
            httpBackend.expectGET('http://drishti-server/aggregated-reports?anm-id=demo1&month=12&year=2013')
                .respond(200, expectedAggregatedReports);
            httpBackend.expectPOST('http://xls.ona.io/xls/token1', expectedAggregatedReports).respond(201, expectedExcelDownloadURL);

            createController();
            scope.excelReportsForANM(anm, '12', '2013');

            httpBackend.flush();
            expect(anm.excelReport).toEqual('http://xls.ona.io' + expectedExcelDownloadURL);
            expect(anm.downloadStatus).toEqual('ready');
        });

        it('should change downloadStatus back to start when excel is not returned from json-to-xls service', function () {
            var anm =
            {
                'identifier': 'demo1',
                'subCenter': 'bherya - b'
            };
            var expectedANMs = [
                {"identifier": "c", "subCenter": "bherya - a"},
                {"identifier": "demo1", "subCenter": "bherya - b"},
                {"identifier": "admin", "subCenter": "klp 2"}
            ];
            var expectedAggregatedReports = {
                'ind': {
                    "anc": "1",
                    "anc_12": "2"
                }
            };
            httpBackend.expectGET('http://drishti-server/anms').respond(expectedANMs);
            httpBackend.expectGET('http://drishti-server/aggregated-reports?anm-id=demo1&month=12&year=2013')
                .respond(200, expectedAggregatedReports);
            httpBackend.expectPOST('http://xls.ona.io/xls/token1', expectedAggregatedReports).respond(400, null);


            createController();
            scope.excelReportsForANM(anm, '12', '2013');

            httpBackend.flush();
            expect(anm.downloadStatus).toEqual('start');

        });

        it('should change downloadStatus back to start when aggregated reports is not being returned from server', function () {
            var anm =
            {
                'identifier': 'demo1',
                'subCenter': 'bherya - b'
            };
            var expectedANMs = [
                {"identifier": "c", "subCenter": "bherya - a"},
                {"identifier": "demo1", "subCenter": "bherya - b"},
                {"identifier": "admin", "subCenter": "klp 2"}
            ];
            httpBackend.expectGET('http://drishti-server/anms').respond(expectedANMs);
            httpBackend.expectGET('http://drishti-server/aggregated-reports?anm-id=demo1&month=12&year=2013')
                .respond(400, null);


            createController();
            scope.excelReportsForANM(anm, '12', '2013');

            httpBackend.flush();
            expect(anm.downloadStatus).toEqual('start');

        });
    });

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

});
