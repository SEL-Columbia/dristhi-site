angular.module('drishtiSiteApp')
    .controller('ArchivesCtrl', function ($scope, $modal) {
        'use strict';

        $scope.open = function () {
            var modalInstance = $modal.open({
                templateUrl: 'archived-report-modal.html',
                controller: 'ArchivedReportsModalCtrl'
            });
            modalInstance.result.then(function (selection) {
                console.log('Year: ' + selection.year);
                console.log('Month: ' + selection.month);
            });
        };

    })
;