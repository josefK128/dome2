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
    var Tetrahedron;
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
            let Tetrahedron = class Tetrahedron {
                constructor(camera3d, transform3d, textures) {
                    this.camera3d = camera3d;
                    this.transform3d = transform3d;
                    this.textures = textures;
                }
                mesh_geometry() {
                    console.log('Tetrahedron mesh_geometry()');
                    this.geometry = new THREE.TetrahedronGeometry(this.radius, this.detail);
                }
                basic_material() {
                    console.log('Tetrahedron basic_material()');
                    this.material = new THREE.MeshBasicMaterial({
                        color: this.color,
                        transparent: this.transparent,
                        opacity: this.opacity,
                        wireframe: this.wireframe });
                    // three.js blending<br>
                    // * NOTE! - brightening of opaque image intersections 
                    //   sometimes occurs (?!)<br>
                    //   This should NOT occur with the following:<br>
                    //   tetrahedronMaterial.blendDst = THREE.OneMinusSrcAlphaFactor;
                    // * NOTE! brightening does occur with:<br>
                    //   tetrahedronMaterial.blendDst = THREE.DstAlphaFactor;
                    this.material.depthTest = false;
                    this.material.blending = THREE.CustomBlending;
                    this.material.blendSrc = THREE.SrcAlphaFactor;
                    //this.material.blendDst = THREE.DstAlphaFactor;
                    this.material.blendDst = THREE.OneMinusSrcAlphaFactor;
                    this.material.blendEquation = THREE.AddEquation; // default
                    this.realize();
                }
                texture_material(texture) {
                    var name = Object.keys(texture)[0], path = texture[name];
                    console.log('Tetrahedron texture_material()');
                    this.textures.get(name, path).then((material) => {
                        this.material = material;
                        this.realize();
                    });
                }
                // write to THREE.js scene
                realize() {
                    console.log(`%%%% Tetrahedron realize: writing tetrahedron to scene`);
                    // create a webgl tetrahedron-node
                    this.o3d = new THREE.Mesh(this.geometry, this.material);
                    this.o3d.material.side = THREE.DoubleSide;
                    // add the Object3d to the scene and store in Camera3d actors by id
                    this.camera3d.addActorToScene(this.id, this.o3d, this.pid);
                    // transform tetrahedron - relative to parent in THREE.js scene !!!
                    this.transform3d.apply(this.transform, this.o3d);
                }
                // ordered sequence of component lifecycle phase-transitions:
                // ngOnChanges() { console.log(`Tetrahedron ngOnChanges`); }
                // calculate properties of tetrahedron from model on node
                ngOnInit() {
                    var form = this.node['form'];
                    this.pid = this.parent['id'];
                    console.log(`%%%% ngOnInit - Tetrahedron id=${this.id} pid={$this.pid}`);
                    console.log(`node.form.type = ${form['type']}`);
                    //console.log(`node = ${this.node}`);
                    //console.log(`parent = ${this.parent}`);
                    // properties with defaults
                    this.radius = form['radius'] || 10;
                    this.detail = form['detail'] || 0;
                    this.texture = form['texture']; // default undefined
                    this.color = form['color'] || 'red';
                    this.transparent = form['transparent'] || true;
                    this.opacity = form['opacity'] || 1.0;
                    this.wireframe = form['wireframe'] || false;
                    this.transform = this.node['transform'] || {};
                    // geometry
                    this.mesh_geometry();
                    // material
                    if (this.texture !== undefined) {
                        this.texture_material(this.texture);
                    }
                    else {
                        this.basic_material();
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