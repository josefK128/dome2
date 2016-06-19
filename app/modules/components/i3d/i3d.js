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
    var i3d, I3d;
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
            // singleton instance
            I3d = (function () {
                function I3d(compiler, view, templates) {
                    i3d = this;
                    i3d.compiler = compiler;
                    i3d.view = view;
                    i3d.templates = templates;
                }
                I3d.changeState = function (templatename) {
                    var template = i3d.templates.get(templatename), componentref; // component = componentref.instance;
                    console.log("I3d.changeState: templatename = " + templatename);
                    if (template) {
                        i3d.view.clear();
                        i3d.compiler.resolveComponent(template).then(function (factory) {
                            componentref = i3d.view.createComponent(factory, 0, i3d.view.injector);
                        });
                    }
                    else {
                        console.log("template with name = " + templatename + " not found!");
                    }
                };
                I3d = __decorate([
                    core_1.Component({
                        selector: 'dome-i3d',
                        template: "",
                        providers: [],
                        directives: [common_1.CORE_DIRECTIVES],
                        pipes: []
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_2.ComponentResolver !== 'undefined' && core_2.ComponentResolver) === 'function' && _a) || Object, (typeof (_b = typeof core_2.ViewContainerRef !== 'undefined' && core_2.ViewContainerRef) === 'function' && _b) || Object, templatecache_1.Templatecache])
                ], I3d);
                return I3d;
                var _a, _b;
            }());
            exports_1("I3d", I3d);
        }
    }
});
