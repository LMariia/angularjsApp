

module.exports = function ($state) {
    let model = this;
    model.openDetails = function (id) {
        $state.go('account', {id: id});
    };
    model.deleteAccount = function (index) {
        model.accounts.splice(index, 1);
    };
    model.create = function (account) {
        if (account.id) {
            model.accounts[model.selectedAccountIndex] = angular.copy(account);
        } else {
            account.id = model.accounts.length + 1;
            model.accounts.push(account);
        }
    };
};