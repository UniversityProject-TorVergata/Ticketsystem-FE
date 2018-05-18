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

    // Ticket
    'ticketsystem.createTicket',

    // Home
    'ticketsystem.home',

    // ThirdPartyCustomer
    'ticketsystem.homeThirdPartyCustomer',

    //CompanyAdmin
    'ticketsystem.homeCompanyAdmin',
    'ticketsystem.createProduct',
    'ticketsystem.createUser'

])
