'use strict';

angular.module('ticketsystem.signupCompany', ['ngRoute'])
    .controller('SignupCompanyCtrl', function ($scope, restService, /*httpService,*/ $location) {
        $scope.user = {
            company_name: "Arf Arf e KTM",
            company_address: "Via delle baubau 666",
            company_code: "tuttecosePDPM"
        }
        $scope.startSignupCompany = function () {
            // console.log(username, email, password);
            /*httpService.post(restService.signupUser, $scope.user)
                .then(function (data) {
                    $location.path('/loginUser')
                    console.log(data)
                })
                */
        }
    });