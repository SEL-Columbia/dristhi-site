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
            {"username": "c", "subcenter": "bherya - a", "role": "anm"},
            {"username": "demo1", "subcenter": "bherya - b", "role": "anm"},
            {"username": "admin", "subcenter": "klp 2", "role": "anm"}
        ];
        httpBackend.expectGET('http://localhost:4567/anms').respond(expectedANMs);
        createController();
        expect(scope.anms).toEqual(expectedANMs);
    });

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

});
