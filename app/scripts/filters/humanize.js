/*globals _*/

angular.module("drishtiSiteApp.filters")
    .filter('humanizeAndTitleize', function () {
        return function (input) {
            try {
                return _.str.titleize(_.str.humanize(input));
            }
            catch (err) {
                return "";
            }
        }
    });
