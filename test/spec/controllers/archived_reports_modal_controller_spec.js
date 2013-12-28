'use strict';

describe('Controller: ', function () {

    var scope, createController;

    beforeEach(module('drishtiSiteApp'));
    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        createController = function () {
            return $controller(
                'ArchivedReportsModalCtrl', {
                    '$scope': scope,
                    '$modalInstance': null,
                    'anm': {},
                    ARCHIVED_REPORTS_START_YEAR: 2000
                });
        };
    }));

    describe('Years for which reports can be downloaded', function () {
        beforeEach(function () {
            Timecop.install();
        });

        it('should include only current year when current year is same as start year', function () {
            Timecop.freeze(Date.parse('2000-01-01'));

            createController();

            expect(scope.years).toEqual([2000]);
        });


        it('should include all years from start year to current year', function () {
            Timecop.freeze(Date.parse('2004-01-01'));

            createController();

            expect(scope.years).toEqual([2000, 2001, 2002, 2003, 2004]);
        });

        afterEach(function () {
            Timecop.returnToPresent();
            Timecop.uninstall();
        });
    });

    describe('Months for which reports can be downloaded', function () {
        beforeEach(function () {
            Timecop.install();
        });

        it('should include all months when selected year is not current year', function () {
            Timecop.freeze(Date.parse('2000-01-01'));
            createController();
            scope.selectedYear = {year: 2001};

            expect(scope.months())
                .toEqual(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
        });

        it('should include only past months when selected year is current year', function () {
            Timecop.freeze(Date.parse('2000-05-01'));
            createController();
            scope.selectedYear = {year: 2000};

            expect(scope.months())
                .toEqual(['Jan', 'Feb', 'Mar', 'Apr', 'May']);
        });

        afterEach(function () {
            Timecop.returnToPresent();
            Timecop.uninstall();
        });
    });
});
