# `TicketingSystem`

## Getting Started

To get you started, follow thw instruction below:

### Prerequisites

You must have Node.js and its package manager (npm) installed. You can get them from [here][node].

### Install Dependencies

The dependencies in this project (tools) are provided via `npm`, the [Node package manager][npm].
So, simply do:

```
cd app/
```
and then

```
npm install
```

After that, you should find out that you have a new folder in your project.

* `node_modules` - contains the npm packages for the tools needed

*Note that npm install can take awhile*

### Run the Application

The simplest way to start the project is

```
npm start
```

Now, browse to the navbar of your favorite browser at [`localhost:8000`][local-navbar-url].


## Directory Layout

```
├── LICENSE
├── README.md
└── app
    ├── app.css
    ├── app.js
    ├── app.router.js
    ├── components
    │   └── version
    │       ├── interpolate-filter.js
    │       ├── interpolate-filter_test.js
    │       ├── version-directive.js
    │       ├── version-directive_test.js
    │       ├── version.js
    │       └── version_test.js
    ├── css
    │   └── userHome.css
    ├── directives
    │   └── custom-changes.directive.js
    ├── dragdrop
    │   ├── angular-dragdrop.min.js
    │   └── dragdropController.js
    ├── filters
    │   └── string.filter.js
    ├── index-async.html
    ├── index.html
    ├── mocks
    │   ├── categories.json
    │   ├── difficulty.json
    │   ├── menuMock.json
    │   ├── priority.json
    │   ├── problemArea.json
    │   ├── products.json
    │   ├── source_types.json
    │   ├── states.json
    │   ├── tags.json
    │   ├── targetTypes.json
    │   ├── teams.json
    │   ├── ticket_type.json
    │   ├── userType.json
    │   └── visibility.json
    ├── modal
    │   ├── assignment_modal.js
    │   ├── modal-about-us.html
    │   ├── modal-change-state.html
    │   ├── modal-faq.html
    │   ├── modal-form.html
    │   ├── modal-info-team.html
    │   ├── modal-info.html
    │   ├── modal-message.html
    │   ├── modal-privacy-policy.html
    │   ├── modal-terms-of-use.html
    │   ├── modal-ttl.html
    │   ├── modal-view-state-machine.html
    │   └── modal.js
    ├── multiselect
    │   ├── isteven-multi-select.css
    │   └── isteven-multi-select.js
    ├── package-lock.json
    ├── package.json
    ├── public
    │   └── images
    │       ├── avatar.png
    │       └── ticketsystem_background.jpg
    ├── services
    │   ├── menu.service.js
    │   ├── model.service.js
    │   ├── rest.service.js
    │   ├── storage.service.js
    │   └── utils.service.js
    └── templates
        ├── Admin
        │   ├── createStateMachine
        │   │   ├── createStateMachineCtrl.js
        │   │   └── stateMachine.html
        │   ├── createUser
        │   │   ├── createUser.html
        │   │   └── createUserController.js
        │   └── target
        │       ├── create
        │       │   ├── createTarget.html
        │       │   └── createTargetController.js
        │       ├── list
        │       │   ├── listTarget.html
        │       │   └── listTargetController.js
        │       └── update
        │           ├── modifyTarget.html
        │           └── modifyTargetController.js
        ├── Dashboard
        │   ├── dashboard.html
        │   └── dashboardController.js
        ├── Team
        │   ├── create
        │   │   ├── createTeam.html
        │   │   └── createTeamController.js
        │   └── list
        │       ├── readTeam.html
        │       └── readTeamController.js
        ├── Ticket
        │   ├── create
        │   │   ├── createTicket.html
        │   │   └── createTicketController.js
        │   └── list
        │       ├── readTicket.html
        │       └── readTicketController.js
        └── common
            ├── Login
            │   ├── Login.html
            │   └── Login.js
            ├── accountInfo
            │   ├── accountInfo.html
            │   └── accountInfo.js
            ├── home
            │   ├── home.js
            │   ├── homeAdmin.html
MacBook-Pro-di-Alessio:ISSSR - Ticketsystem-FE Pelosaccio$ tree -v --charset utf-8
.
├── LICENSE
├── README.md
└── app
    ├── app.css
    ├── app.js
    ├── app.router.js
    ├── css
    │   └── userHome.css
    ├── directives
    │   └── custom-changes.directive.js
    ├── dragdrop
    │   ├── angular-dragdrop.min.js
    │   └── dragdropController.js
    ├── filters
    │   └── string.filter.js
    ├── index-async.html
    ├── index.html
    ├── mocks
    │   ├── categories.json
    │   ├── difficulty.json
    │   ├── menuMock.json
    │   ├── priority.json
    │   ├── problemArea.json
    │   ├── products.json
    │   ├── source_types.json
    │   ├── states.json
    │   ├── tags.json
    │   ├── targetTypes.json
    │   ├── teams.json
    │   ├── ticket_type.json
    │   ├── userType.json
    │   └── visibility.json
    ├── modal
    │   ├── assignment_modal.js
    │   ├── modal-about-us.html
    │   ├── modal-change-state.html
    │   ├── modal-faq.html
    │   ├── modal-form.html
    │   ├── modal-info-team.html
    │   ├── modal-info.html
    │   ├── modal-message.html
    │   ├── modal-privacy-policy.html
    │   ├── modal-terms-of-use.html
    │   ├── modal-ttl.html
    │   ├── modal-view-state-machine.html
    │   └── modal.js
    ├── multiselect
    │   ├── isteven-multi-select.css
    │   └── isteven-multi-select.js
    ├── package-lock.json
    ├── package.json
    ├── public
    │   └── images
    │       ├── avatar.png
    │       └── ticketsystem_background.jpg
    ├── services
    │   ├── menu.service.js
    │   ├── model.service.js
    │   ├── rest.service.js
    │   ├── storage.service.js
    │   └── utils.service.js
    └── templates
        ├── Admin
        │   ├── createStateMachine
        │   │   ├── createStateMachineCtrl.js
        │   │   └── stateMachine.html
        │   ├── createUser
        │   │   ├── createUser.html
        │   │   └── createUserController.js
        │   └── target
        │       ├── create
        │       │   ├── createTarget.html
        │       │   └── createTargetController.js
        │       ├── list
        │       │   ├── listTarget.html
        │       │   └── listTargetController.js
        │       └── update
        │           ├── modifyTarget.html
        │           └── modifyTargetController.js
        ├── Dashboard
        │   ├── dashboard.html
        │   └── dashboardController.js
        ├── Team
        │   ├── create
        │   │   ├── createTeam.html
        │   │   └── createTeamController.js
        │   └── list
        │       ├── readTeam.html
        │       └── readTeamController.js
        ├── Ticket
        │   ├── create
        │   │   ├── createTicket.html
        │   │   └── createTicketController.js
        │   └── list
        │       ├── readTicket.html
        │       └── readTicketController.js
        └── common
            ├── Login
            │   ├── Login.html
            │   └── Login.js
            ├── accountInfo
            │   ├── accountInfo.html
            │   └── accountInfo.js
            ├── home
            │   ├── home.js
            │   ├── homeAdmin.html
            │   ├── homeCustomer.html
            │   ├── homeTeamCoordinator.html
            │   ├── homeTeamLeader.html
            │   └── homeTeamMember.html
            └── sidebarMenu
                ├── sidebar.html
                └── sidebarController.js
```

[local-navbar-url]: http://localhost:8000
[node]: https://nodejs.org/
[npm]: https://www.npmjs.org/
