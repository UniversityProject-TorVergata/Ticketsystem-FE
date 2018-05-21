'use strict';
// Declare app level module which depends on views, and components
angular.module('ticketsystem', [

    'ngRoute',
    'angularMoment',

    //  Services
    'ticketsystem.restService',
    'ticketsystem.utilService',
    'ticketsystem.modelService',
    'ticketsystem.loginService',

    //  Routes
    'ticketsystem.router',

    //  Directives
    'ticketsystem.directives',

    // User
    'ticketsystem.loginUser',

    // Ticket
    'ticketsystem.createTicket',

    // Home
    'ticketsystem.home',

    // ThirdPartyCustomer
    'ticketsystem.homeThirdPartyCustomer',
    'ticketsystem.accountThirdPartyCustomer',

    //CompanyAdmin
    'ticketsystem.homeCompanyAdmin',
    'ticketsystem.createProduct',
    'ticketsystem.createUser',
    'ticketsystem.accountCompanyAdmin'


]);
