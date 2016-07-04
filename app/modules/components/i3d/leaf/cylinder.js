System.register(['@angular/core'], function(exports_1, context_1) {
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
    var core_1;
    var Cylinder;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Cylinder = (function () {
                function Cylinder() {
                }
                // ordered sequence of component lifecycle phase-transitions:
                //  ngOnChanges() { console.log(`Cylinder ngOnChanges`); }
                Cylinder.prototype.ngOnInit = function () {
                    console.log("%%%% Cylinder " + this.id + " ngOnInit");
                    this.pid = this.parent['id'];
                    console.log("node = " + this.node);
                    console.log("parent = " + this.parent);
                    console.log("pid = " + this.pid);
                    console.log("node.form = " + this.node['form']);
                    console.log("node.form.type = " + this.node['form']['type']);
                };
                //  ngDoCheck() { console.log(`Cylinder ngDoCheck`); }
                //  ngAfterContentInit() { console.log(`Cylinder ngAfterContentInit`); }
                //  ngAfterContentChecked() { console.log(`Cylinder ngAfterContentChecked`); }
                Cylinder.prototype.ngAfterViewInit = function () {
                    console.log("Cylinder " + this.id + " ngAfterViewInit");
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
                        template: ""
                    }), 
                    __metadata('design:paramtypes', [])
                ], Cylinder);
                return Cylinder;
            }());
            exports_1("Cylinder", Cylinder);
        }
    }
});
