'use strict';
// Declare navbar level module which depends on views, and components
angular.module('ticketsystem', [

    'ngRoute',
    'angularMoment',
    'ui.bootstrap',

    //  Services
    'ticketsystem.restService',
    'ticketsystem.utilService',
    'ticketsystem.modelService',
    'ticketsystem.loginService',

    //  Mocks for select list
    'ticketsystem.productService',
    'ticketsystem.sourceTypeService',

    //  Filters
    'ticketsystem.stringFilter',

    //  Routes
    'ticketsystem.router',

    //  Directives
    'ticketsystem.directives',

    //  Starting page
    'ticketsystem.Login',

    // Ticket
    'ticketsystem.createTicket',

    // Home
    'ticketsystem.home',

    // Customer
    'ticketsystem.homeCustomer',
    'ticketsystem.createCustomer',
    'ticketsystem.accountThirdPartyCustomer',

    //CompanyAdmin
    'ticketsystem.homeAdmin',
    'ticketsystem.createProduct',
    'ticketsystem.accountCompanyAdmin',

    //Factories
    'ticketsystem.storageService',

    //  Team Coordinator
    'ticketsystem.assignTeam',

    'isteven-multi-select',


]);
