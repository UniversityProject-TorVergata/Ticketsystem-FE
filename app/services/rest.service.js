'use strict';
/**
 *  The module manages all the HTTP requests.
 */
angular.module('ticketsystem.restService', [])

    //  Backend URL
    .constant("CONNECTION", {
        url: "http://localhost:8200/ticketsystem"
    })

    //  Service for HTTP requests with REST URLs
    .service('restService', function (CONNECTION) {
        return {

            //  Login
            "login": CONNECTION.url + '/registered_user/login',

            //  CRUD ticket
            "createTicket": CONNECTION.url + '/ticket',
            "insertComment": CONNECTION.url + '/ticket/insertComment',

            //  TODO dopo la rivisitazione delle SM, vanno tolti...?
            //  Find Ticket by state
            "findTicketByState": CONNECTION.url + '/ticket/findTicketByState',
            "validationTickets": CONNECTION.url + '/ticket/findTicketByState/VALIDATION',
            "pendingTickets": CONNECTION.url + '/ticket/findTicketByState/PENDING',
            "editTickets": CONNECTION.url + '/ticket/findTicketByState/EDIT',
            "executionTickets": CONNECTION.url + '/ticket/findTicketByState/EXECUTION',
            "discardedTickets": CONNECTION.url + '/ticket/findTicketByState/DISCARDED',
            "resolvedTickets": CONNECTION.url + '/ticket/findTicketByState/RESOLVED',
            "closedTickets": CONNECTION.url + '/ticket/findTicketByState/CLOSED',

            //  Ticket by openerUser
            "readMyTickets": CONNECTION.url + '/ticket/ticketByOpenerUser',

            //  Ticket by resolverUser
            "readMyAssignedTickets": CONNECTION.url + '/ticket/ticketByResolverUser',

            //  Change ticket state
            "changeTicketState": CONNECTION.url + '/ticket/changeState',

            //  Team Leader
            "teamLeader": CONNECTION.url + '/registered_user/team_leader',
            "employedTeamLeader" : CONNECTION.url + '/registered_user/employed_team_leader',

            //  Team Coordinator
            "assignTicket": CONNECTION.url + '/ticket/assignTicket',

            //  CRUD Registered User
            //  TODO sono tutti uguali...
            "createUser": CONNECTION.url + '/registered_user',
            "getUser": CONNECTION.url + '/registered_user',
            "deleteUser": CONNECTION.url + '/registered_user',
            "updateUser": CONNECTION.url + '/registered_user',

            //  TODO cancellabile?
            "createTarget": CONNECTION.url + '/target',

            //  Target
            "readTargets": CONNECTION.url + '/target',
            "readActiveTargets" : CONNECTION.url + '/target/active',

            // State Machine
            "getStateMachines" : CONNECTION.url + '/state_machine',

            //  Team
            "getTeamMembers": CONNECTION.url + '/registered_user/free_team_member',
            "getTeamLeaders": CONNECTION.url + '/registered_user/team_leader',
            "getFreeTeamLeaders" : CONNECTION.url + '/registered_user/free_team_leader',
            "getMembersByTeamId": CONNECTION.url + '/team/team_member',
            "getLeaderByTeamId" : CONNECTION.url + '/team/team_leader',

            //  TeamMembers by TeamLeader
            "getTeamMembersByTeamLeader": CONNECTION.url + '/team/team_member/team_leader',

            //  TeamLeader by Team ID
            "getTeamLeaderByTeamID": CONNECTION.url + '/team/team_leader',

            //  Get TeamCoordinator
            "getTeamCoordinator": CONNECTION.url + '/registered_user/team_coordinator',

            "createTeam": CONNECTION.url + '/team',
            "getTeams": CONNECTION.url + '/team',
            "updateTeamMember": CONNECTION.url + '/team/add_team_member',

            //  Info about current state and future states of a ticket
            "getStateInformation": CONNECTION.url + '/ticket/getStateInformation',

            //  Get user by role
            "getUserByRole": CONNECTION.url + '/registered_user/getUserByRole',

            //  change ticket difficulty
            "changeTicketDifficulty": CONNECTION.url + '/ticket/changeDifficulty'

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