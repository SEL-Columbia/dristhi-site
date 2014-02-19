angular.module('drishtiSiteApp.filters')
    .filter('humanizeChildAge', function ($moment) {
        'use strict';

        return function(dateOfBirth) {
            var personDOB = [dateOfBirth[0], dateOfBirth[1] - 1, dateOfBirth[2]];
            var today = $moment();
            var days = today.diff($moment(personDOB), 'days');
            if (days <= 28) {
                return days + ' d.';
            }
            var weeks = today.diff($moment(personDOB), 'weeks');
            if (weeks <= 14) {
                return weeks + ' w.';
            }
            var months = today.diff($moment(personDOB), 'months');
            if (months < 24) {
                return months + ' m.';
            }
            var years = today.diff($moment(personDOB), 'years');
            var remainingMonths = months - (years * 12);
            if (remainingMonths !== 0) {
                return years + ' y. ' + remainingMonths + ' m.';
            }
            return years + ' y.';
        }
    });
