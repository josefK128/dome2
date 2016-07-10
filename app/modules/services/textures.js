System.register(['@angular/core', '../configs/@config', '../views/webgl-defs'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, _config_1, webgl_defs_1, webgl_defs_2, webgl_defs_3, webgl_defs_4, webgl_defs_5, webgl_defs_6;
    var loader, createShaderMaterial, Textures;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_config_1_1) {
                _config_1 = _config_1_1;
            },
            function (webgl_defs_1_1) {
                webgl_defs_1 = webgl_defs_1_1;
                webgl_defs_2 = webgl_defs_1_1;
                webgl_defs_3 = webgl_defs_1_1;
                webgl_defs_4 = webgl_defs_1_1;
                webgl_defs_5 = webgl_defs_1_1;
                webgl_defs_6 = webgl_defs_1_1;
            }],
        execute: function() {
            // texture loader and ShaderMaterial factory function
            loader = new THREE.TextureLoader(), createShaderMaterial = (texture, _fshader) => {
                var material, fshader = _fshader || webgl_defs_1.fsh;
                // resolution filtering
                texture.magFilter = THREE.LinearFilter;
                texture.minFilter = THREE.LinearMipMapLinearFilter;
                // assuming you want the texture to repeat in both directions:<br>
                // how many times to repeat in each direction - default is (1,1),
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                // shaderMaterial<br>
                // = new THREE.MeshLambertMaterial({ map : texture });<br>
                // color is defined by one float (!?) => f f f ? so 1.0 => white ?
                material = new THREE.ShaderMaterial({
                    uniforms: {
                        color: { type: 'f', value: 1.0 },
                        map: { type: 't', value: texture }
                    },
                    vertexShader: webgl_defs_3.vsh,
                    fragmentShader: fshader,
                    transparent: true
                });
                // three.js blending<br>
                // NOTE! - brightening of opaque image intersections 
                // sometimes occurs (?!)
                // This should NOT occur with the following:<br>
                // material.blendDst = THREE.OneMinusSrcAlphaFactor;<br>
                // NOTE! brightening does occur with:
                //material.blendDst = THREE.DstAlphaFactor;
                //
                //material.depthTest = false;
                //material.blending = THREE.CustomBlending;
                material.blendSrc = THREE.SrcAlphaFactor; // default
                //material.blendDst = THREE.DstAlphaFactor;
                material.blendDst = THREE.OneMinusSrcAlphaFactor; // default
                material.blendEquation = THREE.AddEquation; // default
                return material;
            };
            let Textures = class Textures {
                // NOTE: all templates must be listed and have defined ({}) sets of textures
                constructor(cfg) {
                    this.config = cfg;
                    this.webgl_defs = { fsh: webgl_defs_1.fsh, fsh_filter: webgl_defs_2.fsh_filter, vsh: webgl_defs_3.vsh,
                        Escher_png: webgl_defs_4.Escher_png, glad_png: webgl_defs_5.glad_png, sky_jpg: webgl_defs_6.sky_jpg };
                    this.textures = {};
                } //ctor
                // if needed,create array of keys from dotted path string
                // path can be simple string such as 'i3d'
                // or a punctuated object-branch path such as 'i3d.space.texture1'
                // or an array of object-branch keys such as ['i3d', 'space', 'texture1']
                branch(path) {
                    var keys, branch = this.textures;
                    console.log(`branch():path = ${path}`);
                    if (!Array.isArray(path)) {
                        keys = (path.includes('.') ? path.split('.') : [path]);
                        //keys = (pathstring.indexOf('.') > -1 ? pathstring.split('.') : [pathstring]);
                        console.log(`Array.isArray(keys) = ${Array.isArray(keys)}`);
                        console.log(`keys = ${keys}`);
                    }
                    else {
                        keys = path;
                    }
                    // operate using array of branch keys
                    for (let s of keys) {
                        // ignore key = ''
                        if (s.length > 0) {
                            console.log(`branch: key = ${s}  branch = ${branch} branch[${s}] = ${branch[s]}`);
                            branch = (branch[s] ? branch[s] : undefined);
                            if (branch === undefined) {
                                console.log(`!!!!!!!!!!!!!!!!!! branch from ${name} is undefined!`);
                                return undefined;
                            }
                        }
                    }
                    return branch;
                }
                // example: get('texture6')
                // example: get(['texture6'])
                get(name, path) {
                    var material, resolve, reject;
                    if (this.textures[name] === undefined) {
                        let onload = (texture) => {
                            // prepare ShaderMaterial
                            material = createShaderMaterial(texture);
                            // cache for subsequent requests and return
                            this.textures[name] = material;
                            resolve(material);
                        };
                        let progress = (p) => {
                            console.log(`${p.loaded / p.total}% loaded`);
                        };
                        let onerror = (e) => {
                            reject(e);
                        };
                        return new Promise((resolve, reject) => {
                            loader.load(path, onload, progress, onerror);
                        });
                    }
                    else {
                        return Promise.resolve(this.branch(name));
                    }
                }
                // example: add('texture6', {...})
                add(path, texturename, texture) {
                    var branch = this.branch(path);
                    if (branch) {
                        branch[texturename] = texture;
                        return true;
                    }
                    return undefined;
                }
                // example: remove('texture6')
                // example: remove(['texture6']])
                remove(path) {
                    var branch = this.branch(path);
                    if (branch) {
                        branch = undefined;
                        return true;
                    }
                    return undefined;
                }
            };
            Textures = __decorate([
                core_1.Injectable(),
                __param(0, core_1.Inject(_config_1.CONFIG)), 
                __metadata('design:paramtypes', [Object])
            ], Textures);
            exports_1("Textures", Textures);
        }
    }
});
