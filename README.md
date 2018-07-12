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
//TODO DA CAMBAIRE QUANDO è FINITO
.
├── LICENSE
├── README.md
├── app
│   ├── GruntFile.js
│   ├── app.css
│   ├── app.js
│   ├── app.router.js
│   ├── components
│   │   └── version
│   │       ├── interpolate-filter.js
│   │       ├── interpolate-filter_test.js
│   │       ├── version-directive.js
│   │       ├── version-directive_test.js
│   │       ├── version.js
│   │       └── version_test.js
│   ├── css
│   │   ├── ui_select.css
│   │   └── userHome.css
│   ├── directives
│   │   └── custom-changes.directive.js
│   ├── docs
│   │   ├── dgeni-example.js
│   │   └── templates
│   │       └── common.template.html
│   ├── dragdrop
│   │   ├── angular-dragdrop.min.js
│   │   └── dragdropController.js
│   ├── filters
│   │   └── string.filter.js
│   ├── index-async.html
│   ├── index.html
│   ├── mocks
│   │   ├── categories.json
│   │   ├── difficulty.json
│   │   ├── menuMock.json
│   │   ├── priority.json
│   │   ├── problemArea.json
│   │   ├── products.json
│   │   ├── source_types.json
│   │   ├── states.json
│   │   ├── tags.json
│   │   ├── targetTypes.json
│   │   ├── teams.json
│   │   ├── ticket_type.json
│   │   ├── userType.json
│   │   └── visibility.json
│   ├── modal
│   │   ├── assignment_modal.js
│   │   ├── modal-change-state.html
│   │   ├── modal-faq.html
│   │   ├── modal-form.html
│   │   ├── modal-info-team.html
│   │   ├── modal-info.html
│   │   ├── modal-message.html
│   │   ├── modal-privacy-policy.html
│   │   ├── modal-terms-of-use.html
│   │   ├── modal-ttl.html
│   │   ├── modal-view-state-machine.html
│   │   ├── modal-who-are-we.html
│   │   └── modal.js
│   ├── multiselect
│   │   ├── isteven-multi-select.css
│   │   └── isteven-multi-select.js
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   └── images
│   │       ├── avatar.png
│   │       ├── state_machine
│   │       │   └── State_Machines.jpg
│   │       └── ticketsystem_background.jpg
│   ├── services
│   │   ├── menu.service.js
│   │   ├── model.service.js
│   │   ├── rest.service.js
│   │   ├── storage.service.js
│   │   └── utils.service.js
│   └── templates
│       ├── Admin
│       │   ├── createUser
│       │   │   ├── createUser.html
│       │   │   └── createUserController.js
│       │   └── target
│       │       ├── createTarget.html
│       │       ├── createTargetController.js
│       │       ├── listTarget.html
│       │       ├── listTargetController.js
│       │       ├── modifyTarget.html
│       │       └── modifyTargetController.js
│       ├── Customer
│       │   └── create
│       │       ├── createCustomer.html
│       │       └── createCustomerController.js
│       ├── Dashboard
│       │   ├── dashboard.html
│       │   └── dashboardController.js
│       ├── Team
│       │   ├── createTeam.html
│       │   ├── createTeamController.js
│       │   ├── readTeam.html
│       │   └── readTeamController.js
│       ├── Ticket
│       │   ├── create
│       │   │   ├── createTicket.html
│       │   │   └── createTicketController.js
│       │   └── list
│       │       ├── readTicket.html
│       │       └── readTicketController.js
│       └── common
│           ├── Login
│           │   ├── Login.html
│           │   └── Login.js
│           ├── accountInfo
│           │   ├── accountInfo.html
│           │   └── accountInfo.js
│           ├── home
│           │   ├── home.js
│           │   ├── homeAdmin.html
│           │   ├── homeCustomer.html
│           │   ├── homeTeamCoordinator.html
│           │   ├── homeTeamLeader.html
│           │   └── homeTeamMember.html
│           └── sidebarMenu
│               ├── sidebar.html
│               └── sidebarController.js
├── e2e-tests
│   ├── protractor.conf.js
│   └── scenarios.js
├── karma.conf.js
└── package-lock.json
```

[local-navbar-url]: http://localhost:8000
[node]: https://nodejs.org/
[npm]: https://www.npmjs.org/
