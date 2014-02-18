'use strict';

describe('ANM Service', function () {

    var httpBackend, q, service;

    beforeEach(module('drishtiSiteApp'));
    beforeEach(inject(function ($httpBackend, $q, LoginService) {
        httpBackend = $httpBackend;
        q = $q;
        service = LoginService;
    }));
    describe('Login Service', function () {
        it('should return true on successful login', function () {
            var response = {};

            httpBackend.expectGET('https://smartregistries.org/authenticate-user').respond(200, response);
            var responseResult = null;
            service.login().then(function (result) {
                responseResult = result;
            });

            httpBackend.flush();
            expect(responseResult.status).toBe(200);
            expect(responseResult.data).toEqual({});
        });
    });
});