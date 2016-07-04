// Metaform2d attribute-component
// i2d-leaf objects are svg elements with ids which are registered 
// via Camera2d.addActorToScene(...) for later fetch by id and animation
System.register(['@angular/core', '@angular/common', '../../../services/camera2d', '../leaf/circle', '../leaf/rect', './metaform2d.html'], function(exports_1, context_1) {
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
    var core_1, common_1, camera2d_1, circle_1, rect_1, metaform2d_html_1;
    var Metaform2d;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (camera2d_1_1) {
                camera2d_1 = camera2d_1_1;
            },
            function (circle_1_1) {
                circle_1 = circle_1_1;
            },
            function (rect_1_1) {
                rect_1 = rect_1_1;
            },
            function (metaform2d_html_1_1) {
                metaform2d_html_1 = metaform2d_html_1_1;
            }],
        execute: function() {
            Metaform2d = (function () {
                function Metaform2d(camera2d) {
                    this.parent = {}; // then initially parent.id is undefined
                    this.camera2d = camera2d;
                }
                // ordered sequence of component lifecycle phase-transitions:
                //  ngOnChanges() { console.log(`Metaform2d ngOnChanges`); }
                Metaform2d.prototype.ngOnInit = function () {
                    console.log("\n\n%%%% Metaform2d ngOnInit:");
                    console.log("this.parent has id=" + this.parent['id']);
                    console.log("this.node with id=" + this.node['id'] + " is:");
                    console.dir(this.node);
                };
                //  ngDoCheck() { console.log(`Metaform2d ngDoCheck`); }
                //  ngAfterContentInit() { console.log(`Metaform2d ngAfterContentInit`); }
                //  ngAfterContentChecked() { console.log(`Metaform2d ngAfterContentChecked`); }
                Metaform2d.prototype.ngAfterViewInit = function () {
                    console.log("Metaform2d ngAfterViewInit");
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], Metaform2d.prototype, "model", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], Metaform2d.prototype, "node", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], Metaform2d.prototype, "parent", void 0);
                Metaform2d = __decorate([
                    core_1.Component({
                        selector: 'metaform2d',
                        template: metaform2d_html_1.default,
                        directives: [common_1.NgFor, common_1.NgIf, circle_1.Circle, rect_1.Rect, Metaform2d],
                        providers: []
                    }), 
                    __metadata('design:paramtypes', [camera2d_1.Camera2d])
                ], Metaform2d);
                return Metaform2d;
            }());
            exports_1("Metaform2d", Metaform2d);
        }
    }
});
