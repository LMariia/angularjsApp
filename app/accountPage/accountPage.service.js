'use strict';
module.exports = function ($http, $q, $sce) {
    "ngInject";
    this.getAccounts = function () {
        let trustedUrl = $sce.trustAsResourceUrl(API_URL + '/account');
        return $http.get(trustedUrl).then(
            (response) => response.data.items,
            (response) => $q.reject(response.status)
        );
    };
    this.getAccount = function (id) {
        let trustedUrl = $sce.trustAsResourceUrl(API_URL + '/account/' + id);
        return $http.get(trustedUrl).then(
            (response) => response.data,
            (response) => $q.reject(response.status)
        );
    };
    this.updateAccount = function (account) {
        let trustedUrl = $sce.trustAsResourceUrl(API_URL + '/account/' + account.id);
        return $http.put(trustedUrl, account).then(
            (response) => response.data,
            (response) => $q.reject(response.status)
        );
    };
};