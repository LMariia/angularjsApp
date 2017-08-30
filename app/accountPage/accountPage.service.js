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
};