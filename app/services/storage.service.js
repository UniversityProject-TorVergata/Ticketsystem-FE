'use strict';
/*

    Questo servizio permette di salvare in locale dei dati di sessione.
    Gli oggetti vengono salvati come coppia ('key','value') dove sia 'key' che 'value' sono stringhe.

    Per salvare un oggetto di tipo JSON si può attuare la seguente procedura per salvare ad esempio un JSON myObj:

    myStringObj = JSON.stringify(myObj);
    storageService.save("myKey",myStringObj);

    Per recuperare l'oggetto myObj :

    myStringObj = storageService.get("myKey");
    myObj = JSON.parse(myStringObj);

 */
angular.module('ticketsystem.storageService', [])
    .service('storageService', ['$rootScope',
        function ($rootScope) {

            return {
                get: function (key) {

                    return sessionStorage.getItem(key);

                },
                save: function (key, data) {
                    sessionStorage.setItem(key, data);
                }
            };
        }]);