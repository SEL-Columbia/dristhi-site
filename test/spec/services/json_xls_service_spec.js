'use strict';

describe('JSONXLSService: ', function () {

    var httpBackend, service, q, tokens;

    beforeEach(module('drishtiSiteApp'));
    beforeEach(inject(function ($httpBackend, $q, JSONXLSService, REGISTER_TOKENS) {
        httpBackend = $httpBackend;
        q = $q;
        service = JSONXLSService;
        tokens = REGISTER_TOKENS;
    }));

    it('should fetch EC Register', function () {
        var registers = {};

        var expectedRegisterDownloadURL = '/register_download_url';
        httpBackend.expectPOST('http://xls.ona.io/xls/e86e0e2211f54b128181cdec0b63cb11', registers).respond(201, expectedRegisterDownloadURL);

        var response = null;
        service.ecRegister(registers).then(function (result) {
            response = result
        });
        httpBackend.flush();
        expect(response).toEqual('http://xls.ona.io' + expectedRegisterDownloadURL);
    });

    it('should fetch ANC Register', function () {
        var registers = {};

        var expectedRegisterDownloadURL = '/register_download_url';
        httpBackend.expectPOST('http://xls.ona.io/xls/dd3ac9bd3d7f469fbc7d0c7d73a442e6', registers).respond(201, expectedRegisterDownloadURL);

        var response = null;
        service.ancRegister(registers).then(function (result) {
            response = result
        });
        httpBackend.flush();
        expect(response).toEqual('http://xls.ona.io' + expectedRegisterDownloadURL);
    });
});
