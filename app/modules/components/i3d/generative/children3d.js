// Children3d attribute-component
// NOTE: leaf-components have empty-string template - NOT undefined! 
// input-property attribute values used by the leaf-component are declared 
// in <sphere ...></sphere> element(s) in the templates of composite 
// components (for exp. scenes)
// NOTE: the purpose of i3d leaf-components are to create webGL objects
// and via Camera3d add them to the webGL scene rendered in the '3D' canvas,
// and register the object as a scene 'actor' via Camera3d.addActorToScene(...)
System.register(['@angular/core', '@angular/common', '../../../services/camera3d', '../leaf/cylinder', '../leaf/torus'], function(exports_1, context_1) {
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
    var core_1, common_1, camera3d_1, cylinder_1, torus_1;
    var Children3d;
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
            }],
        execute: function() {
            Children3d = (function () {
                function Children3d(camera3d) {
                    this.camera3d = camera3d;
                }
                // ordered sequence of component lifecycle phase-transitions:
                //  ngOnChanges() { console.log(`Children3d ngOnChanges`); }
                Children3d.prototype.ngOnInit = function () {
                    console.log("\n\n%%%% Children3d ngOnInit:");
                    console.log("%%%% this.camera3d = " + this.camera3d);
                    console.log('this.node is:');
                    console.dir(this.node);
                    console.log('this.model is:');
                    console.dir(this.model);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], Children3d.prototype, "model", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], Children3d.prototype, "node", void 0);
                Children3d = __decorate([
                    core_1.Component({
                        selector: 'children3d',
                        template: "\n    <div *ngFor=\"let node of node.children\">\n      <h5>{{node.id}}:{{node.type}}</h5>\n      <template [ngIf]=\"node['form']['type'] === 'cylinder'\">\n        <cylinder [node]=\"node\" [model]=\"model\"></cylinder>\n        <children3d [attr.node]=\"node\" ></children3d>\n      </template>\n      <template [ngIf]=\"node['form']['type'] === 'torus'\">\n        <torus [node]=\"node\" [model]=\"model\"></torus>\n        <children3d [attr.node]=\"node\"></children3d>\n      </template>\n    </div>\n  ",
                        directives: [common_1.NgFor, common_1.NgIf, cylinder_1.Cylinder, torus_1.Torus],
                        providers: []
                    }), 
                    __metadata('design:paramtypes', [camera3d_1.Camera3d])
                ], Children3d);
                return Children3d;
            }());
            exports_1("Children3d", Children3d);
        }
    }
});
