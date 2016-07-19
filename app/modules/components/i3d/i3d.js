System.register(['@angular/core', '@angular/common', '../../services/templatecache', '../../services/models'], function(exports_1, context_1) {
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
    var core_1, core_2, common_1, templatecache_1, models_1;
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
            },
            function (models_1_1) {
                models_1 = models_1_1;
            }],
        execute: function() {
            // singleton instance
            let I3d = class I3d {
                constructor(compiler, view, templates, models) {
                    i3d = this;
                    i3d.compiler = compiler;
                    i3d.view = view;
                    i3d.templates = templates;
                    i3d.models = models;
                }
                static changeState(substate, narrative, init_scene) {
                    var templatename = substate['t'], modelname = substate['m'], tp = substate['tp'], // previous templatename
                    mp = substate['mp'], // previous modelname
                    componentref, // component = componentref.instance;
                    i3dmodel, template;
                    // if neither the template or model has changed then no substate change
                    // however even if just a model change we assume a component reload needed
                    if ((templatename === tp) && (modelname === mp)) {
                        return Promise.resolve('i3d');
                    }
                    else {
                        console.log(`I3d.changeState: templatename = ${templatename} init_scene =
                  ${init_scene}`);
                        return new Promise((resolve, reject) => {
                            // note: modelname might be '' but then models['i3d'] object returned
                            i3dmodel = i3d.models.get(['i3d', templatename, modelname]);
                            template = i3d.templates.get(templatename);
                            //place promise resolution functions on i3dmodel for use by dynamically
                            // loaded composite-component after template initialization complete
                            if (i3dmodel) {
                                i3dmodel['resolve'] = resolve;
                                i3dmodel['reject'] = reject;
                            }
                            else {
                                reject(`model i3d.${templatename}.${modelname} not found!`);
                            }
                            // clear the i3d view and prepare three.js scene
                            // set csphere and lights visibility and then
                            // dynamically load composite-component
                            if (template) {
                                i3d.view.clear();
                                narrative.camera3d.place(templatename, i3dmodel);
                                try {
                                    i3d.compiler.resolveComponent(template).then((factory) => {
                                        componentref = i3d.view.createComponent(factory, 0, i3d.view.injector);
                                    });
                                }
                                catch (e) {
                                    reject(e);
                                }
                            }
                            else {
                                reject(`i3d template with name = ${templatename} not found!`);
                            }
                        }); //return Promise
                    }
                }
            };
            I3d = __decorate([
                core_1.Component({
                    selector: 'dome-i3d',
                    template: ``,
                    providers: [],
                    directives: [common_1.CORE_DIRECTIVES],
                    pipes: []
                }), 
                __metadata('design:paramtypes', [(typeof (_a = typeof core_2.ComponentResolver !== 'undefined' && core_2.ComponentResolver) === 'function' && _a) || Object, (typeof (_b = typeof core_2.ViewContainerRef !== 'undefined' && core_2.ViewContainerRef) === 'function' && _b) || Object, templatecache_1.Templatecache, models_1.Models])
            ], I3d);
            exports_1("I3d", I3d);
        }
    }
    var _a, _b;
});
