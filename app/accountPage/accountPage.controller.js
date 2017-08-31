

module.exports = function ($state) {
    let model = this;
    model.$onInit = function () {
        model.accountsPart = model.accounts.slice(0, model.numPerPage);
    };
    model.openDetails = function (id) {
        $state.go('account', {id: id});
    };
    model.deleteAccount = function (index) {
        model.accounts.splice(index, 1);
    };
    model.createAccount = function (account) {
        account.id = model.accounts.length + 1;
        model.accounts.push(account);
    };
    model.currentPage = 1;
    model.numPerPage = 10;
    model.maxSize = 10;
    model.setPage = function (pageNo) {
        model.currentPage = pageNo;
    };

    model.pageChanged = function () {
        let begin = ((model.currentPage - 1) * model.numPerPage);
        let end = begin + model.numPerPage;

        model.accountsPart = model.accounts.slice(begin, end);
    };
};