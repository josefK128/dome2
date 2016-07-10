System.register(['@angular/core', '@angular/core/testing', '../configs/@config', './textures'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, testing_1, _config_1, textures_1;
    function main() {
        var textures;
        console.log('describe textures.get');
        testing_1.describe('get', () => {
            testing_1.beforeEachProviders(() => [
                core_1.provide(textures_1.Textures, { useClass: textures_1.Textures })
            ]);
            testing_1.beforeEach(() => {
                textures = new textures_1.Textures(_config_1.config);
            });
            //beforeEach((inject([Injector], (injector) => {  // fails
            //  textures = injector.get(Textures);
            //}));
            //beforeEach((inject([Textures], (t) => {         // fails
            //  textures = t;
            //}));
            console.log(`Textures = ${textures_1.Textures}`);
            // test
            //it('should exist', [Textures], (textures) => {
            testing_1.it('Textures should exist', () => {
                testing_1.expect(textures_1.Textures).toBeDefined();
            });
            testing_1.it('textures should exist', () => {
                testing_1.expect(textures).toBeDefined();
            });
            testing_1.it('Textures to be type function', () => {
                testing_1.expect(typeof textures_1.Textures).toBe('function');
            });
            testing_1.it('textures to be type object', () => {
                testing_1.expect(typeof textures).toBe('object');
            });
        }); //describe
    }
    exports_1("default", main);
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (testing_1_1) {
                testing_1 = testing_1_1;
            },
            function (_config_1_1) {
                _config_1 = _config_1_1;
            },
            function (textures_1_1) {
                textures_1 = textures_1_1;
            }],
        execute: function() {
            ;
        }
    }
});
