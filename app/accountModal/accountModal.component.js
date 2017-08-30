'use strict';

module.exports = {
    templateUrl: 'accountModal/accountModal.html',
    controller: 'AccountModalController',
    controllerAs: "model",
    bindings: {
        account: '<',
        onCreate: '&'
    }
};