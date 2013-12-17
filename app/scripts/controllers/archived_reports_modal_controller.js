angular.module('drishtiSiteApp')
    .controller('ArchivedReportsModalCtrl', function ($scope, $modalInstance) {
        'use strict';

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });