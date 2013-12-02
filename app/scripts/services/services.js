'use strict';

angular.module('drishtiSiteApp')
    .value('ReportsDefinitions', {
        fp: {
            name: "Family Planning Services",
            services: ['IUD', 'CONDOM', 'OCP', 'MALE_STERILIZATION', 'FEMALE_STERILIZATION']
        },
        anc: {
            name: "ANC Services",
            services: ['EARLY_ANC_REGISTRATIONS', 'ANC_REGISTRATIONS', 'SUB_TT', 'TT1', 'TT2', 'TTB', 'ANC4']
        },
        'pregnancy-outcomes': {
            name: "Pregnancy Outcomes",
            services: ['LIVE_BIRTH', 'STILL_BIRTH', 'EARLY_ABORTIONS', 'LATE_ABORTIONS', 'SPONTANEOUS_ABORTION', 'DELIVERY', 'INSTITUTIONAL_DELIVERY', 'D_HOM', 'D_SC', 'D_PHC', 'D_CHC', 'D_SDH', 'D_DH', 'D_PRI']
        },
        pnc: {
            name: "PNC Services",
            services: ['PNC3']
        },
        mortality: {
            name: "Mortality",
            services: ['ENM', 'NM', 'LNM', 'INFANT_MORTALITY', 'CHILD_MORTALITY', 'MMA', 'MMD', 'MMP', 'MM']
        },
        'child-services': {
            name: "Child Services",
            services: ['DPT3_OR_OPV3', 'DPT_BOOSTER_OR_OPV_BOOSTER', 'DPT_BOOSTER2', 'HEP', 'OPV', 'MEASLES', 'BCG', 'LBW', 'BF_POST_BIRTH', 'WEIGHED_AT_BIRTH', 'VIT_A_1', 'VIT_A_2']
        }
    })
    .service('Authentication', function ($rootScope, $cookieStore, BasicAuth, Base64) {
        return {
            authenticate: function (username, password) {
                BasicAuth.setCredentials(username, password);
            },
            logout: function () {
                BasicAuth.clearCredentials();
            },
            isAuthenticated: function () {
                var authdata = $cookieStore.get('authdata');
                if (!authdata)
                    return false;
                $rootScope.username = Base64.decode(authdata).split(':')[0];
                return true;
            }
        }
    })
    .service('BasicAuth', ['Base64', '$cookieStore', '$http', function (Base64, $cookieStore, $http) {
        // initialize to whatever is in the cookie, if anything
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $cookieStore.get('authdata');

        return {
            setCredentials: function (username, password) {
                var encoded = Base64.encode(username + ':' + password);
                $http.defaults.headers.common.Authorization = 'Basic ' + encoded;
                $cookieStore.put('authdata', encoded);
            },
            clearCredentials: function () {
                document.execCommand("ClearAuthenticationCache");
                $cookieStore.remove('authdata');
                $http.defaults.headers.common.Authorization = 'Basic ';
            }
        };
    }])
    .service('Base64', function () {
        var keyStr = 'ABCDEFGHIJKLMNOP' +
            'QRSTUVWXYZabcdef' +
            'ghijklmnopqrstuv' +
            'wxyz0123456789+/' +
            '=';
        return {
            encode: function (input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                do {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output +
                        keyStr.charAt(enc1) +
                        keyStr.charAt(enc2) +
                        keyStr.charAt(enc3) +
                        keyStr.charAt(enc4);
                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";
                } while (i < input.length);

                return output;
            },

            decode: function (input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
                var base64test = /[^A-Za-z0-9\+\/\=]/g;
                if (base64test.exec(input)) {
                    alert("There were invalid base64 characters in the input text.\n" +
                        "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                        "Expect errors in decoding.");
                }
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                do {
                    enc1 = keyStr.indexOf(input.charAt(i++));
                    enc2 = keyStr.indexOf(input.charAt(i++));
                    enc3 = keyStr.indexOf(input.charAt(i++));
                    enc4 = keyStr.indexOf(input.charAt(i++));

                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;

                    output = output + String.fromCharCode(chr1);

                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }

                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";

                } while (i < input.length);

                return output;
            }
        };
    })
    .service('BambooAPI', ['$q', '$rootScope', function ($q, $rootScope) {
        var applyScopeSafe = function (func) {
            if (!$rootScope.$$phase) {
                $rootScope.$apply(func);
            }
            else {
                func();
            }
        };

        return {
            queryInfo: function (dataset_id) {
                var deferred = $q.defer();
                var dataset = new bamboo.Dataset({id: dataset_id});
                dataset.query_info(function (result) {
                    applyScopeSafe(function () {
                        deferred.resolve(result);
                    });
                });
                return deferred.promise;
            },

            querySummary: function (dataset_id, select, group) {
                var deferred = $q.defer();
                var dataset = new bamboo.Dataset({id: dataset_id});
                dataset.summary(select, group, function (result) {
                    applyScopeSafe(function () {
                        deferred.resolve(result);
                    });
                });
                return deferred.promise;
            },

            queryCalculations: function (dataset_id) {
                var deferred = $q.defer();
                var dataset = new bamboo.Dataset({id: dataset_id});
                dataset.query_calculations(function (result) {
                    applyScopeSafe(function () {
                        deferred.resolve(result);
                    });
                });
                return deferred.promise;
            },

            addCalculation: function (dataset_id, name, formula) {
                var deferred = $q.defer();
                var dataset = new bamboo.Dataset({id: dataset_id});
                dataset.add_calculation(name, formula, function (result) {
                    applyScopeSafe(function () {
                        deferred.resolve(result);
                    });
                });
                return deferred.promise;
            },

            removeCalculation: function (dataset_id, name) {
                var dataset = new bamboo.Dataset({id: dataset_id});
                dataset.remove_calculation(name);
            }
        }
    }]);