System.register(['@angular/core', '@angular/common', '../../services/models', '../../services/animation'], function(exports_1, context_1) {
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
    var core_1, common_1, models_1, animation_1;
    var shot, Shot;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (models_1_1) {
                models_1 = models_1_1;
            },
            function (animation_1_1) {
                animation_1 = animation_1_1;
            }],
        execute: function() {
            // singleton instance
            let Shot = class Shot {
                constructor(models, animation) {
                    shot = this;
                    shot.models = models;
                    shot.animation = animation;
                }
                static changeState(substate, reverse) {
                    var templatename = substate['t'], _model = substate['m'], // modelname
                    model;
                    console.log('\n\n\n\n ###########################################');
                    console.log(`Shot.changeState: templatename = ${templatename}`);
                    console.log(`Shot.changeState: _model = ${_model}`);
                    console.log(`Shot.changeState: _model[0] = ${_model[0]}`);
                    console.log(`_model is JSON-object is ${/^[\{%7B]/.test(_model)}`);
                    console.log(`_model[0] is '{' is ${/\{/.test(_model[0])}`);
                    console.log(`_model matches '%7B' is ${/^%7B/.test(_model)}`);
                    if (/^[\{%7B]/.test(_model)) {
                        console.log(`Shot.changeState: _model is a JSON-object`);
                        ;
                        model = JSON.parse(_model);
                    }
                    else {
                        console.log(`Shot.changeState: _model is a shot-name`);
                        ;
                        model = shot.models.get(['shot', templatename, _model]);
                    }
                    console.log(`reverse = ${reverse} shot is:`);
                    console.dir(model);
                    console.log('###########################################');
                    shot.animation.perform(model, reverse);
                }
            };
            Shot = __decorate([
                core_1.Component({
                    selector: 'dome-shot',
                    template: ``,
                    providers: [],
                    directives: [common_1.CORE_DIRECTIVES],
                    pipes: []
                }), 
                __metadata('design:paramtypes', [models_1.Models, animation_1.Animation])
            ], Shot);
            exports_1("Shot", Shot);
        }
    }
});
