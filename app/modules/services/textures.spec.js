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
            // get material - first time 
            testing_1.it("textures.get returns Promise for a material", (done) => {
                var promise = textures.get('sky_jpg', './images/sky.jpg');
                testing_1.expect(promise).toBeDefined();
                testing_1.expect(promise.then).toBeDefined();
                promise.then((material) => {
                    testing_1.expect(material).toBeDefined();
                    done();
                }).catch((e) => {
                    console.log(`reject: reason = ${e}`);
                    done();
                });
            });
            // get material - 2nd time 
            testing_1.it("textures.get resolves promise to a THREE.ShaderMaterial", (done) => {
                textures.get('action_skate_png', './images/css3d/action_skate.png').then((material) => {
                    testing_1.expect(material).toBeDefined();
                    testing_1.expect(material.visible).toBeDefined();
                    testing_1.expect(material.blendSrc).toBe(THREE.SrcAlphaFactor);
                    done();
                }).catch((e) => {
                    console.log(`reject: reason = ${e}`);
                    done();
                });
            });
            // get material - 3rd time
            testing_1.it("textures.get rejects promise for non-existent texture", (done) => {
                textures.get('x_png', './images/nonexistent.png').then((material) => {
                    testing_1.expect(material).not.toBeDefined();
                    console.log(`resolved to ${material}`);
                    done();
                }).catch((e) => {
                    testing_1.expect(e).toBeDefined();
                    console.log(`rejected for reason ${e}`);
                    console.dir(e);
                    done();
                });
            });
        }); //describe get
        testing_1.describe('preload', () => {
            testing_1.beforeEachProviders(() => [
                core_1.provide(textures_1.Textures, { useClass: textures_1.Textures })
            ]);
            testing_1.beforeEach(() => {
                textures = new textures_1.Textures(_config_1.config);
            });
            testing_1.it("ctor preload loads four textures as ShaderMaterials", (done) => {
                var i = 0, material, keys = Object.keys({ Escher_png: './images/Escher.png',
                    glad_png: './images/glad.png',
                    p2_jpg: './images/p2.jpg',
                    sky_jpg: './images/sky.jpg' });
                // wait for preload promise to resolve
                setTimeout(() => {
                    for (let t of Object.keys(textures.materials)) {
                        testing_1.expect(t).toEqual(keys[i++]);
                        console.log(`textures.materials[${t}] = ${textures.materials[t]}`);
                        material = textures.materials[t];
                        testing_1.expect(material.visible).toBeDefined();
                        testing_1.expect(material.blendSrc).toBe(THREE.SrcAlphaFactor);
                    }
                    done();
                }, 2000);
            });
        });
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
