'use strict';
// Declare navbar level module which depends on views, and components
var app = angular.module('ticketsystem', [

    'ngRoute',
    'ui.router',
    'ui.bootstrap',

    //ui - select
    'ui.select',
    'ngSanitize',

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
    'ticketsystem.readTicket',

    //  Account info
    'ticketsystem.accountInfo',

    //  Home
    'ticketsystem.home',

    //  Admin
    'ticketsystem.createUser',
    'ticketsystem.createTarget',
    'ticketsystem.listTarget',
    'ticketsystem.modifyTarget',
    'ticketsystem.createStateMachine',


    // Customer
    'ticketsystem.createCustomer',

    //Factories
    'ticketsystem.storageService',

    //  Team Coordinator
    'ticketsystem.createTeam',
    'ticketsystem.readTeam',


    'isteven-multi-select',
    'modal',
    'drag-and-drop',
    'dashboard'


])
app.run(function ($rootScope, $transitions) {
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

app.filter('propsFilter', function() {
    return function(items, props) {
        var out = [];

        if (angular.isArray(items)) {
            var keys = Object.keys(props);

            items.forEach(function(item) {
                var itemMatches = false;

                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    };
});
