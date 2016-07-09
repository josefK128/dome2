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
    var Torus;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            let Torus = class Torus {
                // ordered sequence of component lifecycle phase-transitions:
                //  ngOnChanges() { console.log(`Torus ngOnChanges`); }
                ngOnInit() {
                    console.log(`%%%% Torus ${this.id} ngOnInit`);
                    this.pid = this.parent['id'];
                    console.log(`node = ${this.node}`);
                    console.log(`parent = ${this.parent}`);
                    console.log(`pid = ${this.pid}`);
                    console.log(`node.form = ${this.node['form']}`);
                    console.log(`node.form.type = ${this.node['form']['type']}`);
                }
                //  ngDoCheck() { console.log(`Torus ngDoCheck`); }
                //  ngAfterContentInit() { console.log(`Torus ngAfterContentInit`); }
                //  ngAfterContentChecked() { console.log(`Torus ngAfterContentChecked`); }
                ngAfterViewInit() {
                    console.log(`Torus ${this.id} ngAfterViewInit`);
                }
            };
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Object)
            ], Torus.prototype, "model", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Object)
            ], Torus.prototype, "node", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Object)
            ], Torus.prototype, "parent", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', String)
            ], Torus.prototype, "id", void 0);
            Torus = __decorate([
                core_1.Component({
                    selector: 'torus',
                    template: ``
                }), 
                __metadata('design:paramtypes', [])
            ], Torus);
            exports_1("Torus", Torus);
        }
    }
});
