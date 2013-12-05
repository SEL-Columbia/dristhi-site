'use strict';

describe('Controller: ANMDataSummaryCtrl', function () {

    var scope, httpBackend, createController;

    beforeEach(module('drishtiSiteApp'));
    beforeEach(inject(function ($rootScope, $controller, $httpBackend) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        createController = function () {
            var controller = $controller('ANMDataSummaryCtrl', {'$scope': scope });
            httpBackend.flush();
            return controller;
        };
    }));

    it('should get list of ANMs from server and set it on scope', function () {
        var expectedANMs = [
            {"identifier": "c", "subCenter": "bherya - a"},
            {"identifier": "demo1", "subCenter": "bherya - b"},
            {"identifier": "admin", "subCenter": "klp 2"}
        ];
        httpBackend.expectGET('http://localhost:9979/anms').respond(expectedANMs);
        createController();
        expect(scope.anms).toEqual(expectedANMs);
    });

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

});
