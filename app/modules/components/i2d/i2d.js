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
            },
            function (models_1_1) {
                models_1 = models_1_1;
            }],
        execute: function() {
            let I2d = class I2d {
                constructor(compiler, view, templates, models) {
                    i2d = this;
                    i2d.compiler = compiler;
                    i2d.view = view;
                    i2d.templates = templates;
                    i2d.models = models;
                }
                static changeState(substate, narrative) {
                    var templatename = substate['t'], modelname = substate['m'], tp = substate['tp'], // previous templatename
                    mp = substate['mp'], // previous modelname
                    componentref, // component = componentref.instance;
                    i2dmodel, template;
                    // if neither the template or model has changed then no substate change
                    // however even if just a model change we assume a component reload needed
                    if ((templatename === tp) && (modelname === mp)) {
                        return Promise.resolve('i2d');
                    }
                    else {
                        console.log(`I2d.changeState: templatename = ${templatename}`);
                        return new Promise((resolve, reject) => {
                            // note: modelname might be '' but then models['i2d'] object returned
                            i2dmodel = i2d.models.get(['i2d', templatename, modelname]);
                            template = i2d.templates.get(templatename);
                            //place promise resolution functions on i2dmodel for use by dynamically
                            // loaded composite-component after template initialization complete
                            if (i2dmodel) {
                                i2dmodel['resolve'] = resolve;
                                i2dmodel['reject'] = reject;
                            }
                            else {
                                reject(`model i2d.${templatename}.${modelname} not found!`);
                            }
                            // clear i2d view and dynamically load composite template-component
                            if (template) {
                                i2d.view.clear();
                                narrative.camera2d.place(narrative);
                                try {
                                    i2d.compiler.resolveComponent(template).then((factory) => {
                                        componentref = i2d.view.createComponent(factory, 0, i2d.view.injector);
                                    });
                                }
                                catch (e) {
                                    reject(e);
                                }
                            }
                            else {
                                reject(`i2d template with name = ${templatename} not found!`);
                            }
                        }); //return Promise
                    }
                }
            };
            I2d = __decorate([
                core_1.Component({
                    selector: 'dome-i2d',
                    template: ``,
                    providers: [],
                    directives: [common_1.CORE_DIRECTIVES],
                    pipes: []
                }), 
                __metadata('design:paramtypes', [(typeof (_a = typeof core_2.ComponentResolver !== 'undefined' && core_2.ComponentResolver) === 'function' && _a) || Object, (typeof (_b = typeof core_2.ViewContainerRef !== 'undefined' && core_2.ViewContainerRef) === 'function' && _b) || Object, templatecache_1.Templatecache, models_1.Models])
            ], I2d);
            exports_1("I2d", I2d);
        }
    }
    var _a, _b;
});
