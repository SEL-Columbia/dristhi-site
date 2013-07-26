'use strict';

angular.module('drishtiSiteApp')
    .controller('PrintRegisterCtrl', function ($scope, FPPrintRegisterService) {
        $scope.date = new Date();
        $scope.fpUsers = FPPrintRegisterService.fpUsers();

    });
