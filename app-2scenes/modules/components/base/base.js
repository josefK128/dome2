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
    var base, Base;
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
            let Base = class Base {
                constructor(compiler, view, templates, models) {
                    base = this;
                    base.compiler = compiler;
                    base.view = view;
                    base.templates = templates;
                    base.models = models;
                }
                static changeState(substate) {
                    var templatename = substate['t'], modelname = substate['m'], tp = substate['tp'], // previous templatename
                    mp = substate['mp'], // previous modelname
                    componentref, // component = componentref.instance;
                    basemodel, template;
                    // if neither the template or model has changed then no substate change
                    // however even if just a model change we assume a component reload needed
                    if ((templatename === tp) && (modelname === mp)) {
                        return Promise.resolve('base');
                    }
                    else {
                        console.log(`Base.changeState: templatename = ${templatename}`);
                        return new Promise((resolve, reject) => {
                            // note: modelname might be '' but then models['base'] object returned
                            basemodel = base.models.get(['base', templatename, modelname]);
                            template = base.templates.get(templatename);
                            //place promise resolution functions on basemodel for use by dynamically
                            // loaded composite-component after template initialization complete
                            if (basemodel) {
                                basemodel['resolve'] = resolve;
                                basemodel['reject'] = reject;
                            }
                            else {
                                reject(`model base.${templatename}.${modelname} not found!`);
                            }
                            // clear base view and dynamically load the composite template-component
                            if (template) {
                                base.view.clear();
                                try {
                                    base.compiler.resolveComponent(template).then((factory) => {
                                        componentref = base.view.createComponent(factory, 0, base.view.injector);
                                    });
                                }
                                catch (e) {
                                    reject(e);
                                }
                            }
                            else {
                                reject(`base template with name = ${templatename} not found!`);
                            }
                        }); //return Promise
                    }
                }
            };
            Base = __decorate([
                core_1.Component({
                    selector: 'dome-base',
                    template: ``,
                    providers: [],
                    directives: [common_1.CORE_DIRECTIVES],
                    pipes: []
                }), 
                __metadata('design:paramtypes', [(typeof (_a = typeof core_2.ComponentResolver !== 'undefined' && core_2.ComponentResolver) === 'function' && _a) || Object, (typeof (_b = typeof core_2.ViewContainerRef !== 'undefined' && core_2.ViewContainerRef) === 'function' && _b) || Object, templatecache_1.Templatecache, models_1.Models])
            ], Base);
            exports_1("Base", Base);
        }
    }
    var _a, _b;
});
