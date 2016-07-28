System.register(['@angular/core', '../configs/@config', './camera3d', './camera2d'], function(exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, _config_1, camera3d_1, camera2d_1;
    var narrative, camera3d, camera2d, timeline, Animation;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_config_1_1) {
                _config_1 = _config_1_1;
            },
            function (camera3d_1_1) {
                camera3d_1 = camera3d_1_1;
            },
            function (camera2d_1_1) {
                camera2d_1 = camera2d_1_1;
            }],
        execute: function() {
            // prepare shot timeline - shot = {branches:{}, timeline:{}}
            timeline = (shot) => {
                var _timeline = shot['timeline'] || {}, tlp = _timeline['p'] || {}, actors = _timeline['actors'] || {}, actions = _timeline['actions'] || [], ntuple, type, id, target, // target obj for property to be tweened - animated
                tweens;
                // timeline ctor params - tlp
                tlp.paused = tlp['paused'] || true; // default
                tlp.tweens = tlp['tweens'] || [];
                // iterate through actors on which one or more tweens are defined
                for (let a of Object.keys(actors)) {
                    console.log(`actor = ${a}`);
                    ntuple = a.split(':');
                    type = ntuple[0];
                    id = ntuple[1];
                    console.log(`id = ${id}`);
                    if (!type) {
                        continue;
                    }
                    if (!id) {
                        continue;
                    }
                    // set ntuple to the array of names following a='type:id'
                    // For example if a = 'i3d:cube0:a:b' type='i3d' id='cube0' and
                    // ntuple = ['a', 'b']
                    console.log(`before slice(2) ntuple = ${ntuple}`);
                    ntuple = ntuple.slice(2);
                    console.log(`after slice(2) ntuple = ${ntuple}`);
                    // set target of tween
                    if (type === 'i3d') {
                        target = camera3d['actor'](id);
                    }
                    else {
                        target = document.getElementById(id);
                    }
                    console.log(`target = ${target}`);
                    if (!target) {
                        continue;
                    }
                    if (ntuple.length > 0) {
                        for (let q of ntuple) {
                            if (q) {
                                target = target[q];
                            }
                        }
                    }
                    if (!target) {
                        continue;
                    }
                    // insert tween defaults if not specified<br>
                    // add actor tween array(s) to tlp.tweens array
                    tweens = actors[a];
                    for (let tween of tweens) {
                        // dur - duration of the tween animation
                        if (tween.dur === undefined) {
                            tween.dur = 10;
                        }
                        // p - properties of the target object which are to be tweened
                        tween.p.delay = tween.p.delay || 0;
                        tween.p.ease = tween.p.ease || Quad.easeInOut;
                        // actions
                        if (tween.actions) {
                            if (tween.actions.start) {
                                tween.p.onStart = narrative['exec'];
                                tween.p.onStartParams = tween.actions.start;
                            }
                            if (tween.actions.update) {
                                tween.p.onUpdate = narrative['exec'];
                                tween.p.onUpdateParams = tween.actions.update;
                            }
                            if (tween.actions.complete) {
                                tween.p.onComplete = narrative['exec'];
                                tween.p.onCompleteParams = tween.actions.complete;
                            }
                            if (tween.actions.start) {
                                tween.p.onReverseComplete = narrative['exec'];
                                tween.p.onReverseCompleteParams = tween.actions.reverse_complete;
                            }
                        }
                        tlp.tweens.push(TweenMax.to(target, tween.dur, tween.p));
                    }
                } //actors
                // add callback function(s) to tlp 
                if (actions) {
                    if (actions.start) {
                        tlp.onStart = narrative['exec'];
                        tlp.onStartParams = actions.start;
                    }
                    if (actions.update) {
                        tlp.onUpdate = narrative['exec'];
                        tlp.onUpdateParams = actions.update;
                    }
                    if (actions.complete) {
                        tlp.onComplete = narrative['exec'];
                        tlp.onCompleteParams = actions.complete;
                    }
                    if (actions.reverseComplete) {
                        tlp.onReverseComplete = narrative['exec'];
                        tlp.onReverseCompleteParams = actions.reverseComplete;
                    }
                }
                // add Mediator.next() to onComplete
                // force Mediator.next - overwrite if needed
                // NOTE: iqueue_ready_next was queue_ready_next in dome
                tlp.onComplete = narrative['exec']; // in dome was Mediator.exec
                tlp.onReverseComplete = narrative['exec'];
                tlp.onCompleteParams = actions.complete || [];
                tlp.onCompleteParams.push({ t: 'mediator', f: 'iqueue_ready_next' });
                tlp.onReverseCompleteParams = actions.reverseComplete || [];
                tlp.onReverseCompleteParams.push({ t: 'mediator', f: 'iqueue_ready_next' });
                // return primed timeline
                return new TimelineMax(tlp);
            }; //timeline() 
            let Animation = class Animation {
                constructor(cfg, _camera3d, _camera2d) {
                    this.config = cfg;
                    this.camera3d = _camera3d;
                    this.camera2d = _camera2d;
                    camera3d = _camera3d;
                    camera2d = _camera2d;
                }
                set_narrative(_narrative) {
                    narrative = _narrative;
                }
                // NOTE: reverse=true if back-button, but also if choosing scene sequence
                // such as: (1) sceneA, (2) sceneB, (3) sceneA => reverse=true
                perform(shot = {}, reverse = false) {
                    // camera functions contain an interior delta object (redundant)
                    if (shot['delta']) {
                        console.log('shot contains delta object $$$$$$$$$$$');
                        shot = shot['delta'];
                    }
                    // diagnostics
                    console.log(`Animation.perform: shot = ${shot}`);
                    console.dir(shot);
                    console.log(`Animation.perform: reverse = ${reverse}`);
                    // prepare timeline for shot
                    var tl = timeline(shot);
                    // timeline - if back - run anim in reverse, else forward
                    console.log(`Animation.perform: playing tl = ${tl}`);
                    if (reverse === true) {
                        tl.seek(tl.duration());
                        tl.reverse();
                    }
                    else {
                        tl.play();
                    }
                    // set timeline in Camera3d so it can be paused & set (seek) to time=0 
                    // when a new scene replaces the animating scene
                    //console.dir(tl);
                    this.camera3d.set_timeline(tl); // TimelineMax
                    // diagnostics
                    //this.camera3d.report_visibility();
                    //    console.log(`key.color.r = ${this.camera3d.light('key').color.r}`);
                    //    console.log(`key.color.g = ${this.camera3d.light('key').color.g}`);
                    //    console.log(`key.color.b = ${this.camera3d.light('key').color.b}`);
                    //    console.log(`fill.color.r = ${this.camera3d.light('fill').color.r}`);
                    //    console.log(`fill.color.g = ${this.camera3d.light('fill').color.g}`);
                    //    console.log(`fill.color.b = ${this.camera3d.light('fill').color.b}`);
                    //    console.log(`back.color.r = ${this.camera3d.light('back').color.r}`);
                    //    console.log(`back.color.g = ${this.camera3d.light('back').color.g}`);
                    //    console.log(`back.color.b = ${this.camera3d.light('back').color.b}`);
                }
            };
            Animation = __decorate([
                //timeline() 
                core_1.Injectable(),
                __param(0, core_1.Inject(_config_1.CONFIG)), 
                __metadata('design:paramtypes', [Object, camera3d_1.Camera3d, camera2d_1.Camera2d])
            ], Animation);
            exports_1("Animation", Animation);
        }
    }
});
