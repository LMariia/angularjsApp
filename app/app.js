'use strict';
require('angular-ui-router');
require('angular-ui-bootstrap');
const angular = require('angular');
const myApp = angular.module('myApp', ['ui.router', 'ui.bootstrap']);
// controllers
myApp.controller('AccountDetailedController', ['accountService', '$stateParams', '$state', require('./accountDetailed/accountDetailed.controller')]);
myApp.controller('AccountModalController', require('./accountModal/accountModal.controller'));
myApp.controller('AccountPageController', ['$state', require('./accountPage/accountPage.controller')]);
// components
myApp.component("accountModal", require('./accountModal/accountModal.component'));
myApp.component("accountPage", require('./accountPage/accountPage.component'));
myApp.component("accountDetailed", require('./accountDetailed/accountDetailed.component'));
// services
myApp.service("accountService", require('./accountPage/accountPage.service'));
// config
myApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('home', {
        url: '/',
        component: 'accountPage',
        caseInsensitiveMatch: true,
        resolve: {
            accounts: function (accountService) {
                return accountService.getAccounts();
            }
        }
    })
        .state('account', {
            url: '/account/:id',
            component: 'accountDetailed',
            caseInsensitiveMatch: true
        });
}]);
