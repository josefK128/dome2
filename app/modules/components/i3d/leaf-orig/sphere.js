// Sphere leaf-component
// NOTE: leaf-components have empty-string template - NOT undefined! 
// input-property attribute values used by the leaf-component are declared 
// in <sphere ...></sphere> element(s) in the templates of composite 
// components (for exp. scenes)
// NOTE: the purpose of i3d leaf-components are to create webGL objects
// and via CameraVR add them to the webGL scene rendered in the '3D' canvas,
// and register the object as a scene 'actor' via CameraVR.addActorToScene(...)
System.register(['@angular/core', '../../../services/cameraVR'], function(exports_1, context_1) {
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
    var core_1, cameraVR_1;
    var Sphere;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (cameraVR_1_1) {
                cameraVR_1 = cameraVR_1_1;
            }],
        execute: function() {
            Sphere = (function () {
                function Sphere(_cameraVR) {
                    this.cameraVR = _cameraVR;
                }
                // ordered sequence of component lifecycle phase-transitions:
                //  ngOnChanges() { console.log(`Sphere ngOnChanges`); }
                Sphere.prototype.ngOnInit = function () {
                    var node;
                    console.log("\n\n%%%% Sphere ngOnInit:");
                    console.log("%%%% this.cameraVR = " + this.cameraVR);
                    for (var p in this.model) {
                        console.log("this.model has property " + p + " with val = " + this.model[p]);
                    }
                    console.log("%%%% this.id = " + this.id);
                    node = document.getElementById(this.id).parentNode;
                    if (node) {
                        this.parentElement = node.nodeName;
                        this.pid = node.id;
                        console.log("%%%% this.parentElement = " + this.parentElement);
                        console.log("%%%% this.pid = " + this.pid);
                    }
                    else {
                        console.log("%%%% Note: there is no parentNode of this.id= " + this.id);
                    }
                    this.radius = this.model[this.id]['radius'];
                    console.log("%%%% sphere.radius = " + this.radius);
                    console.log("%%%% Sphere wrote sphere " + this.id + " to CameraVR");
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], Sphere.prototype, "id", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], Sphere.prototype, "model", void 0);
                Sphere = __decorate([
                    core_1.Component({
                        selector: 'sphere',
                        template: '',
                        providers: []
                    }), 
                    __metadata('design:paramtypes', [cameraVR_1.CameraVR])
                ], Sphere);
                return Sphere;
            }());
            exports_1("Sphere", Sphere);
        }
    }
});
