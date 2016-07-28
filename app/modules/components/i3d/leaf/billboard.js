//Billboard leaf-component
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
    var bb, Billboard;
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
            // instance
            let Billboard = class Billboard {
                constructor(camera3d, transform3d, textures) {
                    bb = this;
                    bb.camera3d = camera3d;
                    bb.transform3d = transform3d;
                    bb.textures = textures;
                }
                mesh_geometry() {
                    console.log('Billboard mesh_geometry()');
                    bb.geometry = new THREE.BoxGeometry(bb.width, bb.height, 0.0, bb.widthSegments, bb.heightSegments, 1);
                }
                basic_material() {
                    console.log('Billboard basic_material()');
                    if (bb.phong) {
                        bb.material = new THREE.MeshPhongMaterial({
                            specular: bb.specular_color,
                            emissive: bb.emissive_color,
                            emissiveIntensity: bb.emissiveIntensity,
                            shininess: bb.shininess,
                            reflectivity: bb.reflectivity,
                            fog: bb.fog,
                            shading: THREE.FlatShading });
                    }
                    else {
                        bb.material = new THREE.MeshBasicMaterial({
                            color: bb.color,
                            transparent: bb.transparent,
                            opacity: bb.opacity,
                            wireframe: bb.wireframe });
                    }
                    // three.js blending<br>
                    // * NOTE! - brightening of opaque image intersections 
                    //   sometimes occurs (?!)<br>
                    //   This should NOT occur with the following:<br>
                    //   sphereMaterial.blendDst = THREE.OneMinusSrcAlphaFactor;
                    // * NOTE! brightening does occur with:<br>
                    //   sphereMaterial.blendDst = THREE.DstAlphaFactor;
                    bb.material.depthTest = false;
                    bb.material.blending = THREE.CustomBlending;
                    bb.material.blendSrc = THREE.SrcAlphaFactor;
                    //bb.material.blendDst = THREE.DstAlphaFactor;
                    bb.material.blendDst = THREE.OneMinusSrcAlphaFactor;
                    bb.material.blendEquation = THREE.AddEquation; // default
                    bb.realize();
                }
                texture_material(texture) {
                    var name = Object.keys(texture)[0], path = texture[name];
                    console.log('Billboard texture_material()');
                    bb.textures.get(name, path).then((material) => {
                        bb.material = material;
                        bb.realize();
                    });
                }
                // write to THREE.js scene
                realize() {
                    console.log(`%%%% Billboard realize: writing billboard to scene`);
                    // create a webgl sphere-node
                    bb.o3d = new THREE.Mesh(bb.geometry, bb.material);
                    bb.o3d.material.side = THREE.SingleSide;
                    // add the Object3d to the scene and store in Camera3d actors by id
                    //bb.camera3d.addActorToScene(bb.id, bb.o3d, bb.pid);
                    bb.camera3d.addBillboardToScene(bb.id, bb.o3d, bb.pid);
                    // transform sphere - relative to parent in THREE.js scene !!!
                    bb.transform3d.apply(bb.transform, bb.o3d);
                }
                // ordered sequence of component lifecycle phase-transitions:
                //ngOnChanges() { console.log(`Billboard ngOnChanges`); }
                ngOnInit() {
                    var form = bb.node['form'];
                    bb.pid = bb.parent['id'];
                    console.log(`%%%% ngOnInit - Billboard id=${bb.id} pid=${bb.pid}`);
                    console.log(`node.form.type = ${form['type']}`);
                    //console.log(`node = ${bb.node}`);
                    //console.log(`parent = ${bb.parent}`);
                    // properties with defaults
                    bb.width = form['width'] || 10;
                    bb.height = form['height'] || 10;
                    bb.widthSegments = form['widthSegments'] || 1;
                    bb.heightSegments = form['heightSegments'] || 1;
                    bb.color = form['color'] || 'red';
                    bb.transparent = form['transparent'] || true;
                    bb.opacity = form['opacity'] || 1.0;
                    bb.wireframe = form['wireframe'] || false;
                    bb.texture = form['texture']; // default undefined
                    bb.transform = bb.node['transform'] || {};
                    bb.phong = form['phong'] || false;
                    bb.emissive_color = form['emissive_color'] || 0x000000; // default undefined
                    bb.emissiveIntensity = form['emissiveIntensity'] || 1;
                    bb.specular_color = form['specular_color'] || 0xffffff; // default undefined
                    bb.shininess = form['shininess'] || 30;
                    bb.reflectivity = form['reflectivity'] || 1;
                    bb.fog = (form['fog'] === undefined ? true : form['fog']);
                    // geometry
                    bb.mesh_geometry();
                    // material
                    if (bb.texture !== undefined) {
                        bb.texture_material(bb.texture);
                    }
                    else {
                        bb.basic_material();
                    }
                }
                ngAfterViewInit() { console.log(`Billboard ngAfterViewInit`); }
            };
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Object)
            ], Billboard.prototype, "model", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Object)
            ], Billboard.prototype, "node", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Object)
            ], Billboard.prototype, "parent", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', String)
            ], Billboard.prototype, "id", void 0);
            Billboard = __decorate([
                core_1.Component({
                    selector: 'billboard',
                    template: ``
                }), 
                __metadata('design:paramtypes', [camera3d_1.Camera3d, transform3d_1.Transform3d, textures_1.Textures])
            ], Billboard);
            exports_1("Billboard", Billboard);
        }
    }
});
