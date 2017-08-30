'use strict';

module.exports = function () {
    let model = this;
    model.send = function () {
        if (model.accountFrom.$valid) {
            model.onCreate({newAccount: model.account});
            model.reset();
        } else {
            angular.forEach(model.accountFrom.$error,
                    (field) => angular.forEach(field, (errorField) => errorField.$setDirty()));
        }
    };
    model.reset = function () {
        model.accountFrom.$setPristine();
        model.accountFrom.$setUntouched();
    };
}