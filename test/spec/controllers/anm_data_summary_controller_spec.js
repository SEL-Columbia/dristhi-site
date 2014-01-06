'use strict';

describe('ANM Data Summary Controller', function () {

    var scope, httpBackend, createController,
        anmService, allANMsDeferredResponse, prepareReportForDeferredResponse, q;

    beforeEach(module('drishtiSiteApp'));
    beforeEach(inject(function ($rootScope, $httpBackend, $q, $controller) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        q = $q;
        anmService = {
            all: function () {
                allANMsDeferredResponse = q.defer();
                return allANMsDeferredResponse.promise;
            },
            prepareReportFor: function () {
                prepareReportForDeferredResponse = q.defer();
                return prepareReportForDeferredResponse.promise;
            }
        };
        createController = function () {
            return $controller(
                'ANMDataSummaryCtrl', {
                    '$scope': scope,
                    DRISHTI_REPORT_BASE_URL: 'http://drishti-reporting',
                    JSON_TO_XLS_BASE_URL: 'http://xls.ona.io',
                    NRHM_REPORT_TOKEN: 'token1',
                    ANMService: anmService
                });
        };
    }));

    describe('Display list of ANMs by getting data from ANMService', function () {
        it('should get list of ANMs from server and set it on scope', function () {
            spyOn(anmService, 'all').andCallThrough();
            var expectedANMs = [
                new ANM("c", "c name", "bherya - a"),
                new ANM("demo1", "demo1 name", "bherya - b"),
                new ANM("admin", "admin name", "klp 2")
            ];

            createController();

            allANMsDeferredResponse.resolve({data: expectedANMs});
            scope.$apply();
            expect(scope.anms).toEqual(expectedANMs);
        });
    });

    describe('NRHM report excel', function () {
        it('should be able to download current month NRHM report excel for an ANM using ANMService', function () {
            spyOn(anmService, 'prepareReportFor').andCallThrough();
            var anm = new ANM('demo1', 'demo1 name', 'bherya - b');

            createController();
            scope.excelReportsForANM(anm, '12', '2013');

            prepareReportForDeferredResponse.resolve('/download_url');
            scope.$apply();
            expect(anm.excelReport).toEqual('/download_url');
            expect(anm.nrhmReportDownloadStatus).toEqual('ready');
        });

        it('should remove nrhmReportDownloadStatus when excel download url is not returned from ANM service', function () {
            spyOn(anmService, 'prepareReportFor').andCallThrough();
            var anm = new ANM('demo1', 'demo1 name', 'bherya - b');
            anm.nrhmReportDownloadStatus = 'preparing';

            createController();
            scope.excelReportsForANM(anm, '12', '2013');

            prepareReportForDeferredResponse.reject();
            scope.$apply();
            expect(anm.nrhmReportDownloadStatus).toBeUndefined();

        });
    });

    describe("Current report month and year", function () {
        it('should compute the current report month and year', function () {
            Timecop.install();

            createController();
            Timecop.freeze(Date.parse('2012-12-26'));
            expect(scope.currentReportMonth()).toEqual(1);
            expect(scope.currentReportYear()).toEqual(2013);
            Timecop.freeze(Date.parse('2012-12-30'));
            expect(scope.currentReportMonth()).toEqual(1);
            expect(scope.currentReportYear()).toEqual(2013);
            Timecop.freeze(Date.parse('2013-01-01'));
            expect(scope.currentReportMonth()).toEqual(1);
            expect(scope.currentReportYear()).toEqual(2013);
            Timecop.freeze(Date.parse('2013-01-26'));
            expect(scope.currentReportMonth()).toEqual(2);
            expect(scope.currentReportYear()).toEqual(2013);
            Timecop.freeze(Date.parse('2013-01-25'));
            expect(scope.currentReportMonth()).toEqual(1);
            expect(scope.currentReportYear()).toEqual(2013);

            Timecop.returnToPresent();
            Timecop.uninstall();
        });
    });

    describe("Printable Registers", function () {
        it('should be able to download Printable Register for selected ANM', function () {
            spyOn(registerService, 'prepareRegisterFor').andCallThrough();
            var anm = new ANM('demo1', 'demo1 name', 'bherya - b');

            createController();
            scope.getRegister(anm, 'anc');

            prepareRegisterForDeferredResponse.resolve('/download_url');
            scope.$apply();
            expect(anm.ancRegister).toEqual('/download_url');
            expect(anm.ancRegisterDownloadStatus).toEqual('ready');
        });

        it('should remove nrhmReportDownloadStatus when register download url is not returned from Register Service', function () {
            spyOn(registerService, 'prepareRegisterFor').andCallThrough();
            var anm = new ANM('demo1', 'demo1 name', 'bherya - b');

            createController();
            scope.getRegister(anm, 'anc');

            prepareRegisterForDeferredResponse.reject();
            scope.$apply();
            expect(anm.ancRegisterDownloadStatus).toBeUndefined();

        });
    });

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });
});
