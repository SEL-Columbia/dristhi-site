'use strict';

angular.module('drishtiSiteApp')
    .controller('PrintRegisterCtrl', function ($scope, FPPrintRegisterService) {

        $scope.fpUsers = FPPrintRegisterService.fpUsers();

    });
