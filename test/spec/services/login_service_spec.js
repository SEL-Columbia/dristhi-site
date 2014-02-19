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
            service.login("valid-user", "r@nd0mPa55w0rd").then(function (result) {
                responseResult = result;
            });
            httpBackend.flush();
            expect(responseResult).toBe(true);
        });

        it('should return false on unsuccessful login', function () {
            var response = {
                'data': 1
            };
            httpBackend.expectGET('https://smartregistries.org/authenticate-user').respond(404, response);
            var responseResult = null;
            service.login("invalid-user", "r@nd0mPa55w0rd").then(function (result) {
                responseResult = result;
            });
            httpBackend.flush();
            expect(responseResult).toBe(false);
        });
    });
});