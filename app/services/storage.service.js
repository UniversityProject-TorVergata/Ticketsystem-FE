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
            let userInformation = {};
            let logged = false;
            return {
                get: function (key) {
                    return localStorage.getItem(key);
                },
                save: function (key, data) {
                    localStorage.setItem(key, data);
                },
                setUser: function (user) {
                    localStorage.setItem('userInformation',JSON.stringify(user));
                    localStorage.setItem('logged',true);
                },
                getUser: function () {
                    return JSON.parse(localStorage.getItem('userInformation'));
                },
                invalidateUser: function () {
                    localStorage.removeItem('userInformation')
                    localStorage.removeItem('logged')
                },
                isLogged: function () {
                    return localStorage.getItem('logged');
                }

            };
        }]);