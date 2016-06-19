System.register(['@angular/core', '@angular/common', '../../services/templatecache'], function(exports_1, context_1) {
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
    var core_1, core_2, common_1, templatecache_1;
    var i2d, I2d;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (templatecache_1_1) {
                templatecache_1 = templatecache_1_1;
            }],
        execute: function() {
            I2d = (function () {
                function I2d(compiler, view, templates) {
                    i2d = this;
                    i2d.compiler = compiler;
                    i2d.view = view;
                    i2d.templates = templates;
                }
                I2d.changeState = function (templatename) {
                    var template = i2d.templates.get(templatename), componentref;
                    //var component;  // component = componentref.instance;
                    console.log("I2d.changeState: templatename = " + templatename);
                    if (template) {
                        i2d.view.clear();
                        i2d.compiler.resolveComponent(template).then(function (factory) {
                            componentref = i2d.view.createComponent(factory, 0, i2d.view.injector);
                        });
                    }
                    else {
                        console.log("template with name = " + templatename + " not found!");
                    }
                };
                I2d = __decorate([
                    core_1.Component({
                        selector: 'dome-i2d',
                        template: "",
                        providers: [],
                        directives: [common_1.CORE_DIRECTIVES],
                        pipes: []
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_2.ComponentResolver !== 'undefined' && core_2.ComponentResolver) === 'function' && _a) || Object, (typeof (_b = typeof core_2.ViewContainerRef !== 'undefined' && core_2.ViewContainerRef) === 'function' && _b) || Object, templatecache_1.Templatecache])
                ], I2d);
                return I2d;
                var _a, _b;
            }());
            exports_1("I2d", I2d);
        }
    }
});
