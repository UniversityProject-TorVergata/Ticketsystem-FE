'use strict';
// Declare app level module which depends on views, and components
angular.module('ticketsystem', [

    'ngRoute',
    'angularMoment',
    'ticketsystem.restService',
    'ticketsystem.utilService',
    'ticketsystem.router',
    'ticketsystem.directives',

    // User
    'ticketsystem.loginUser',
    'ticketsystem.signupUser',

    // Company
    'ticketsystem.loginCompany',
    'ticketsystem.signupCompany',

    // Ticket
    'ticketsystem.createTicket',

    // Home
    'ticketsystem.home',

    // ThirdPartyCustomer
    'ticketsystem.homeThirdPartyCustomer'

])
