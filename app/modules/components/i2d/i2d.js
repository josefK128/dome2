System.register(['@angular/core', '@angular/common', './composite/stage-empty'], function(exports_1, context_1) {
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
    var core_1, core_2, common_1, stage_empty_1;
    var I2d;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (stage_empty_1_1) {
                stage_empty_1 = stage_empty_1_1;
            }],
        execute: function() {
            I2d = (function () {
                function I2d(compiler, i2d) {
                    this.type = stage_empty_1.Stage;
                    this.compiler = compiler;
                    this.view = i2d;
                    console.log("I2d ctor: this.type = " + this.type);
                    console.log("I2d ctor: this.compiler = " + this.compiler);
                    console.log("I2d ctor: this.view = " + this.view);
                    //this.compiler.resolveComponent(this.type).then((factory) => {
                    //  this.view.createComponent(factory, 0, this.view.injector);
                    //});
                }
                // ordered sequence of component lifecycle phase-transitions:
                I2d.prototype.ngOnChanges = function () {
                    console.log(" I2d ngOnChanges");
                    //    console.log(`I2d ngOnChanges: this.types = ${this.types}`); 
                    //    for(let type of this.types){
                    //      this.compiler.resolveComponent(type).then((factory) => {
                    //        this.i2d.createComponent(factory, 0, this.i2d.injector);
                    //      });
                    //    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], I2d.prototype, "types", void 0);
                I2d = __decorate([
                    core_1.Component({
                        selector: '[i2d]',
                        template: "",
                        providers: [],
                        directives: [common_1.CORE_DIRECTIVES, stage_empty_1.Stage],
                        pipes: []
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_2.ComponentResolver !== 'undefined' && core_2.ComponentResolver) === 'function' && _a) || Object, (typeof (_b = typeof core_2.ViewContainerRef !== 'undefined' && core_2.ViewContainerRef) === 'function' && _b) || Object])
                ], I2d);
                return I2d;
                var _a, _b;
            }());
            exports_1("I2d", I2d);
        }
    }
});
