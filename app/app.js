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
    'ticketsystem.accountCustomer',

    //CompanyAdmin
    'ticketsystem.homeAdmin',
    'ticketsystem.createTarget',
    'ticketsystem.accountAdmin',

    //Factories
    'ticketsystem.storageService',

    //  Team Coordinator
    'ticketsystem.homeTeamCoordinator',
    'ticketsystem.assignTeam',
    'ticketsystem.createTeam',

    'isteven-multi-select',
    'modal'


]);
