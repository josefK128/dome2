// Metaform3d attribute-component
// NOTE: leaf-components have empty-string template - NOT undefined! 
// input-property attribute values used by the leaf-component are declared 
// in <sphere ...></sphere> element(s) in the templates of composite 
// components (for exp. scenes)
// NOTE: the purpose of i3d leaf-components are to create webGL objects
// and via Camera3d add them to the webGL scene rendered in the '3D' canvas,
// and register the object as a scene 'actor' via Camera3d.addActorToScene(...)
System.register(['@angular/core', '@angular/common', '../../../services/camera3d', '../leaf/cylinder', '../leaf/torus', './metaform3d.html'], function(exports_1, context_1) {
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
    var core_1, common_1, camera3d_1, cylinder_1, torus_1, metaform3d_html_1;
    var Metaform3d;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (camera3d_1_1) {
                camera3d_1 = camera3d_1_1;
            },
            function (cylinder_1_1) {
                cylinder_1 = cylinder_1_1;
            },
            function (torus_1_1) {
                torus_1 = torus_1_1;
            },
            function (metaform3d_html_1_1) {
                metaform3d_html_1 = metaform3d_html_1_1;
            }],
        execute: function() {
            let Metaform3d_1;
            let Metaform3d = Metaform3d_1 = class Metaform3d {
                constructor(camera3d) {
                    this.parent = {}; // then initially parent.id is undefined
                    this.camera3d = camera3d;
                }
                // ordered sequence of component lifecycle phase-transitions:
                ngOnChanges() { console.log(`Metaform3d ngOnChanges`); }
                ngOnInit() {
                    console.log("\n\n%%%% Metaform3d ngOnInit:");
                    console.log(`this.parent has id=${this.parent['id']}`);
                    console.log(`this.node with id=${this.node['id']} is:`);
                    console.dir(this.node);
                }
                //  ngDoCheck() { console.log(`Metaform3d ngDoCheck`); }
                //  ngAfterContentInit() { console.log(`Metaform3d ngAfterContentInit`); }
                //  ngAfterContentChecked() { console.log(`Metaform3d ngAfterContentChecked`); }
                ngAfterViewInit() {
                    console.log(`Metaform3d ngAfterViewInit`);
                }
            };
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Object)
            ], Metaform3d.prototype, "model", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Object)
            ], Metaform3d.prototype, "node", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Object)
            ], Metaform3d.prototype, "parent", void 0);
            Metaform3d = Metaform3d_1 = __decorate([
                core_1.Component({
                    selector: 'metaform3d',
                    template: metaform3d_html_1.default,
                    directives: [common_1.NgFor, common_1.NgIf, cylinder_1.Cylinder, torus_1.Torus, Metaform3d],
                    providers: []
                }), 
                __metadata('design:paramtypes', [camera3d_1.Camera3d])
            ], Metaform3d);
            exports_1("Metaform3d", Metaform3d);
        }
    }
});
