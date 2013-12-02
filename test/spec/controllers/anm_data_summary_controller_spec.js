'use strict';

describe('Controller: ANMDataSummaryCtrl', function () {

    var scope, httpBackend, controller;

    beforeEach(module('drishtiSiteApp'));
//    beforeEach(inject(function ($injector) {
//        $httpBackend = $injector.get($httpBackend);
//        $rootScope = $injector.get($rootScope);
//        var $controller = $injector.get('$controller');
//        createController = function () {
//            return $controller('ANMDataSummaryCtrl', {'$scope': $rootScope });
//        };
//    }));
    beforeEach(inject(function ($injector) {
        httpBackend = $injector.get("$httpBackend");
    }));


    it('should return a list of anms', inject(function (ANMDataSummaryService) {
        var allANMs = [
            {"username": "c", "subcenter": "bherya - a", "role": "anm"},
            {"username": "demo1", "subcenter": "bherya - b", "role": "anm"},
            {"username": "admin", "subcenter": "klp 2", "role": "anm"}
        ];

        httpBackend.when("GET", "/anms").respond(allANMs);
        var expectedANMS = [
            {"username": "c", "subcenter": "bherya - a", "role": "anm"},
            {"username": "demo1", "subcenter": "bherya - b", "role": "anm"},
            {"username": "admin", "subcenter": "klp 2", "role": "anm"}
        ];
        expect(ANMDataSummaryService.anms(scope, httpBackend)).toEqual(expectedANMS);
    }));

//        httpMock.expect('http://localhost:4567/anms').respond(expectedANMS);
//        var controller = createController();
//        $httpBackend.flush();
//        expect(anmDataSummaryService.anms()).toEqual(allANMs);
//    });
//
//    afterEach(function () {
//        httpBackend.verifyNoOutstandingExpectation();
//        httpBackend.verifyNoOutstandingRequest();
//    });

});
