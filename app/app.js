'use strict';
// Declare navbar level module which depends on views, and components
var app = angular.module('ticketsystem', [

    'ngRoute',
    'ui.router',
    'ui.bootstrap',

    //  Sidebar
    'ticketsystem.sidebar',
    'ticketsystem.menuservice',

    //TagsInput
    'ngTagsInput',

    //  Services
    'ticketsystem.restService',
    'ticketsystem.utilService',
    'ticketsystem.modelService',

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

    //  Account info
    'ticketsystem.accountInfo',

    //  Admin
    'ticketsystem.createUser',
    'ticketsystem.homeAdmin',
    'ticketsystem.createTarget',

    // Customer
    'ticketsystem.homeCustomer',
    'ticketsystem.createCustomer',

    //Factories
    'ticketsystem.storageService',

    //  Team Coordinator
    'ticketsystem.homeTeamCoordinator',
    'ticketsystem.assignTeam',
    'ticketsystem.createTeam',

    //  Team Leader
    'ticketsystem.teamLeader',
    'ticketsystem.homeTeamLeader',

    'isteven-multi-select',
    'modal',
    'drag-and-drop',
    'dashboard'


])
    .run(function ($rootScope, $transitions) {
        $transitions.onStart({}, function (transition) {
            let profile
            if (localStorage.getItem('userInformation'))
                profile = JSON.parse(localStorage.getItem('userInformation'))['@type']
            if (transition.to().data.requiredLogin && profile && transition.to().data.access.indexOf('ALL') > -1) {
                return true
            }
            if (transition.to().data.requiredLogin && profile && transition.to().data.access.indexOf(profile) === -1) {
                alert('Not authorized')
                return false;
            }
        })
    })
;

app.config(function(tagsInputConfigProvider) {
    tagsInputConfigProvider.setDefaults('tagsInput', {
        placeholder: 'Add category',
        //removeTagSymbol: '✖'
    });
});

