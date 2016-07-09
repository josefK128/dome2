System.register(['@angular/core', '../configs/@config', './mediator'], function(exports_1, context_1) {
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
    var core_1, _config_1, mediator_1;
    var Camera2d;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_config_1_1) {
                _config_1 = _config_1_1;
            },
            function (mediator_1_1) {
                mediator_1 = mediator_1_1;
            }],
        execute: function() {
            let Camera2d = class Camera2d {
                constructor(cfg, mediator) {
                    this.config = cfg;
                    this.mediator = mediator;
                    this.record_shots = this.config.recored_shots;
                    this.tl = {};
                    this.tlp = {};
                    this.action = {};
                    this.shot = {};
                    // dolly - plane
                    this.plane = undefined;
                    this.x = 0.0; // plane (webgl y-coord!)
                    this.y = 0.0;
                    // zoom and roll - zoom_plane child of plane
                    this.zoom_plane = undefined;
                    this.angle = 0.0; // zoom_plane - angle degrees
                    this.scale = 1.0;
                    // key controls<br>
                    // * not-alt  => 'cut' - no anim
                    // *    alt  => 'fly' - anim
                    // * not-shft => rel transform 'by'
                    // *    shft => abs transform 'to'
                    // * NOTE: logging of action is for building e2e_test cell when 
                    //   generating e2e_spec
                    window.addEventListener("keyup", function (e) {
                        var a;
                        switch (e.keyCode) {
                            // CENTER/HOME - normalize camera and csphere<br>
                            // r - home,center - 2d only!
                            case 82:
                                a = { d: 3 };
                                if (e.shiftKey) {
                                    this.home(a);
                                    //log({t:'this', f:'home', a:a});
                                    if (this.record_shots) {
                                        this.mediator.record({ t: 'this', f: 'home', a: a });
                                    }
                                }
                                else {
                                    this.center(a);
                                    //log({t:'this', f:'center', a:a});
                                    if (this.record_shots) {
                                        this.mediator.record({ t: 'this', f: 'center', a: a });
                                    }
                                }
                                break;
                            // ZOOM<br>
                            // z - zoom in          
                            case 90:
                                if (e.altKey) {
                                    if (e.shiftKey) {
                                        a = { s: 2.0, d: 3 };
                                        this.zoomflyTo(a);
                                        //log({t:'this', f:'zoomflyTo', a:a});
                                        if (this.record_shots) {
                                            this.mediator.record({ t: 'this', f: 'zoomflyTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { s: 1.1111, d: 3 };
                                        this.zoomflyBy(a);
                                        //log({t:'this', f:'zoomflyBy', a:a});
                                        if (this.record_shots) {
                                            this.mediator.record({ t: 'this', f: 'zoomflyBy', a: a });
                                        }
                                    }
                                }
                                else {
                                    if (e.shiftKey) {
                                        a = { s: 2.0 };
                                        this.zoomcutTo(a);
                                        //log({t:'this', f:'zoomcutTo', a:a});
                                        if (this.record_shots) {
                                            this.mediator.record({ t: 'this', f: 'zoomcutTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { s: 1.1111 };
                                        this.zoomcutBy(a); // 1.0/0.9 = 1.1111
                                        //log({t:'this', f:'zoomcutBy', a:a});
                                        if (this.record_shots) {
                                            this.mediator.record({ t: 'this', f: 'zoomcutBy', a: a });
                                        }
                                    }
                                }
                                break;
                            // x - zoom out          
                            case 88:
                                if (e.altKey) {
                                    if (e.shiftKey) {
                                        a = { s: 0.5, d: 3 };
                                        this.zoomflyTo(a);
                                        //log({t:'this', f:'zoomflyTo', a:a});
                                        if (this.record_shots) {
                                            this.mediator.record({ t: 'this', f: 'zoomflyTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { s: 0.9, d: 3 };
                                        this.zoomflyBy(a);
                                        //log({t:'this', f:'zoomflyBy', a:a});
                                        if (this.record_shots) {
                                            this.mediator.record({ t: 'this', f: 'zoomflyBy', a: a });
                                        }
                                    }
                                }
                                else {
                                    if (e.shiftKey) {
                                        a = { s: 0.5 };
                                        this.zoomcutTo(a);
                                        //log({t:'this', f:'zoomcutTo', a:a});
                                        if (this.record_shots) {
                                            this.mediator.record({ t: 'this', f: 'zoomcutTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { s: 0.9 };
                                        this.zoomcutBy(a);
                                        //log({t:'this', f:'zoomcutBy', a:a});
                                        if (this.record_shots) {
                                            this.mediator.record({ t: 'this', f: 'zoomcutBy', a: a });
                                        }
                                    }
                                }
                                break;
                            // ROLL<br>
                            // c - roll neg => ccw          
                            case 67:
                                if (e.altKey) {
                                    if (e.shiftKey) {
                                        a = { r: -90, d: 3 };
                                        this.rollflyTo(a);
                                        //log({t:'this', f:'rollflyTo', a:a});
                                        if (this.record_shots) {
                                            this.mediator.record({ t: 'this', f: 'rollflyTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { r: -22.5, d: 3 };
                                        this.rollflyBy(a);
                                        //log({t:'this', f:'rollflyBy', a:a});
                                        if (this.record_shots) {
                                            this.mediator.record({ t: 'this', f: 'rollflyBy', a: a });
                                        }
                                    }
                                }
                                else {
                                    if (e.shiftKey) {
                                        a = { r: -90 };
                                        this.rollcutTo(a);
                                        //log({t:'this', f:'rollcutTo', a:a});
                                        if (this.record_shots) {
                                            this.mediator.record({ t: 'this', f: 'rollcutTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { r: -22.5 };
                                        this.rollcutBy(a);
                                        //log({t:'this', f:'rollcutBy', a:a});
                                        if (this.record_shots) {
                                            this.mediator.record({ t: 'this', f: 'rollcutBy', a: a });
                                        }
                                    }
                                }
                                break;
                            // v - roll pos => cw          
                            case 86:
                                if (e.altKey) {
                                    if (e.shiftKey) {
                                        a = { r: 90, d: 3 };
                                        this.rollflyTo(a);
                                        //log({t:'this', f:'rollflyTo', a:a});
                                        if (this.record_shots) {
                                            this.mediator.record({ t: 'this', f: 'rollflyTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { r: 22.5, d: 3 };
                                        this.rollflyBy(a);
                                        //log({t:'this', f:'rollflyBy', a:a});
                                        if (this.record_shots) {
                                            this.mediator.record({ t: 'this', f: 'rollflyBy', a: a });
                                        }
                                    }
                                }
                                else {
                                    if (e.shiftKey) {
                                        a = { r: 90 };
                                        this.rollcutTo(a);
                                        //log({t:'this', f:'rollcutTo', a:a});
                                        if (this.record_shots) {
                                            this.mediator.record({ t: 'this', f: 'rollcutTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { r: 22.5 };
                                        this.rollcutBy(a);
                                        //log({t:'this', f:'rollcutBy', a:a});
                                        if (this.record_shots) {
                                            this.mediator.record({ t: 'this', f: 'rollcutBy', a: a });
                                        }
                                    }
                                }
                                break;
                            // DOLLY<br>
                            // q - dollyX+          
                            case 81:
                                if (e.altKey) {
                                    if (e.shiftKey) {
                                        a = { x: 20, d: 3 };
                                        this.dollyflyTo(a);
                                        //log({t:'this', f:'dollyflyTo', a:a});
                                        if (this.record_shots) {
                                            this.mediator.record({ t: 'this', f: 'dollyflyTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { x: 10, d: 3 };
                                        this.dollyflyBy(a);
                                        //log({t:'this', f:'dollyflyBy', a:a});
                                        if (this.record_shots) {
                                            this.mediator.record({ t: 'this', f: 'dollyflyBy', a: a });
                                        }
                                    }
                                }
                                else {
                                    if (e.shiftKey) {
                                        a = { x: 20 };
                                        this.dollycutTo(a);
                                        //log({t:'this', f:'dollycutTo', a:a});
                                        if (this.record_shots) {
                                            this.mediator.record({ t: 'this', f: 'dollycutTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { x: 10 };
                                        this.dollycutBy(a);
                                        //log({t:'this', f:'dollycutBy', a:a});
                                        if (this.record_shots) {
                                            this.mediator.record({ t: 'this', f: 'dollycutBy', a: a });
                                        }
                                    }
                                }
                                break;
                            // w - dollyX-          
                            case 87:
                                if (e.altKey) {
                                    if (e.shiftKey) {
                                        a = { x: -20, d: 3 };
                                        this.dollyflyTo(a);
                                        //log({t:'this', f:'dollyflyTo', a:a});
                                        if (this.record_shots) {
                                            this.mediator.record({ t: 'this', f: 'dollyflyTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { x: -10, d: 3 };
                                        this.dollyflyBy(a);
                                        //log({t:'this', f:'dollyflyBy', a:a});
                                        if (this.record_shots) {
                                            this.mediator.record({ t: 'this', f: 'dollyflyBy', a: a });
                                        }
                                    }
                                }
                                else {
                                    if (e.shiftKey) {
                                        a = { x: -20 };
                                        this.dollycutTo(a);
                                        //log({t:'this', f:'dollyCutTo', a:a});
                                        if (this.record_shots) {
                                            this.mediator.record({ t: 'this', f: 'dollycutTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { x: -10 };
                                        this.dollycutBy(a);
                                        //log({t:'this', f:'dollyCutBy', a:a});
                                        if (this.record_shots) {
                                            this.mediator.record({ t: 'this', f: 'dollycutBy', a: a });
                                        }
                                    }
                                }
                                break;
                            // y - dollyY+          
                            case 89:
                                if (e.altKey) {
                                    if (e.shiftKey) {
                                        a = { y: 20, d: 3 };
                                        this.dollyflyTo(a);
                                        //log({t:'this', f:'dollyflyTo', a:a});
                                        if (this.record_shots) {
                                            this.mediator.record({ t: 'this', f: 'dollyflyTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { y: 10, d: 3 };
                                        this.dollyflyBy(a);
                                        //log({t:'this', f:'dollyflyBy', a:a});
                                        if (this.record_shots) {
                                            this.mediator.record({ t: 'this', f: 'dollyflyBy', a: a });
                                        }
                                    }
                                }
                                else {
                                    if (e.shiftKey) {
                                        a = { y: 20 };
                                        this.dollycutTo(a);
                                        //log({t:'this', f:'dollycutTo', a:a});
                                        if (this.record_shots) {
                                            this.mediator.record({ t: 'this', f: 'dollycutTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { y: 10 };
                                        this.dollycutBy(a);
                                        //log({t:'this', f:'dollycutBy', a:a});
                                        if (this.record_shots) {
                                            this.mediator.record({ t: 'this', f: 'dollycutBy', a: a });
                                        }
                                    }
                                }
                                break;
                            // u - dollyY-          
                            case 85:
                                if (e.altKey) {
                                    if (e.shiftKey) {
                                        a = { y: -20, d: 3 };
                                        this.dollyflyTo(a);
                                        //log({t:'this', f:'dollyflyTo', a:a});
                                        if (this.record_shots) {
                                            this.mediator.record({ t: 'this', f: 'dollyflyTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { y: -10, d: 3 };
                                        this.dollyflyBy(a);
                                        //log({t:'this', f:'dollyflyBy', a:a});
                                        if (this.record_shots) {
                                            this.mediator.record({ t: 'this', f: 'dollyflyBy', a: a });
                                        }
                                    }
                                }
                                else {
                                    if (e.shiftKey) {
                                        a = { y: -20 };
                                        this.dollycutTo(a);
                                        //log({t:'this', f:'dollycutTo', a:a});
                                        if (this.record_shots) {
                                            this.mediator.record({ t: 'this', f: 'dollycutTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { y: -10 };
                                        this.dollycutBy(a);
                                        //log({t:'this', f:'dollycutBy', a:a});
                                        if (this.record_shots) {
                                            this.mediator.record({ t: 'this', f: 'dollycutBy', a: a });
                                        }
                                    }
                                }
                                break;
                            // 9 - 'random' bezier 'through' curve  
                            // * NOTE: bezier() will always fail e2e-spec test because at each run
                            //   the vertices and control points are chosen by Math.random() so
                            //   one run will never match another.
                            case 57:
                                // uses default dur=10 npoints=5 
                                this.bezier();
                                //log({t:'this', f:'bezier', a:{d:10}});
                                if (this.record_shots) {
                                    this.mediator.record({ t: 'this', f: 'bezier', a: { d: 10 } });
                                }
                                break;
                            default:
                        }
                    });
                } //ctor
                set_narrative(narrative) {
                    this.narrative = narrative;
                }
                place(narrative) {
                    this.narrative = narrative;
                    this.plane = document.getElementById("plane");
                    this.zoom_plane = document.getElementById("zoom_plane");
                    console.assert(this.plane, 'error setting plane!');
                    console.assert(this.zoom_plane, 'error setting zoom_plane!');
                }
                actor(id) {
                    return document.getElementById(id);
                }
                center(a) {
                    a.d = a.d || 0.0;
                    // shot
                    this.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0 },
                                actors: {
                                    'i2d:plane': [{ dur: a.d,
                                            p: { 'x': 0.0, 'y': 0.0, immediateRender: false } }],
                                    'i2d:zoom_plane': [{ dur: a.d, p: { 'rotation': 0.0,
                                                svgOrigin: '0% 0%', immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    this.narrative.setShot(this.shot);
                }
                home(a) {
                    a.d = a.d || 0.0;
                    //shot
                    this.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0 },
                                actors: {
                                    'i2d:plane': [{ dur: a.d,
                                            p: { 'x': 0.0, 'y': 0.0, immediateRender: false } }],
                                    'i2d:zoom_plane': [{ dur: a.d, p: { rotation: 0.0,
                                                scale: 1.0, svgOrigin: '0% 0%', immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    this.narrative.setShot(this.shot);
                }
                // ZOOM<br>
                // cut - no animation
                zoomcutTo(a) {
                    if (a.s !== undefined) {
                        this.scale = a.s;
                    }
                    // shot
                    this.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0, tweens: [] },
                                actors: {
                                    'i2d:zoom_plane': [{ dur: 0, p: { 'scale': this.scale,
                                                svgOrigin: '0% 0%', immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    this.narrative.setShot(this.shot);
                }
                zoomcutBy(a) {
                    if (a.s !== undefined) {
                        this.scale *= a.s;
                    }
                    // shot
                    this.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0, tweens: [] },
                                actors: {
                                    'i2d:zoom_plane': [{ dur: 0, p: { 'scale': this.scale,
                                                svgOrigin: '0% 0%', immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    this.narrative.setShot(this.shot);
                }
                // fly - animate
                zoomflyTo(a) {
                    if (a.s !== undefined) {
                        this.scale = a.s;
                    }
                    // shot
                    this.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0, tweens: [] },
                                actors: {
                                    'i2d:zoom_plane': [{ dur: a.d, p: { 'scale': this.scale,
                                                svgOrigin: '0% 0%', immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    this.narrative.setShot(this.shot);
                }
                zoomflyBy(a) {
                    if (a.s !== undefined) {
                        this.scale *= a.s;
                    }
                    // shot
                    this.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0, tweens: [] },
                                actors: {
                                    'i2d:zoom_plane': [{ dur: a.d, p: { 'scale': this.scale,
                                                svgOrigin: '0% 0%', immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    this.narrative.setShot(this.shot);
                }
                // ROLL<br>
                // cut - no animation
                rollcutTo(a) {
                    if (a.r !== undefined) {
                        this.angle = a.r;
                    }
                    // shot
                    this.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0, tweens: [] },
                                actors: {
                                    'i2d:zoom_plane': [{ dur: 0, p: { 'rotation': this.angle,
                                                svgOrigin: '0% 0%', immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    this.narrative.setShot(this.shot);
                }
                rollcutBy(a) {
                    if (a.r !== undefined) {
                        this.angle += a.r;
                    }
                    // shot
                    this.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0, tweens: [] },
                                actors: {
                                    'i2d:zoom_plane': [{ dur: 0, p: { 'rotation': this.angle,
                                                svgOrigin: '0% 0%', immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    this.narrative.setShot(this.shot);
                }
                // fly - animate
                rollflyTo(a) {
                    if (a.r !== undefined) {
                        this.angle = a.r;
                    }
                    // shot
                    this.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0, tweens: [] },
                                actors: {
                                    'i2d:zoom_plane': [{ dur: a.d, p: { 'rotation': this.angle,
                                                svgOrigin: '0% 0%', immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    this.narrative.setShot(this.shot);
                }
                rollflyBy(a) {
                    if (a.r !== undefined) {
                        this.angle += a.r;
                    }
                    // shot
                    this.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0, tweens: [] },
                                actors: {
                                    'i2d:zoom_plane': [{ dur: a.d, p: { 'rotation': this.angle,
                                                svgOrigin: '0% 0%', immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    this.narrative.setShot(this.shot);
                }
                // DOLLY<br>
                // cut - no animation
                dollycutTo(a) {
                    if (a.x !== undefined) {
                        this.x = a.x;
                    }
                    if (a.y !== undefined) {
                        this.y = a.y;
                    }
                    // shot<br>
                    // y-coords are webgl - svg translateY must be negated!
                    this.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0, tweens: [] },
                                actors: {
                                    'i2d:plane': [{ dur: 0,
                                            p: { 'x': this.x, 'y': -this.y,
                                                immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    this.narrative.setShot(this.shot);
                }
                dollycutBy(a) {
                    if (a.x !== undefined) {
                        this.x += a.x;
                    }
                    if (a.y !== undefined) {
                        this.y += a.y;
                    }
                    // shot<br>
                    // y-coords are webgl - svg translateY must be negated!
                    this.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0, tweens: [] },
                                actors: {
                                    'i2d:plane': [{ dur: 0,
                                            p: { 'x': this.x, 'y': -this.y,
                                                immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    this.narrative.setShot(this.shot);
                }
                // fly - animate
                dollyflyTo(a) {
                    if (a.x !== undefined) {
                        this.x = a.x;
                    }
                    if (a.y !== undefined) {
                        this.y = a.y;
                    }
                    // shot<br>
                    // y-coords are webgl - svg translateY must be negated!
                    this.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0, tweens: [] },
                                actors: {
                                    'i2d:plane': [{ dur: a.d,
                                            p: { 'x': this.x, 'y': -this.y,
                                                immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    this.narrative.setShot(this.shot);
                }
                dollyflyBy(a) {
                    if (a.x !== undefined) {
                        this.x += a.x;
                    }
                    if (a.y !== undefined) {
                        this.y += a.y;
                    }
                    // shot<br>
                    // y-coords are webgl - svg translateY must be negated!
                    this.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0, tweens: [] },
                                actors: {
                                    'i2d:plane': [{ dur: a.d,
                                            p: { 'x': this.x, 'y': -this.y,
                                                immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    this.narrative.setShot(this.shot);
                }
                // random 2d-bezier camera nav<br> 
                // use default 6 points and 'through' bezier curve type
                bezier(a = { d: 10, n: 6 }) {
                    var i, x = [], y = [], v = [], bezier;
                    // bezier 'through' curve points - y coords are made neg!
                    x[0] = 0.0;
                    y[0] = 0.0;
                    if (Math.random() > 0.5) {
                        x[1] = 30.0 * Math.random(); // ++
                        y[1] = -30.0 * Math.random();
                        x[2] = -30.0 * Math.random(); // -+
                        y[2] = -30.0 * Math.random();
                        x[3] = -30.0 * Math.random(); // --
                        y[3] = 30.0 * Math.random();
                        x[4] = 30.0 * Math.random(); // +-
                        y[4] = 30.0 * Math.random();
                    }
                    else {
                        x[1] = -30.0 * Math.random(); // --
                        y[1] = 30.0 * Math.random();
                        x[2] = -30.0 * Math.random(); // -+
                        y[2] = -30.0 * Math.random();
                        x[3] = 30.0 * Math.random(); // ++
                        y[3] = -30.0 * Math.random();
                        x[4] = 30.0 * Math.random(); // +-
                        y[4] = 30.0 * Math.random();
                    }
                    x[5] = 0.0;
                    y[5] = 0.0;
                    // create values array
                    for (i = 0; i < a.n; i++) {
                        v.push({ x: x[i], y: y[i] });
                    }
                    bezier = { bezier: { autoRotate: true,
                            curviness: 2,
                            values: v,
                            immediateRender: false } };
                    // shot<br>
                    // y-coords are webgl - svg translateY must be negated!
                    this.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0, tweens: [] },
                                actors: {
                                    'i2d:c': [{ dur: a.d, p: bezier }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    this.narrative.setShot(this.shot);
                }
            };
            Camera2d = __decorate([
                core_1.Injectable(),
                __param(0, core_1.Inject(_config_1.CONFIG)), 
                __metadata('design:paramtypes', [Object, mediator_1.Mediator])
            ], Camera2d);
            exports_1("Camera2d", Camera2d); //Camera2D
        }
    }
});
