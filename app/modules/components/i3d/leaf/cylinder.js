//Cylinder leaf-component
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
    var cyl, Cylinder;
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
            let Cylinder = class Cylinder {
                constructor(camera3d, transform3d, textures) {
                    cyl = this;
                    cyl.camera3d = camera3d;
                    cyl.transform3d = transform3d;
                    cyl.textures = textures;
                }
                mesh_geometry() {
                    console.log('Cylinder mesh_geometry()');
                    cyl.geometry = new THREE.CylinderGeometry(cyl.radiusTop, cyl.radiusBottom, cyl.height, cyl.radiusSegments, cyl.heightSegments, cyl.openEnded);
                }
                basic_material() {
                    console.log('Cylinder basic_material()');
                    if (cyl.phong) {
                        cyl.material = new THREE.MeshPhongMaterial({
                            specular: cyl.specular_color,
                            emissive: cyl.emissive_color,
                            emissiveIntensity: cyl.emissiveIntensity,
                            shininess: cyl.shininess,
                            reflectivity: cyl.reflectivity,
                            fog: cyl.fog,
                            shading: THREE.FlatShading });
                    }
                    else {
                        cyl.material = new THREE.MeshBasicMaterial({
                            color: cyl.color,
                            transparent: cyl.transparent,
                            opacity: cyl.opacity,
                            wireframe: cyl.wireframe });
                    }
                    // three.js blending<br>
                    // * NOTE! - brightening of opaque image intersections 
                    //   sometimes occurs (?!)<br>
                    //   This should NOT occur with the following:<br>
                    //   sphereMaterial.blendDst = THREE.OneMinusSrcAlphaFactor;
                    // * NOTE! brightening does occur with:<br>
                    //   sphereMaterial.blendDst = THREE.DstAlphaFactor;
                    cyl.material.depthTest = false;
                    cyl.material.blending = THREE.CustomBlending;
                    cyl.material.blendSrc = THREE.SrcAlphaFactor;
                    //cyl.material.blendDst = THREE.DstAlphaFactor;
                    cyl.material.blendDst = THREE.OneMinusSrcAlphaFactor;
                    cyl.material.blendEquation = THREE.AddEquation; // default
                    cyl.realize();
                }
                texture_material(texture) {
                    var name = Object.keys(texture)[0], path = texture[name];
                    console.log('Cylinder texture_material()');
                    cyl.textures.get(name, path).then((material) => {
                        cyl.material = material;
                        cyl.realize();
                    });
                }
                // write to THREE.js scene
                realize() {
                    console.log(`%%%% Cylinder realize: writing cylinder to scene`);
                    // create a webgl sphere-node
                    cyl.o3d = new THREE.Mesh(cyl.geometry, cyl.material);
                    cyl.o3d.material.side = THREE.DoubleSide;
                    // add the Object3d to the scene and store in Camera3d actors by id
                    cyl.camera3d.addActorToScene(cyl.id, cyl.o3d, cyl.pid);
                    // transform sphere - relative to parent in THREE.js scene !!!
                    cyl.transform3d.apply(cyl.transform, cyl.o3d);
                }
                // ordered sequence of component lifecycle phase-transitions:
                //ngOnChanges() { console.log(`Cylinder ngOnChanges`); }
                ngOnInit() {
                    var form = cyl.node['form'];
                    cyl.pid = cyl.parent['id'];
                    console.log(`%%%% ngOnInit - Cylinder id=${cyl.id} pid=${cyl.pid}`);
                    console.log(`node.form.type = ${form['type']}`);
                    console.log(`node.form.color = ${form['color']}`);
                    //console.log(`node = ${cyl.node}`);
                    //console.log(`parent = ${cyl.parent}`);
                    // properties with defaults
                    cyl.radiusTop = form['radiusTop'] || 10;
                    cyl.radiusBottom = form['radiusBottom'] || 10;
                    cyl.height = form['height'] || 20;
                    cyl.radiusSegments = form['radiusSegments'] || 8;
                    cyl.heightSegments = form['heightSegments'] || 1;
                    cyl.openEnded = form['openEnded'] || false;
                    cyl.color = form['color'] || 'red';
                    cyl.transparent = form['transparent'] || true;
                    cyl.opacity = form['opacity'] || 1.0;
                    cyl.wireframe = form['wireframe'] || false;
                    cyl.phong = form['phong'] || false;
                    cyl.emissive_color = form['emissive_color'] || 0x000000; // default undefined
                    cyl.emissiveIntensity = form['emissiveIntensity'] || 1;
                    cyl.specular_color = form['specular_color'] || 0xffffff; // default undefined
                    cyl.shininess = form['shininess'] || 30;
                    cyl.reflectivity = form['reflectivity'] || 1;
                    cyl.fog = (form['fog'] === undefined ? true : form['fog']);
                    cyl.texture = form['texture']; // default undefined
                    cyl.transform = cyl.node['transform'] || {};
                    // geometry
                    cyl.mesh_geometry();
                    // material
                    if (cyl.texture !== undefined) {
                        cyl.texture_material(cyl.texture);
                    }
                    else {
                        cyl.basic_material();
                    }
                }
                ngAfterViewInit() { console.log(`Cylinder ${cyl.id} ngAfterViewInit`); }
            };
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Object)
            ], Cylinder.prototype, "model", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Object)
            ], Cylinder.prototype, "node", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Object)
            ], Cylinder.prototype, "parent", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', String)
            ], Cylinder.prototype, "id", void 0);
            Cylinder = __decorate([
                core_1.Component({
                    selector: 'cylinder',
                    template: ``
                }), 
                __metadata('design:paramtypes', [camera3d_1.Camera3d, transform3d_1.Transform3d, textures_1.Textures])
            ], Cylinder);
            exports_1("Cylinder", Cylinder);
        }
    }
});
