'use strict';
/**
 *  The module manages the user data session as local data.
 */
angular.module('ticketsystem.storageService', [])
    .service('storageService', ['$rootScope',
        function ($rootScope) {
            let userInformation = {};
            let logged = false;
            return {

                /**
                 *  Function gets the required user data field.
                 *  @param key      field of the user data
                 *  @returns {string | null}    user data if field is found, null otherwise
                 */
                get: function (key) {
                    return localStorage.getItem(key);
                },

                /**
                 *  Function saves the user data in the specified key.
                 *  @param key      field of the user data
                 *  @param data     user data
                 */
                save: function (key, data) {
                    localStorage.setItem(key, data);
                },

                /**
                 *  Function saves the user data and set him/her as logged.
                 *  @param user
                 */
                setUser: function (user) {
                    localStorage.setItem('userInformation',JSON.stringify(user));
                    localStorage.setItem('logged',true);
                },
                /**
                 *  Function gets all the user data.
                 *  @returns {any}  Complete user data
                 */
                getUser: function () {
                    return JSON.parse(localStorage.getItem('userInformation'));
                },

                /**
                 *  Function erases the saved user data.
                 */
                invalidateUser: function () {
                    localStorage.removeItem('userInformation')
                    localStorage.removeItem('logged')
                },

                /**
                 *  Function returns data if user is logged.
                 *  @returns {string | null}    User data if logged, null otherwise.
                 */
                isLogged: function () {
                    return localStorage.getItem('logged');
                }

            };
        }]);