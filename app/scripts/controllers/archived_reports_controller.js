angular.module('drishtiSiteApp')
    .controller('ArchivesCtrl', function ($scope, $modal) {
        'use strict';

        $scope.open = function () {
            $modal.open({
                templateUrl: 'archived-report-modal.html',
                controller: 'ArchivedReportsModalCtrl'
            });
        };
    });