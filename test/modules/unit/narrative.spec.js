System.register(['angular2/testing', 'angular2/core', '../../../app/modules/narrative.js', '../mocks/mf-config-mock.js'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var testing_1, testing_2, core_1, narrative_js_1, mf_config_mock_js_1;
    function main() {
        console.log('describe root-component narrative');
        testing_1.describe('narrative-spec', function () {
            var narrative;
            testing_2.beforeEachProviders(function () { return [
                core_1.provide(mf_config_mock_js_1.MF_CONFIG, { useValue: mf_config_mock_js_1.CONFIG })
            ]; });
            testing_2.beforeEach(function () {
                narrative = new narrative_js_1.Narrative(mf_config_mock_js_1.CONFIG);
            });
            testing_1.it('should be defined after construction from class Narrative', function () {
                testing_1.expect(narrative).toBeDefined();
            });
            testing_1.it('should retrieve a reference to the unique CONFIG object', function () {
                testing_1.expect(narrative.getConfig()).toBe(mf_config_mock_js_1.CONFIG);
            });
            testing_1.it('should use test mode', function () {
                var config = narrative.getConfig();
                testing_1.expect(config['test']).toBe(true);
            });
            testing_2.afterEach(function () {
                narrative = undefined;
            });
        }); //describe
    }
    exports_1("main", main);
    return {
        setters:[
            function (testing_1_1) {
                testing_1 = testing_1_1;
                testing_2 = testing_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (narrative_js_1_1) {
                narrative_js_1 = narrative_js_1_1;
            },
            function (mf_config_mock_js_1_1) {
                mf_config_mock_js_1 = mf_config_mock_js_1_1;
            }],
        execute: function() {
        }
    }
});
