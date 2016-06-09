System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1;
    var MF_CONFIG, CONFIG;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            exports_1("MF_CONFIG", MF_CONFIG = new core_1.OpaqueToken('mf-config'));
            ;
            exports_1("CONFIG", CONFIG = {
                test: true,
                hostG: 'localhost',
                portG: 8080,
                hostP: 'localhost',
                portP: 8081,
                hostL: 'localhost',
                portL: 8082,
                period: 5000,
                cbg: function (o) { o = o; },
                cbp: function (o) { o = o; }
            });
        }
    }
});
