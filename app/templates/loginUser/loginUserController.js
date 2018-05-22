'use strict';

angular.module('ticketsystem.loginUser', ['ngRoute'])

    .controller('LoginUserCtrl', function ($scope, restService, httpService,$location,loginService,storageService) {

        /*
            Funzione che esegue il Login.
            I dati vengono inviati con metodo POST.
            In caso di autenticazione il Back-End risponde con un JSON
            che contiene tutte le INFO del utente Loggato.

         */
        $scope.startLoginUser = function () {



            if(angular.isUndefined($scope.user) || angular.isUndefined($scope.user.username) ||
                angular.isUndefined($scope.user.password) ) {

                window.alert('è necessario riempire tutti i campi!')
            }
            else if($scope.user.username == "" || $scope.user.password == ""){
                window.alert('è necessario riempire tutti i campi!')
            }
            else {

                httpService.post(restService.login, $scope.user).then(function (response) {
                    // turn on flag for post successfully
                    if(response.data["@type"] == "ThirdPartyCustomer") {
                        $location.url("/homeThirdPartyCustomer");

                    }
                    else if(response.data["@type"] == "CompanyAdmin") {
                        $location.url("/homeCompanyAdmin");
                    }
                    //Salvo nei dati di sessione le info dell'account appena loggato.
                    storageService.save("userData",JSON.stringify(response.data));


                }, function error(response) {

                    window.alert("Login failed ");

                });


            }
        };
    });