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
    var ui, Ui;
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
            let Ui = class Ui {
                constructor(compiler, view, templates, models) {
                    ui = this;
                    ui.compiler = compiler;
                    ui.view = view;
                    ui.templates = templates;
                    ui.models = models;
                }
                static changeState(substate) {
                    var templatename = substate['t'], modelname = substate['m'], tp = substate['tp'], // previous templatename
                    mp = substate['mp'], // previous modelname
                    componentref, // component = componentref.instance;
                    uimodel, template;
                    // if neither the template or model has changed then no substate change
                    // however even if just a model change we assume a component reload needed
                    if ((templatename === tp) && (modelname === mp)) {
                        return Promise.resolve('ui');
                    }
                    else {
                        console.log(`Ui.changeState: templatename = ${templatename}`);
                        return new Promise((resolve, reject) => {
                            // note: modelname might be '' but then models['i2d'] object returned
                            uimodel = ui.models.get(['ui', templatename, modelname]);
                            template = ui.templates.get(templatename);
                            //place promise resolution functions on uimodel for use by dynamically
                            // loaded composite-component after template initialization complete
                            if (uimodel) {
                                uimodel['resolve'] = resolve;
                                uimodel['reject'] = reject;
                            }
                            else {
                                reject(`model ui.${templatename}.${modelname} not found!`);
                            }
                            // clear ui view and dynamically load composite template-component
                            if (template) {
                                ui.view.clear();
                                try {
                                    ui.compiler.resolveComponent(template).then((factory) => {
                                        componentref = ui.view.createComponent(factory, 0, ui.view.injector);
                                    });
                                }
                                catch (e) {
                                    reject(e);
                                }
                            }
                            else {
                                reject(`ui template with name = ${templatename} not found!`);
                            }
                        }); //return Promise
                    }
                }
            };
            Ui = __decorate([
                core_1.Component({
                    selector: 'dome-ui',
                    template: ``,
                    providers: [],
                    directives: [common_1.CORE_DIRECTIVES],
                    pipes: []
                }), 
                __metadata('design:paramtypes', [(typeof (_a = typeof core_2.ComponentResolver !== 'undefined' && core_2.ComponentResolver) === 'function' && _a) || Object, (typeof (_b = typeof core_2.ViewContainerRef !== 'undefined' && core_2.ViewContainerRef) === 'function' && _b) || Object, templatecache_1.Templatecache, models_1.Models])
            ], Ui);
            exports_1("Ui", Ui);
        }
    }
    var _a, _b;
});
