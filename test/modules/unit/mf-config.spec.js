System.register(['angular2/testing', '../../../app/modules/mf-config.js'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var testing_1, mf_config_js_1;
    function main() {
        console.log('describe configuration-component mf-config');
        testing_1.describe('mf-config-spec', function () {
            testing_1.beforeEachProviders(function () { return []; });
            // test
            testing_1.it('should define property test', function () {
                testing_1.expect(mf_config_js_1.CONFIG['test']).toBeDefined();
            });
            // Genotype
            testing_1.it('should define property hostG', function () {
                testing_1.expect(mf_config_js_1.CONFIG['hostG']).toBeDefined();
            });
            testing_1.it('CONFIG["hostG"] value should be type string', function () {
                testing_1.expect(typeof mf_config_js_1.CONFIG['hostG']).toEqual('string');
            });
            testing_1.it('should define property portG', function () {
                testing_1.expect(mf_config_js_1.CONFIG['portG']).toBeDefined();
            });
            testing_1.it('CONFIG["portG"] value should be type number', function () {
                testing_1.expect(typeof mf_config_js_1.CONFIG['portG']).toEqual('number');
            });
            // Phenotype
            testing_1.it('should define property hostP', function () {
                testing_1.expect(mf_config_js_1.CONFIG['hostP']).toBeDefined();
            });
            testing_1.it('CONFIG["hostP"] value should be type string', function () {
                testing_1.expect(typeof mf_config_js_1.CONFIG['hostP']).toEqual('string');
            });
            testing_1.it('should define property portP', function () {
                testing_1.expect(mf_config_js_1.CONFIG['portP']).toBeDefined();
            });
            testing_1.it('CONFIG["portP"] value should be type number', function () {
                testing_1.expect(typeof mf_config_js_1.CONFIG['portP']).toEqual('number');
            });
            // Log
            testing_1.it('should define property hostL', function () {
                testing_1.expect(mf_config_js_1.CONFIG['hostL']).toBeDefined();
            });
            testing_1.it('CONFIG["hostL"] value should be type string', function () {
                testing_1.expect(typeof mf_config_js_1.CONFIG['hostL']).toEqual('string');
            });
            testing_1.it('should define property portL', function () {
                testing_1.expect(mf_config_js_1.CONFIG['portL']).toBeDefined();
            });
            testing_1.it('CONFIG["portL"] value should be type number', function () {
                testing_1.expect(typeof mf_config_js_1.CONFIG['portL']).toEqual('number');
            });
            // period
            testing_1.it('should define property period', function () {
                testing_1.expect(mf_config_js_1.CONFIG['period']).toBeDefined();
            });
            testing_1.it('CONFIG["period"] value should be type number', function () {
                testing_1.expect(typeof mf_config_js_1.CONFIG['period']).toEqual('number');
            });
            // callback-g
            testing_1.it('should define property cbg', function () {
                testing_1.expect(mf_config_js_1.CONFIG['cbg']).toBeDefined();
            });
            testing_1.it('CONFIG["cbg"] value should be type function', function () {
                testing_1.expect(typeof mf_config_js_1.CONFIG['cbg']).toEqual('function');
            });
            // callback-p
            testing_1.it('should define property cbp', function () {
                testing_1.expect(mf_config_js_1.CONFIG['cbp']).toBeDefined();
            });
            testing_1.it('CONFIG["cbp"] value should be type function', function () {
                testing_1.expect(typeof mf_config_js_1.CONFIG['cbp']).toEqual('function');
            });
        }); //describe
    }
    exports_1("main", main);
    return {
        setters:[
            function (testing_1_1) {
                testing_1 = testing_1_1;
            },
            function (mf_config_js_1_1) {
                mf_config_js_1 = mf_config_js_1_1;
            }],
        execute: function() {
        }
    }
});
//export interface Config {
//  hostG: string,
//  portG: number,
//  hostP: string,
//  portP: number,
//  hostL: string,
//  portL: number,
//  period: number,
//  cbg: Function,
//  cbp: Function
//};
