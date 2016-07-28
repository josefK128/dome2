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
    var c2d, Camera2d;
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
            // Camera2d instance var (avoid losing execution context - 'this')
            let Camera2d = class Camera2d {
                constructor(cfg, mediator) {
                    c2d = this;
                    c2d.config = cfg;
                    c2d.mediator = mediator;
                    c2d.record_shots = c2d.config.record_shots;
                    c2d.tl = {};
                    c2d.tlp = {};
                    c2d.action = {};
                    c2d.shot = {};
                    // dolly - plane
                    c2d.plane = undefined;
                    c2d.x = 0.0; // plane (webgl y-coord!)
                    c2d.y = 0.0;
                    // zoom and roll - zoom_plane child of plane
                    c2d.zoom_plane = undefined;
                    c2d.angle = 0.0; // zoom_plane - angle degrees
                    c2d.scale = 1.0;
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
                                    c2d.home(a);
                                    //log({t:'camera2d', f:'home', a:a});
                                    if (c2d.record_shots) {
                                        c2d.mediator.record({ t: 'camera2d', f: 'home', a: a });
                                    }
                                }
                                else {
                                    c2d.center(a);
                                    //log({t:'camera2d', f:'center', a:a});
                                    if (c2d.record_shots) {
                                        c2d.mediator.record({ t: 'camera2d', f: 'center', a: a });
                                    }
                                }
                                break;
                            // ZOOM<br>
                            // z - zoom in          
                            case 90:
                                if (e.altKey) {
                                    if (e.shiftKey) {
                                        a = { s: 2.0, d: 3 };
                                        c2d.zoomflyTo(a);
                                        //log({t:'camera2d', f:'zoomflyTo', a:a});
                                        if (c2d.record_shots) {
                                            c2d.mediator.record({ t: 'camera2d', f: 'zoomflyTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { s: 1.1111, d: 3 };
                                        c2d.zoomflyBy(a);
                                        //log({t:'camera2d', f:'zoomflyBy', a:a});
                                        if (c2d.record_shots) {
                                            c2d.mediator.record({ t: 'camera2d', f: 'zoomflyBy', a: a });
                                        }
                                    }
                                }
                                else {
                                    if (e.shiftKey) {
                                        a = { s: 2.0 };
                                        c2d.zoomcutTo(a);
                                        //log({t:'camera2d', f:'zoomcutTo', a:a});
                                        if (c2d.record_shots) {
                                            c2d.mediator.record({ t: 'camera2d', f: 'zoomcutTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { s: 1.1111 };
                                        c2d.zoomcutBy(a); // 1.0/0.9 = 1.1111
                                        //log({t:'camera2d', f:'zoomcutBy', a:a});
                                        if (c2d.record_shots) {
                                            c2d.mediator.record({ t: 'camera2d', f: 'zoomcutBy', a: a });
                                        }
                                    }
                                }
                                break;
                            // x - zoom out          
                            case 88:
                                if (e.altKey) {
                                    if (e.shiftKey) {
                                        a = { s: 0.5, d: 3 };
                                        c2d.zoomflyTo(a);
                                        //log({t:'camera2d', f:'zoomflyTo', a:a});
                                        if (c2d.record_shots) {
                                            c2d.mediator.record({ t: 'camera2d', f: 'zoomflyTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { s: 0.9, d: 3 };
                                        c2d.zoomflyBy(a);
                                        //log({t:'camera2d', f:'zoomflyBy', a:a});
                                        if (c2d.record_shots) {
                                            c2d.mediator.record({ t: 'camera2d', f: 'zoomflyBy', a: a });
                                        }
                                    }
                                }
                                else {
                                    if (e.shiftKey) {
                                        a = { s: 0.5 };
                                        c2d.zoomcutTo(a);
                                        //log({t:'camera2d', f:'zoomcutTo', a:a});
                                        if (c2d.record_shots) {
                                            c2d.mediator.record({ t: 'camera2d', f: 'zoomcutTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { s: 0.9 };
                                        c2d.zoomcutBy(a);
                                        //log({t:'camera2d', f:'zoomcutBy', a:a});
                                        if (c2d.record_shots) {
                                            c2d.mediator.record({ t: 'camera2d', f: 'zoomcutBy', a: a });
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
                                        c2d.rollflyTo(a);
                                        //log({t:'camera2d', f:'rollflyTo', a:a});
                                        if (c2d.record_shots) {
                                            c2d.mediator.record({ t: 'camera2d', f: 'rollflyTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { r: -22.5, d: 3 };
                                        c2d.rollflyBy(a);
                                        //log({t:'camera2d', f:'rollflyBy', a:a});
                                        if (c2d.record_shots) {
                                            c2d.mediator.record({ t: 'camera2d', f: 'rollflyBy', a: a });
                                        }
                                    }
                                }
                                else {
                                    if (e.shiftKey) {
                                        a = { r: -90 };
                                        c2d.rollcutTo(a);
                                        //log({t:'camera2d', f:'rollcutTo', a:a});
                                        if (c2d.record_shots) {
                                            c2d.mediator.record({ t: 'camera2d', f: 'rollcutTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { r: -22.5 };
                                        c2d.rollcutBy(a);
                                        //log({t:'camera2d', f:'rollcutBy', a:a});
                                        if (c2d.record_shots) {
                                            c2d.mediator.record({ t: 'camera2d', f: 'rollcutBy', a: a });
                                        }
                                    }
                                }
                                break;
                            // v - roll pos => cw          
                            case 86:
                                if (e.altKey) {
                                    if (e.shiftKey) {
                                        a = { r: 90, d: 3 };
                                        c2d.rollflyTo(a);
                                        //log({t:'camera2d', f:'rollflyTo', a:a});
                                        if (c2d.record_shots) {
                                            c2d.mediator.record({ t: 'camera2d', f: 'rollflyTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { r: 22.5, d: 3 };
                                        c2d.rollflyBy(a);
                                        //log({t:'camera2d', f:'rollflyBy', a:a});
                                        if (c2d.record_shots) {
                                            c2d.mediator.record({ t: 'camera2d', f: 'rollflyBy', a: a });
                                        }
                                    }
                                }
                                else {
                                    if (e.shiftKey) {
                                        a = { r: 90 };
                                        c2d.rollcutTo(a);
                                        //log({t:'camera2d', f:'rollcutTo', a:a});
                                        if (c2d.record_shots) {
                                            c2d.mediator.record({ t: 'camera2d', f: 'rollcutTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { r: 22.5 };
                                        c2d.rollcutBy(a);
                                        //log({t:'camera2d', f:'rollcutBy', a:a});
                                        if (c2d.record_shots) {
                                            c2d.mediator.record({ t: 'camera2d', f: 'rollcutBy', a: a });
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
                                        c2d.dollyflyTo(a);
                                        //log({t:'camera2d', f:'dollyflyTo', a:a});
                                        if (c2d.record_shots) {
                                            c2d.mediator.record({ t: 'camera2d', f: 'dollyflyTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { x: 10, d: 3 };
                                        c2d.dollyflyBy(a);
                                        //log({t:'camera2d', f:'dollyflyBy', a:a});
                                        if (c2d.record_shots) {
                                            c2d.mediator.record({ t: 'camera2d', f: 'dollyflyBy', a: a });
                                        }
                                    }
                                }
                                else {
                                    if (e.shiftKey) {
                                        a = { x: 20 };
                                        c2d.dollycutTo(a);
                                        //log({t:'camera2d', f:'dollycutTo', a:a});
                                        if (c2d.record_shots) {
                                            c2d.mediator.record({ t: 'camera2d', f: 'dollycutTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { x: 10 };
                                        c2d.dollycutBy(a);
                                        //log({t:'camera2d', f:'dollycutBy', a:a});
                                        if (c2d.record_shots) {
                                            c2d.mediator.record({ t: 'camera2d', f: 'dollycutBy', a: a });
                                        }
                                    }
                                }
                                break;
                            // w - dollyX-          
                            case 87:
                                if (e.altKey) {
                                    if (e.shiftKey) {
                                        a = { x: -20, d: 3 };
                                        c2d.dollyflyTo(a);
                                        //log({t:'camera2d', f:'dollyflyTo', a:a});
                                        if (c2d.record_shots) {
                                            c2d.mediator.record({ t: 'camera2d', f: 'dollyflyTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { x: -10, d: 3 };
                                        c2d.dollyflyBy(a);
                                        //log({t:'camera2d', f:'dollyflyBy', a:a});
                                        if (c2d.record_shots) {
                                            c2d.mediator.record({ t: 'camera2d', f: 'dollyflyBy', a: a });
                                        }
                                    }
                                }
                                else {
                                    if (e.shiftKey) {
                                        a = { x: -20 };
                                        c2d.dollycutTo(a);
                                        //log({t:'camera2d', f:'dollyCutTo', a:a});
                                        if (c2d.record_shots) {
                                            c2d.mediator.record({ t: 'camera2d', f: 'dollycutTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { x: -10 };
                                        c2d.dollycutBy(a);
                                        //log({t:'camera2d', f:'dollyCutBy', a:a});
                                        if (c2d.record_shots) {
                                            c2d.mediator.record({ t: 'camera2d', f: 'dollycutBy', a: a });
                                        }
                                    }
                                }
                                break;
                            // y - dollyY+          
                            case 89:
                                if (e.altKey) {
                                    if (e.shiftKey) {
                                        a = { y: 20, d: 3 };
                                        c2d.dollyflyTo(a);
                                        //log({t:'camera2d', f:'dollyflyTo', a:a});
                                        if (c2d.record_shots) {
                                            c2d.mediator.record({ t: 'camera2d', f: 'dollyflyTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { y: 10, d: 3 };
                                        c2d.dollyflyBy(a);
                                        //log({t:'camera2d', f:'dollyflyBy', a:a});
                                        if (c2d.record_shots) {
                                            c2d.mediator.record({ t: 'camera2d', f: 'dollyflyBy', a: a });
                                        }
                                    }
                                }
                                else {
                                    if (e.shiftKey) {
                                        a = { y: 20 };
                                        c2d.dollycutTo(a);
                                        //log({t:'camera2d', f:'dollycutTo', a:a});
                                        if (c2d.record_shots) {
                                            c2d.mediator.record({ t: 'camera2d', f: 'dollycutTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { y: 10 };
                                        c2d.dollycutBy(a);
                                        //log({t:'camera2d', f:'dollycutBy', a:a});
                                        if (c2d.record_shots) {
                                            c2d.mediator.record({ t: 'camera2d', f: 'dollycutBy', a: a });
                                        }
                                    }
                                }
                                break;
                            // u - dollyY-          
                            case 85:
                                if (e.altKey) {
                                    if (e.shiftKey) {
                                        a = { y: -20, d: 3 };
                                        c2d.dollyflyTo(a);
                                        //log({t:'camera2d', f:'dollyflyTo', a:a});
                                        if (c2d.record_shots) {
                                            c2d.mediator.record({ t: 'camera2d', f: 'dollyflyTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { y: -10, d: 3 };
                                        c2d.dollyflyBy(a);
                                        //log({t:'camera2d', f:'dollyflyBy', a:a});
                                        if (c2d.record_shots) {
                                            c2d.mediator.record({ t: 'camera2d', f: 'dollyflyBy', a: a });
                                        }
                                    }
                                }
                                else {
                                    if (e.shiftKey) {
                                        a = { y: -20 };
                                        c2d.dollycutTo(a);
                                        //log({t:'camera2d', f:'dollycutTo', a:a});
                                        if (c2d.record_shots) {
                                            c2d.mediator.record({ t: 'camera2d', f: 'dollycutTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { y: -10 };
                                        c2d.dollycutBy(a);
                                        //log({t:'camera2d', f:'dollycutBy', a:a});
                                        if (c2d.record_shots) {
                                            c2d.mediator.record({ t: 'camera2d', f: 'dollycutBy', a: a });
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
                                c2d.bezier();
                                //log({t:'camera2d', f:'bezier', a:{d:10}});
                                if (c2d.record_shots) {
                                    c2d.mediator.record({ t: 'camera2d', f: 'bezier', a: { d: 10 } });
                                }
                                break;
                            default:
                        }
                    });
                } //ctor
                set_narrative(narrative) {
                    c2d.narrative = narrative;
                }
                place(narrative) {
                    c2d.narrative = narrative;
                    c2d.plane = document.getElementById("plane");
                    c2d.zoom_plane = document.getElementById("zoom_plane");
                    console.assert(c2d.plane, 'error setting plane!');
                    console.assert(c2d.zoom_plane, 'error setting zoom_plane!');
                }
                actor(id) {
                    return document.getElementById(id);
                }
                center(a) {
                    a.d = a.d || 0.0;
                    // shot
                    c2d.shot = { delta: {
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
                    c2d.narrative.setShot(c2d.shot);
                }
                home(a) {
                    a.d = a.d || 0.0;
                    //shot
                    c2d.shot = { delta: {
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
                    c2d.narrative.setShot(c2d.shot);
                }
                // ZOOM<br>
                // cut - no animation
                zoomcutTo(a) {
                    if (a.s !== undefined) {
                        c2d.scale = a.s;
                    }
                    // shot
                    c2d.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0, tweens: [] },
                                actors: {
                                    'i2d:zoom_plane': [{ dur: 0, p: { 'scale': c2d.scale,
                                                svgOrigin: '0% 0%', immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    c2d.narrative.setShot(c2d.shot);
                }
                zoomcutBy(a) {
                    if (a.s !== undefined) {
                        c2d.scale *= a.s;
                    }
                    // shot
                    c2d.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0, tweens: [] },
                                actors: {
                                    'i2d:zoom_plane': [{ dur: 0, p: { 'scale': c2d.scale,
                                                svgOrigin: '0% 0%', immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    c2d.narrative.setShot(c2d.shot);
                }
                // fly - animate
                zoomflyTo(a) {
                    if (a.s !== undefined) {
                        c2d.scale = a.s;
                    }
                    // shot
                    c2d.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0, tweens: [] },
                                actors: {
                                    'i2d:zoom_plane': [{ dur: a.d, p: { 'scale': c2d.scale,
                                                svgOrigin: '0% 0%', immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    c2d.narrative.setShot(c2d.shot);
                }
                zoomflyBy(a) {
                    if (a.s !== undefined) {
                        c2d.scale *= a.s;
                    }
                    // shot
                    c2d.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0, tweens: [] },
                                actors: {
                                    'i2d:zoom_plane': [{ dur: a.d, p: { 'scale': c2d.scale,
                                                svgOrigin: '0% 0%', immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    c2d.narrative.setShot(c2d.shot);
                }
                // ROLL<br>
                // cut - no animation
                rollcutTo(a) {
                    if (a.r !== undefined) {
                        c2d.angle = a.r;
                    }
                    // shot
                    c2d.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0, tweens: [] },
                                actors: {
                                    'i2d:zoom_plane': [{ dur: 0, p: { 'rotation': c2d.angle,
                                                svgOrigin: '0% 0%', immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    c2d.narrative.setShot(c2d.shot);
                }
                rollcutBy(a) {
                    if (a.r !== undefined) {
                        c2d.angle += a.r;
                    }
                    // shot
                    c2d.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0, tweens: [] },
                                actors: {
                                    'i2d:zoom_plane': [{ dur: 0, p: { 'rotation': c2d.angle,
                                                svgOrigin: '0% 0%', immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    c2d.narrative.setShot(c2d.shot);
                }
                // fly - animate
                rollflyTo(a) {
                    if (a.r !== undefined) {
                        c2d.angle = a.r;
                    }
                    // shot
                    c2d.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0, tweens: [] },
                                actors: {
                                    'i2d:zoom_plane': [{ dur: a.d, p: { 'rotation': c2d.angle,
                                                svgOrigin: '0% 0%', immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    c2d.narrative.setShot(c2d.shot);
                }
                rollflyBy(a) {
                    if (a.r !== undefined) {
                        c2d.angle += a.r;
                    }
                    // shot
                    c2d.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0, tweens: [] },
                                actors: {
                                    'i2d:zoom_plane': [{ dur: a.d, p: { 'rotation': c2d.angle,
                                                svgOrigin: '0% 0%', immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    c2d.narrative.setShot(c2d.shot);
                }
                // DOLLY<br>
                // cut - no animation
                dollycutTo(a) {
                    if (a.x !== undefined) {
                        c2d.x = a.x;
                    }
                    if (a.y !== undefined) {
                        c2d.y = a.y;
                    }
                    // shot<br>
                    // y-coords are webgl - svg translateY must be negated!
                    c2d.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0, tweens: [] },
                                actors: {
                                    'i2d:plane': [{ dur: 0,
                                            p: { 'x': c2d.x, 'y': -c2d.y,
                                                immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    c2d.narrative.setShot(c2d.shot);
                }
                dollycutBy(a) {
                    if (a.x !== undefined) {
                        c2d.x += a.x;
                    }
                    if (a.y !== undefined) {
                        c2d.y += a.y;
                    }
                    // shot<br>
                    // y-coords are webgl - svg translateY must be negated!
                    c2d.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0, tweens: [] },
                                actors: {
                                    'i2d:plane': [{ dur: 0,
                                            p: { 'x': c2d.x, 'y': -c2d.y,
                                                immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    c2d.narrative.setShot(c2d.shot);
                }
                // fly - animate
                dollyflyTo(a) {
                    if (a.x !== undefined) {
                        c2d.x = a.x;
                    }
                    if (a.y !== undefined) {
                        c2d.y = a.y;
                    }
                    // shot<br>
                    // y-coords are webgl - svg translateY must be negated!
                    c2d.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0, tweens: [] },
                                actors: {
                                    'i2d:plane': [{ dur: a.d,
                                            p: { 'x': c2d.x, 'y': -c2d.y,
                                                immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    c2d.narrative.setShot(c2d.shot);
                }
                dollyflyBy(a) {
                    if (a.x !== undefined) {
                        c2d.x += a.x;
                    }
                    if (a.y !== undefined) {
                        c2d.y += a.y;
                    }
                    // shot<br>
                    // y-coords are webgl - svg translateY must be negated!
                    c2d.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0, tweens: [] },
                                actors: {
                                    'i2d:plane': [{ dur: a.d,
                                            p: { 'x': c2d.x, 'y': -c2d.y,
                                                immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    c2d.narrative.setShot(c2d.shot);
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
                    c2d.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0, tweens: [] },
                                actors: {
                                    'i2d:c': [{ dur: a.d, p: bezier }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    c2d.narrative.setShot(c2d.shot);
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
