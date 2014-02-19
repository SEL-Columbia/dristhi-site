'use strict';
describe("Unit Testing: Filters - ", function() {

    var filter;
    beforeEach(module('drishtiSiteApp'));

    beforeEach(inject(function ($filter) {
        filter = $filter('humanizeChildAge');
    }));

    it('should calculate child age with the right units', function () {
        Timecop.install();

        Timecop.freeze(Date.parse('2014-01-14'));
        var childDOB = [ 2014, 1, 1];
        var expectedChildAge = "13 d.";
        var childAge = filter(childDOB);
        expect(expectedChildAge).toEqual(childAge);

        childDOB = [2013, 12, 1];
        expectedChildAge = "6 w.";
        childAge = filter(childDOB);
        expect(expectedChildAge).toEqual(childAge);

        childDOB = [2013, 10, 1];
        expectedChildAge = "3 m.";
        childAge = filter(childDOB);
        expect(expectedChildAge).toEqual(childAge);

        childDOB = [2013, 1, 1];
        expectedChildAge = "12 m.";
        childAge = filter(childDOB);
        expect(expectedChildAge).toEqual(childAge);

        childDOB = [2012, 11, 1];
        expectedChildAge = "14 m.";
        childAge = filter(childDOB);
        expect(expectedChildAge).toEqual(childAge);

        childDOB = [2011, 11, 1];
        expectedChildAge = "2 y. 2 m.";
        childAge = filter(childDOB);
        expect(expectedChildAge).toEqual(childAge);

        Timecop.returnToPresent();
        Timecop.uninstall();
    });
});