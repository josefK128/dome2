System.register(['@angular/core', '@angular/common', '../../services/scores', '../../services/mediator'], function(exports_1, context_1) {
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
    var core_1, common_1, scores_1, mediator_1;
    var scene, Scene;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (scores_1_1) {
                scores_1 = scores_1_1;
            },
            function (mediator_1_1) {
                mediator_1 = mediator_1_1;
            }],
        execute: function() {
            // singleton instance
            let Scene = class Scene {
                constructor(scores, mediator) {
                    scene = this;
                    scene.scores = scores;
                    scene.mediator = mediator;
                }
                static changeState(substate) {
                    var scenename = substate['t'], score = substate['m'], scenep = substate['tp'], // previous scenename
                    scorep = substate['mp']; // previous score
                    // score is JSON sequence of actions or a string-name for scores service
                    if ((scenename !== scenep) || (score !== scorep)) {
                        if (score[0] === '{') {
                            score = JSON.parse(score);
                        }
                        else {
                            score = scene.scores.get([scenename, score]);
                        }
                        if (score !== undefined) {
                            scene.mediator.perform(score);
                        }
                        else {
                            console.log(`score with name = ${score} not found!`);
                        }
                    }
                    return Promise.resolve('scene');
                }
            };
            Scene = __decorate([
                core_1.Component({
                    selector: 'dome-scene',
                    template: ``,
                    providers: [],
                    directives: [common_1.CORE_DIRECTIVES],
                    pipes: []
                }), 
                __metadata('design:paramtypes', [scores_1.Scores, mediator_1.Mediator])
            ], Scene);
            exports_1("Scene", Scene);
        }
    }
});
