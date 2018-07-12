'use strict';
/**
 *  @ngdoc module
 *  @name  ticketsystem.storageService
 *  @description The module manages the user data session as local data.
 */
angular.module('ticketsystem.storageService', [])

    /**
     *  @ngdoc  service
     *  @module  ticketsystem.storageService
     *  @name   storageService
     *  @description   Service manages the operation save/load user data.
     */
    .service('storageService', ['$rootScope',
        function ($rootScope) {
            let userInformation = {};
            let logged = false;
            return {

                /**
                 *  @ngdoc function
                 *  @name get
                 *  @description Function gets the required user data field.
                 *  @param key      field of the user data
                 *  @returns {string | null}    user data if field is found, null otherwise
                 */
                get: function (key) {
                    return localStorage.getItem(key);
                },
                /**
                 *  @ngdoc function
                 *  @name save
                 *  @description Function saves the user data in the specified key.
                 *  @param key      field of the user data
                 *  @param data     user data
                 */
                save: function (key, data) {
                    localStorage.setItem(key, data);
                },
                /**
                 *  @ngdoc function
                 *  @name setuser
                 *  @description Function saves the user data and set him/her as logged.
                 *  @param user
                 */
                setUser: function (user) {
                    localStorage.setItem('userInformation',JSON.stringify(user));
                    localStorage.setItem('logged',true);
                },
                /**
                 *  @ngdoc function
                 *  @name getUser
                 *  @description Function gets all the user data.
                 *  @returns {any}  Complete user data
                 */
                getUser: function () {
                    return JSON.parse(localStorage.getItem('userInformation'));
                },
                /**
                 *  @ngdoc function
                 *  @name invalidateUser
                 *  @description Function erases the saved user data.
                 *  @returns {any}  Complete user data
                 */
                invalidateUser: function () {
                    localStorage.removeItem('userInformation')
                    localStorage.removeItem('logged')
                },
                /**
                 *  @ngdoc function
                 *  @name isLogged
                 *  @description Function returns data if user is logged.
                 *  @returns {string | null}    User data if logged, null otherwise.
                 */
                isLogged: function () {
                    return localStorage.getItem('logged');
                }

            };
        }]);