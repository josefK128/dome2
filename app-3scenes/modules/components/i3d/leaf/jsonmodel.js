//Jsonmodel leaf-component
// NOTE: leaf-components have empty-string template - NOT undefined! 
// input-property attribute values used by the leaf-component are declared 
// in <name ...></name> element(s) in the templates of composite 
// components (for exp. scenes)
// NOTE: the purpose of i3d leaf-components are to create webGL objects
// and via Camera3d add them to the webGL scene rendered in the '3D' canvas,
// and register the object as a scene 'actor' via Camera3d.addActorToScene(...)
System.register(['@angular/core', '../../../services/camera3d', '../../../services/transform3d', '../../../services/textures'], function(exports_1, context_1) {
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
    var core_1, camera3d_1, transform3d_1, textures_1;
    var jm, Jsonmodel;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (camera3d_1_1) {
                camera3d_1 = camera3d_1_1;
            },
            function (transform3d_1_1) {
                transform3d_1 = transform3d_1_1;
            },
            function (textures_1_1) {
                textures_1 = textures_1_1;
            }],
        execute: function() {
            // protect execution context during load
            let Jsonmodel_1;
            let Jsonmodel = Jsonmodel_1 = class Jsonmodel {
                constructor(camera3d, transform3d, textures) {
                    jm = this;
                    this.camera3d = camera3d;
                    this.transform3d = transform3d;
                    this.textures = textures;
                }
                mesh_geometry(jsonmodel) {
                    var loader = new THREE.ObjectLoader(THREE.DefaultLoadingManager), name = Object.keys(jsonmodel)[0], path = jsonmodel[name];
                    console.log('Jsonmodel mesh_geometry()');
                    console.log(`loader = ${loader} loader.load path = ${path}`);
                    return new Promise(function (resolve, reject) {
                        // if model is cached return it
                        if (Jsonmodel_1.MODELS[name] !== undefined) {
                            console.log(`cached model = ${name}`);
                            resolve(Jsonmodel_1.MODELS[name]);
                        }
                        // load object and possibly material(s)
                        console.log(`${name} not cached`);
                        let onload = (obj, materials) => {
                            console.log(`ldr.onload: typeof loaded obj = ${typeof obj}`);
                            if (materials === undefined) {
                                resolve(obj); // full model
                            }
                            else {
                                // obj is geometry only
                                jm.geometry = obj;
                                // prepare possible MultiMaterial
                                jm.material = materials ? new THREE.MultiMaterial(materials) : null;
                                resolve();
                            }
                        };
                        let progress = (p) => {
                            console.log(`${100.0 * p.loaded / p.total}% loaded`);
                        };
                        let onerror = (e) => {
                            console.log(`loader.onerror: ${e}`);
                            reject(e);
                        };
                        loader.load(path, onload, progress, onerror);
                    }); //return new Promise
                }
                basic_material() {
                    console.log(`Jsonmodel basic_material() phong = ${jm.phong}`);
                    if (jm.phong) {
                        //      jm.material = new THREE.MeshPhongMaterial({
                        //        emissive: jm.emissive_color,
                        //        emissiveIntensity: jm.emissiveIntensity,
                        //        specular: jm.specular_color,
                        //        shininess: jm.shininess, 
                        //        reflectivity: jm.reflectivity,
                        //        shading:true,
                        //        fog:true});
                        jm.material = new THREE.MeshPhongMaterial({
                            color: 0xdddddd,
                            specular: 0x009900,
                            shininess: 30,
                            shading: THREE.FlatShading });
                    }
                    else {
                        jm.material = new THREE.MeshBasicMaterial({});
                    }
                    console.log(`Jsonmodel basic_material() jm.material = ${jm.material}`);
                    // common material properties
                    jm.material.color = jm.color;
                    jm.material.wireframe = jm.wireframe;
                    jm.material.transparent = jm.transparent;
                    jm.material.opacity = jm.opacity;
                    //jm.material.shading = THREE.FlatShading;
                    // three.js blending<br>
                    // * NOTE! - brightening of opaque image intersections 
                    //   sometimes occurs (?!)<br>
                    //   This should NOT occur with the following:<br>
                    //   sphereMaterial.blendDst = THREE.OneMinusSrcAlphaFactor;
                    // * NOTE! brightening does occur with:<br>
                    //   sphereMaterial.blendDst = THREE.DstAlphaFactor;
                    jm.material.depthTest = false;
                    jm.material.blending = THREE.CustomBlending;
                    jm.material.blendSrc = THREE.SrcAlphaFactor;
                    //jm.material.blendDst = THREE.DstAlphaFactor;
                    jm.material.blendDst = THREE.OneMinusSrcAlphaFactor;
                    jm.material.blendEquation = THREE.AddEquation; // default
                    jm.realize();
                }
                texture_material(texture) {
                    var name = Object.keys(texture)[0], path = texture[name];
                    console.log('Jsonmodel texture_material()');
                    jm.textures.get(name, path).then((material) => {
                        jm.material = material;
                        jm.realize();
                    });
                }
                // write to THREE.js scene
                realize(model) {
                    console.log(`%%%% Jsonmodel realize: writing jsonmodel to scene`);
                    console.log(`model = ${model}`);
                    // if cached model use it, else create new model and cache it
                    if (model === undefined) {
                        let name = Object.keys(jm.jsonmodel)[0];
                        console.log(`realize: name = ${name}`);
                        // create a webgl sphere-node
                        jm.o3d = new THREE.Mesh(jm.geometry, jm.material);
                        jm.o3d.material.side = THREE.DoubleSide;
                        Jsonmodel_1.MODELS[name] = jm.o3d; // cache
                    }
                    else {
                        jm.o3d = model; // cached model
                    }
                    console.log(`realize: jm.o3d = ${jm.o3d}`);
                    // add the Object3d to the scene and store in Camera3d actors by id
                    jm.camera3d.addActorToScene(jm.id, jm.o3d, jm.pid);
                    // transform sphere - relative to parent in THREE.js scene !!!
                    jm.transform3d.apply(jm.transform, jm.o3d);
                }
                // ordered sequence of component lifecycle phase-transitions:
                //ngOnChanges() { console.log(`Jsonmodel ngOnChanges`); }
                ngOnInit() {
                    var form = jm.node['form'];
                    jm.pid = jm.parent['id'];
                    console.log(`%%%% ngOnInit - Jsonmodel id=${jm.id} pid=${jm.pid}`);
                    console.log(`node.form.type = ${form['type']}`);
                    //console.log(`node = ${jm.node}`);
                    //console.log(`parent = ${jm.parent}`);
                    // properties with defaults - 
                    jm.phong = form['phong'] || true;
                    jm.jsonmodel = form['jsonmodel']; // default undefined
                    jm.color = form['color'] || 0xffffff; // default undefined
                    jm.emissive_color = form['emissive_color'] || 0x000000; // default undefined
                    jm.emissiveIntensity = form['emissiveIntensity'] || 1;
                    jm.specular_color = form['specular_color'] || 0xffffff; // default undefined
                    jm.shininess = form['shininess'] || 30;
                    jm.reflectivity = form['reflectivity'] || 1;
                    jm.transparent = form['transparent'] || true;
                    jm.opacity = form['opacity'] || 1.0;
                    jm.wireframe = form['wireframe'] || false;
                    jm.texture = form['texture']; // default undefined
                    jm.transform = jm.node['transform'] || {};
                    // geometry
                    jm.mesh_geometry(jm.jsonmodel).then((model) => {
                        console.log(`mesh_geom resolve: model = ${model}`);
                        //      if(model !== undefined){
                        //        console.log('calling jm.realize()');
                        //        jm.realize(model);
                        //      }else{
                        console.log(`jm.texture = ${jm.texture}`);
                        if (jm.texture !== undefined) {
                            console.log(`jm.texture defined`);
                            for (let p of Object.keys(jm.texture)) {
                                console.log(`jm.texture has property ${p} val=${jm.texture[p]}`);
                            }
                            jm.texture_material(jm.texture);
                        }
                        else {
                            console.log(`jm.texture undefined`);
                            jm.basic_material();
                        }
                        //    }//model?
                    }).catch((e) => {
                        console.log(`reject: reason = ${e}`);
                    });
                }
                ngAfterViewInit() { console.log(`Jsonmodel ngAfterViewInit`); }
            };
            Jsonmodel.MODELS = {}; // cache for previously fetched JSON-models
            __decorate([
                // cache for previously fetched JSON-models
                core_1.Input(), 
                __metadata('design:type', Object)
            ], Jsonmodel.prototype, "model", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Object)
            ], Jsonmodel.prototype, "node", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Object)
            ], Jsonmodel.prototype, "parent", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', String)
            ], Jsonmodel.prototype, "id", void 0);
            Jsonmodel = Jsonmodel_1 = __decorate([
                core_1.Component({
                    selector: 'jsonmodel',
                    template: ``
                }), 
                __metadata('design:paramtypes', [camera3d_1.Camera3d, transform3d_1.Transform3d, textures_1.Textures])
            ], Jsonmodel);
            exports_1("Jsonmodel", Jsonmodel);
        }
    }
});
