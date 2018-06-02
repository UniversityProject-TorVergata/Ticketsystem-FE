'use strict';
/**
 *  The service saves user data session as local data.
 *  Object are saved as a string pair <key,value>.
 *  For saving data:
 *      myStringObj = JSON.stringify(myObj);
 *      storageService.save("myKey",myStringObj);
 *  and for reading data:
 *      myStringObj = storageService.get("myKey");
 *      myObj = JSON.parse(myStringObj);
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