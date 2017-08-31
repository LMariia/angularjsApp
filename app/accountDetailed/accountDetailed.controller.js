'use strict';

function renderChart(activities) {
    let data = [];
    angular.forEach(activities,
            (item) => data.push([Date.parse(item.date), item.amountOfActions]));
    Highcharts.stockChart('chart1', {
        rangeSelector: {
            selected: 1
        },
        title: {
            text: 'Account Activity'
        },
        series: [{
            name: 'Amount Of Actions',
            data: data,
            tooltip: {
            }
        }]
    });
}

module.exports = function (accountService, $stateParams, $state) {
    let model = this;
    model.$onInit = function () {
        accountService.getAccount($stateParams.id)
            .then(function (value) {
                model.account = value;
                renderChart(model.account.activities);
            });
    };
    model.delete = function () {
        $state.go('home');
    };
    model.setAccount = function () {
        model.currentAccount = angular.copy(model.account);
    };
    model.updateAccount = function (account) {
        accountService.updateAccount(account)
            .then(function () {
                $state.reload();
            });
    };
}
