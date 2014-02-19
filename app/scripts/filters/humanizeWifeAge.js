angular.module('drishtiSiteApp.filters')
    .filter('humanizeWifeAge', function ($moment) {
        'use strict';

        return function(dateOfBirth) {
            return $moment().diff($moment(dateOfBirth), 'years');
        }
    });
