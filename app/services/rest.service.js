'use strict';
angular.module('ticketsystem.restService', [])
    .constant("CONNECTION", {
        url: "http://localhost:8200/ticketsystem"
        //url: "https://stormy-lake-55984.herokuapp.com/ticketsystem"
    })

    .service('restService', function (CONNECTION) {
        return {
            "login": CONNECTION.url + '/registered_user/login',
            "createTicket": CONNECTION.url + '/ticket',

            //  Ticket by state
            "newTickets": CONNECTION.url + '/ticket/findTicketByState/NEW',
            "pendingTickets": CONNECTION.url + '/ticket/findTicketByState/PENDING',
            "readyTickets": CONNECTION.url + '/ticket/findTicketByState/READY',
            "executionTickets": CONNECTION.url + '/ticket/findTicketByState/EXECUTION',
            "trashedTickets": CONNECTION.url + '/ticket/findTicketByState/TRASHED',

            "teamLeader": CONNECTION.url + '/registered_user/team_leader',
            "assignTicket": CONNECTION.url + '/ticket/assignTicket',
            "createUser": CONNECTION.url + '/registered_user',
            "getUser": CONNECTION.url + '/registered_user',
            "deleteUser": CONNECTION.url + '/registered_user',
            "updateUser": CONNECTION.url + '/registered_user',
            "createProduct": CONNECTION.url + '/product',
            "readTargets": CONNECTION.url + '/target'
        };
    })
    .service('httpService', function ($http) {
        return {
            get: function (url, header) {

                return $http({
                    "url": url,
                    "method": "GET",
                    "headers": header
                });
            },
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
            delete: function (url, data, header) {
                var head = "";
                if (header) head = header;
                return $http({
                    "method": "DELETE",
                    "url": url+"/"+data,
                    "headers": header
                });
            }
        };
    });