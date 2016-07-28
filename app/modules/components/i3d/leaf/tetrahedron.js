// Tetrahedron leaf-component
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
    var tetra, Tetrahedron;
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
            //instance
            let Tetrahedron = class Tetrahedron {
                constructor(camera3d, transform3d, textures) {
                    tetra = this;
                    tetra.camera3d = camera3d;
                    tetra.transform3d = transform3d;
                    tetra.textures = textures;
                }
                mesh_geometry() {
                    console.log('Tetrahedron mesh_geometry()');
                    tetra.geometry = new THREE.TetrahedronGeometry(tetra.radius, tetra.detail);
                }
                basic_material() {
                    console.log('Tetrahedron basic_material()');
                    if (tetra.phong) {
                        tetra.material = new THREE.MeshPhongMaterial({
                            specular: tetra.specular_color,
                            emissive: tetra.emissive_color,
                            emissiveIntensity: tetra.emissiveIntensity,
                            shininess: tetra.shininess,
                            reflectivity: tetra.reflectivity,
                            fog: tetra.fog,
                            shading: THREE.FlatShading });
                    }
                    else {
                        tetra.material = new THREE.MeshBasicMaterial({
                            color: tetra.color,
                            transparent: tetra.transparent,
                            opacity: tetra.opacity,
                            wireframe: tetra.wireframe });
                    }
                    // three.js blending<br>
                    // * NOTE! - brightening of opaque image intersections 
                    //   sometimes occurs (?!)<br>
                    //   This should NOT occur with the following:<br>
                    //   tetrahedronMaterial.blendDst = THREE.OneMinusSrcAlphaFactor;
                    // * NOTE! brightening does occur with:<br>
                    //   tetrahedronMaterial.blendDst = THREE.DstAlphaFactor;
                    tetra.material.depthTest = false;
                    tetra.material.blending = THREE.CustomBlending;
                    tetra.material.blendSrc = THREE.SrcAlphaFactor;
                    //tetra.material.blendDst = THREE.DstAlphaFactor;
                    tetra.material.blendDst = THREE.OneMinusSrcAlphaFactor;
                    tetra.material.blendEquation = THREE.AddEquation; // default
                    tetra.realize();
                }
                texture_material(texture) {
                    var name = Object.keys(texture)[0], path = texture[name];
                    console.log('Tetrahedron texture_material()');
                    tetra.textures.get(name, path).then((material) => {
                        tetra.material = material;
                        tetra.realize();
                    });
                }
                // write to THREE.js scene
                realize() {
                    console.log(`%%%% Tetrahedron realize: writing tetrahedron to scene`);
                    // create a webgl tetrahedron-node
                    tetra.o3d = new THREE.Mesh(tetra.geometry, tetra.material);
                    tetra.o3d.material.side = THREE.DoubleSide;
                    // add the Object3d to the scene and store in Camera3d actors by id
                    tetra.camera3d.addActorToScene(tetra.id, tetra.o3d, tetra.pid);
                    // transform tetrahedron - relative to parent in THREE.js scene !!!
                    tetra.transform3d.apply(tetra.transform, tetra.o3d);
                }
                // ordered sequence of component lifecycle phase-transitions:
                // ngOnChanges() { console.log(`Tetrahedron ngOnChanges`); }
                // calculate properties of tetrahedron from model on node
                ngOnInit() {
                    var form = tetra.node['form'];
                    tetra.pid = tetra.parent['id'];
                    console.log(`%%%% ngOnInit - Tetrahedron id=${tetra.id} pid=${tetra.pid}`);
                    console.log(`node.form.type = ${form['type']}`);
                    //console.log(`node = ${tetra.node}`);
                    //console.log(`parent = ${tetra.parent}`);
                    // properties with defaults
                    tetra.radius = form['radius'] || 10;
                    tetra.detail = form['detail'] || 0;
                    tetra.texture = form['texture']; // default undefined
                    tetra.color = form['color'] || 'red';
                    tetra.transparent = form['transparent'] || true;
                    tetra.opacity = form['opacity'] || 1.0;
                    tetra.wireframe = form['wireframe'] || false;
                    tetra.phong = form['phong'] || false;
                    tetra.emissive_color = form['emissive_color'] || 0x000000; // default undefined
                    tetra.emissiveIntensity = form['emissiveIntensity'] || 1;
                    tetra.specular_color = form['specular_color'] || 0xffffff; // default undefined
                    tetra.shininess = form['shininess'] || 30;
                    tetra.reflectivity = form['reflectivity'] || 1;
                    tetra.fog = (form['fog'] === undefined ? true : form['fog']);
                    tetra.transform = tetra.node['transform'] || {};
                    // geometry
                    tetra.mesh_geometry();
                    // material
                    if (tetra.texture !== undefined) {
                        tetra.texture_material(tetra.texture);
                    }
                    else {
                        tetra.basic_material();
                    }
                }
                //  ngDoCheck() { console.log(`Tetrahedron ngDoCheck`); }
                //  ngAfterContentInit() { console.log(`Tetrahedron ngAfterContentInit`); }
                //  ngAfterContentChecked() {console.log(`Tetrahedron ngAfterContentChecked`);}
                ngAfterViewInit() { console.log(`Tetrahedron ngAfterViewInit`); }
                //  ngAfterViewChecked() { console.log(`Tetrahedron ngAfterViewChecked`); }
                ngOnDestroy() { console.log(`Tetrahedron ngOnDestroy`); }
            };
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Object)
            ], Tetrahedron.prototype, "model", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Object)
            ], Tetrahedron.prototype, "node", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Object)
            ], Tetrahedron.prototype, "parent", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', String)
            ], Tetrahedron.prototype, "id", void 0);
            Tetrahedron = __decorate([
                core_1.Component({
                    selector: 'tetrahedron',
                    template: '',
                    providers: []
                }), 
                __metadata('design:paramtypes', [camera3d_1.Camera3d, transform3d_1.Transform3d, textures_1.Textures])
            ], Tetrahedron);
            exports_1("Tetrahedron", Tetrahedron);
        }
    }
});
