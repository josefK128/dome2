//Cone leaf-component
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
    var cone, Cone;
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
            let Cone = class Cone {
                constructor(camera3d, transform3d, textures) {
                    cone = this;
                    cone.camera3d = camera3d;
                    cone.transform3d = transform3d;
                    cone.textures = textures;
                }
                mesh_geometry() {
                    console.log('Cone mesh_geometry()');
                    cone.geometry = new THREE.ConeGeometry(cone.radius, cone.height, cone.radiusSegments, cone.heightSegments, cone.openEnded);
                }
                basic_material() {
                    console.log('Cone basic_material()');
                    if (cone.phong) {
                        cone.material = new THREE.MeshPhongMaterial({
                            specular: cone.specular_color,
                            emissive: cone.emissive_color,
                            emissiveIntensity: cone.emissiveIntensity,
                            shininess: cone.shininess,
                            reflectivity: cone.reflectivity,
                            fog: cone.fog,
                            shading: THREE.FlatShading });
                    }
                    else {
                        cone.material = new THREE.MeshBasicMaterial({
                            color: cone.color,
                            transparent: cone.transparent,
                            opacity: cone.opacity,
                            wireframe: cone.wireframe });
                    }
                    // three.js blending<br>
                    // * NOTE! - brightening of opaque image intersections 
                    //   sometimes occurs (?!)<br>
                    //   This should NOT occur with the following:<br>
                    //   sphereMaterial.blendDst = THREE.OneMinusSrcAlphaFactor;
                    // * NOTE! brightening does occur with:<br>
                    //   sphereMaterial.blendDst = THREE.DstAlphaFactor;
                    cone.material.depthTest = false;
                    cone.material.blending = THREE.CustomBlending;
                    cone.material.blendSrc = THREE.SrcAlphaFactor;
                    //cone.material.blendDst = THREE.DstAlphaFactor;
                    cone.material.blendDst = THREE.OneMinusSrcAlphaFactor;
                    cone.material.blendEquation = THREE.AddEquation; // default
                    cone.realize();
                }
                texture_material(texture) {
                    var name = Object.keys(texture)[0], path = texture[name];
                    console.log('Cone texture_material()');
                    cone.textures.get(name, path).then((material) => {
                        cone.material = material;
                        cone.realize();
                    });
                }
                // write to THREE.js scene
                realize() {
                    console.log(`%%%% Cone realize: writing cone to scene`);
                    // create a webgl sphere-node
                    cone.o3d = new THREE.Mesh(cone.geometry, cone.material);
                    cone.o3d.material.side = THREE.DoubleSide;
                    // add the Object3d to the scene and store in Camera3d actors by id
                    cone.camera3d.addActorToScene(cone.id, cone.o3d, cone.pid);
                    // transform sphere - relative to parent in THREE.js scene !!!
                    cone.transform3d.apply(cone.transform, cone.o3d);
                }
                // ordered sequence of component lifecycle phase-transitions:
                //ngOnChanges() { console.log(`Cone ngOnChanges`); }
                ngOnInit() {
                    var form = cone.node['form'];
                    cone.pid = cone.parent['id'];
                    console.log(`%%%% ngOnInit - Cone id=${cone.id} pid=${cone.pid}`);
                    console.log(`node.form.type = ${form['type']}`);
                    //console.log(`node = ${cone.node}`);
                    //console.log(`parent = ${cone.parent}`);
                    // properties with defaults
                    cone.radius = form['radius'] || 5;
                    cone.height = form['height'] || 10;
                    cone.radiusSegments = form['radiusSegments'] || 8;
                    cone.heightSegments = form['heightSegments'] || 1;
                    cone.openEnded = form['openEnded'] || false;
                    cone.color = form['color'] || 'red';
                    cone.transparent = form['transparent'] || true;
                    cone.opacity = form['opacity'] || 1.0;
                    cone.wireframe = form['wireframe'] || false;
                    cone.phong = form['phong'] || false;
                    cone.emissive_color = form['emissive_color'] || 0x000000; // default undefined
                    cone.emissiveIntensity = form['emissiveIntensity'] || 1;
                    cone.specular_color = form['specular_color'] || 0xffffff; // default undefined
                    cone.shininess = form['shininess'] || 30;
                    cone.reflectivity = form['reflectivity'] || 1;
                    cone.fog = (form['fog'] === undefined ? true : form['fog']);
                    cone.texture = form['texture']; // default undefined
                    cone.transform = cone.node['transform'] || {};
                    // geometry
                    cone.mesh_geometry();
                    // material
                    if (cone.texture !== undefined) {
                        cone.texture_material(cone.texture);
                    }
                    else {
                        cone.basic_material();
                    }
                }
                ngAfterViewInit() { console.log(`Cone ngAfterViewInit`); }
            };
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Object)
            ], Cone.prototype, "model", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Object)
            ], Cone.prototype, "node", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Object)
            ], Cone.prototype, "parent", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', String)
            ], Cone.prototype, "id", void 0);
            Cone = __decorate([
                core_1.Component({
                    selector: 'cone',
                    template: ``
                }), 
                __metadata('design:paramtypes', [camera3d_1.Camera3d, transform3d_1.Transform3d, textures_1.Textures])
            ], Cone);
            exports_1("Cone", Cone);
        }
    }
});
