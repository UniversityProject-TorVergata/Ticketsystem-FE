'use strict';
/**
 *  This module manages all the HTTP requests.
 */
angular.module('ticketsystem.restService', [])

    //  Backend URL
    .constant("CONNECTION", {
        url: "http://localhost:8200/ticketsystem"
    })

    .service('restService', function (CONNECTION) {
        return {

            //  Login
            "login": CONNECTION.url + '/registered_user/login',

            //  CRUD ticket
            "createTicket": CONNECTION.url + '/ticket',

            //  Find Ticket by state
            "newTickets": CONNECTION.url + '/ticket/findTicketByState/NEW',
            "pendingTickets": CONNECTION.url + '/ticket/findTicketByState/PENDING',
            "readyTickets": CONNECTION.url + '/ticket/findTicketByState/READY',
            "executionTickets": CONNECTION.url + '/ticket/findTicketByState/EXECUTION',
            "trashedTickets": CONNECTION.url + '/ticket/findTicketByState/TRASHED',

            //  Team Leader
            "teamLeader": CONNECTION.url + '/registered_user/team_leader',

            //  Team Coordinator
            "assignTicket": CONNECTION.url + '/ticket/assignTicket',

            //  CRUD Registered User
            //  TODO sono tutti uguali...
            "createUser": CONNECTION.url + '/registered_user',
            "getUser": CONNECTION.url + '/registered_user',
            "deleteUser": CONNECTION.url + '/registered_user',
            "updateUser": CONNECTION.url + '/registered_user',

            //  TODO cancellabile?
            "createProduct": CONNECTION.url + '/product',

            //  Target
            "readTargets": CONNECTION.url + '/target'
        };
    })
    .service('httpService', function ($http) {
        return {

            /**
             *  HTTP GET function.
             *  @param url      Service URL
             *  @param header   Data Header
             *  @returns {*}    HTTP Response
             */
            get: function (url, header) {
                return $http({
                    "url": url,
                    "method": "GET",
                    "headers": header
                });
            },

            /**
             *  HTTP POST function.
             *  @param url      Service URL
             *  @param data     Request body
             *  @param header   Data Header
             *  @returns {*}    HTTP Response
             */
            post: function (url, data, header) {
                var head = "";
                if (header) head = header;
                return $http({
                    "method": "POST",
                    "url": url,
                    "headers": head,
                    "data": data
                });
            },

            /**
             *  HTTP PUT function.
             *  @param url      Service URL
             *  @param id       ID to find the requested object
             *  @param data     Request body
             *  @param header   Data Header
             *  @returns {*}    HTTP Response
             */
            put: function (url, id, data, header) {
                var head = "";
                if (header) head = header;
                return $http({
                    "method": "PUT",
                    "url": url+"/"+id,
                    "headers": head,
                    "data": data
                });
            },

            /**
             *  HTTP DELETE function.
             *  @param url      Service URL
             *  @param id       ID to find the requested object
             *  @param header   Data Header
             *  @returns {*}    HTTP Response
             */
            delete: function (url, id, header) {
                var head = "";
                if (header) head = header;
                return $http({
                    "method": "DELETE",
                    "url": url+"/"+id,
                    "headers": header
                });
            }
        };
    });