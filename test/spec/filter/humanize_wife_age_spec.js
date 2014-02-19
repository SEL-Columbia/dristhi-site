'use strict';
describe("Unit Testing: Filters - ", function () {

    var filter;
    beforeEach(module('drishtiSiteApp'));

    beforeEach(inject(function ($filter) {
        filter = $filter('humanizeWifeAge');
    }));

    it('should calculate wife age', function () {
        Timecop.install();

        Timecop.freeze(Date.parse('2014-01-14'));
        var wifeDOB = [ 1988, 1, 1];
        var expectedWifeAge = 25;
        var wifeAge = filter(wifeDOB);
        expect(expectedWifeAge).toEqual(wifeAge);

        Timecop.returnToPresent();
        Timecop.uninstall();

    });
});