angular.module('drishtiSiteApp.filters')
    .filter('humanizeAndTitleize', function () {
        'use strict';

        return function (input) {
            try {
                return _.str.titleize(_.str.humanize(input));
            }
            catch (err) {
                return '';
            }
        };
    });
