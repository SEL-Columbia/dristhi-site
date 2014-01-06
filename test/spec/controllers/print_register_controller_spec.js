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
                    $scope: scope,
                    ANMService: anmService
                });
        };
    }));

    describe('Display list of ANMs by getting data from ANMService', function () {
        it('should get list of ANMs from server and set it on scope', function () {
            spyOn(anmService, 'all').andCallThrough();
            var expectedANMs = [
                {"identifier": "c", "subCenter": "bherya - a"},
                {"identifier": "demo1", "subCenter": "bherya - b"},
                {"identifier": "admin", "subCenter": "klp 2"}
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
            var anm =
            {
                'identifier': 'demo1',
                'subCenter': 'bherya - b'
            };

            createController();
            scope.excelReportsForANM(anm, '12', '2013');

            prepareReportForDeferredResponse.resolve('/download_url');
            scope.$apply();
            expect(anm.excelReport).toEqual('/download_url');
            expect(anm.downloadStatus).toEqual('ready');
        });

        it('should remove downloadStatus when excel download url is not returned from ANM service', function () {
            spyOn(anmService, 'prepareReportFor').andCallThrough();
            var anm =
            {
                'identifier': 'demo1',
                'subCenter': 'bherya - b'
            };

            createController();
            scope.excelReportsForANM(anm, '12', '2013');

            prepareReportForDeferredResponse.reject();
            scope.$apply();
            expect(anm.downloadStatus).toBeUndefined();

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

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

});
