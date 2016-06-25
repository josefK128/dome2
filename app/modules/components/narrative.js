System.register(['@angular/core', '@angular/common', '@angular/router', '../configs/@config', '../services/camera3d', '../services/state', '../services/models', '../services/scenes', '../services/scores', '../services/templatecache', '../services/queue', '../services/mediator', '../services/transform3d', '../services/camera2d', '../services/animation', './i3d/i3d', './i2d/i2d', './base/base', './ui/ui', './scene/scene', './shot/shot', './narrative.html'], function(exports_1, context_1) {
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
    var core_1, common_1, router_1, _config_1, camera3d_1, state_1, models_1, scenes_1, scores_1, templatecache_1, queue_1, mediator_1, transform3d_1, camera2d_1, animation_1, i3d_1, i2d_1, base_1, ui_1, scene_1, shot_1, narrative_html_1;
    var Narrative;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (_config_1_1) {
                _config_1 = _config_1_1;
            },
            function (camera3d_1_1) {
                camera3d_1 = camera3d_1_1;
            },
            function (state_1_1) {
                state_1 = state_1_1;
            },
            function (models_1_1) {
                models_1 = models_1_1;
            },
            function (scenes_1_1) {
                scenes_1 = scenes_1_1;
            },
            function (scores_1_1) {
                scores_1 = scores_1_1;
            },
            function (templatecache_1_1) {
                templatecache_1 = templatecache_1_1;
            },
            function (queue_1_1) {
                queue_1 = queue_1_1;
            },
            function (mediator_1_1) {
                mediator_1 = mediator_1_1;
            },
            function (transform3d_1_1) {
                transform3d_1 = transform3d_1_1;
            },
            function (camera2d_1_1) {
                camera2d_1 = camera2d_1_1;
            },
            function (animation_1_1) {
                animation_1 = animation_1_1;
            },
            function (i3d_1_1) {
                i3d_1 = i3d_1_1;
            },
            function (i2d_1_1) {
                i2d_1 = i2d_1_1;
            },
            function (base_1_1) {
                base_1 = base_1_1;
            },
            function (ui_1_1) {
                ui_1 = ui_1_1;
            },
            function (scene_1_1) {
                scene_1 = scene_1_1;
            },
            function (shot_1_1) {
                shot_1 = shot_1_1;
            },
            function (narrative_html_1_1) {
                narrative_html_1 = narrative_html_1_1;
            }],
        execute: function() {
            Narrative = (function () {
                // ctor
                function Narrative(cfg, camera3d, state, models, scenes, templatecache, mediator, transform3d, camera2d, animation) {
                    var _this = this;
                    // index for unique 'leaf-shot' template-names for dynamic shots on
                    // existing scenes
                    this.shotindex = 0;
                    // config
                    this.config = cfg || {};
                    this.controls = _config_1.config.controls;
                    this.controlstates = _config_1.config.controlstates;
                    this.scenepaths = _config_1.config.scenepaths;
                    this.scenestates = _config_1.config.scenestates;
                    this.substates = _config_1.config.substates;
                    Narrative.provider_overrides = _config_1.config.provider_overrides || [];
                    this.targets = _config_1.config.targets;
                    this.targets['narrative'] = this;
                    this.targets['camera3d'] = camera3d;
                    this.targets['camera2d'] = camera2d;
                    this.targets['mediator'] = mediator;
                    this.targets['animation'] = animation;
                    this.targets['models'] = models;
                    this.targets['scenes'] = scenes;
                    this.targets['templatecache'] = templatecache;
                    // display
                    this.uidisplay = (this.controlstates['ui'] ? 'block' : 'none');
                    this.i2ddisplay = (this.controlstates['i2d'] ? 'block' : 'none');
                    this.i3ddisplay = (this.controlstates['i3d'] ? 'block' : 'none');
                    this.basedisplay = (this.controlstates['base'] ? 'block' : 'none');
                    this.fpsdisplay = (this.controlstates['fps'] ? 'block' : 'none');
                    // state
                    this.current_scene = _config_1.config.opening_scene;
                    this.current_path = _config_1.config.scenepaths[_config_1.config.opening_scene];
                    // services
                    this.camera3d = camera3d;
                    this.models = models;
                    this.scenes = scenes;
                    this.mediator = mediator;
                    this.transform3d = transform3d;
                    this.camera2d = camera2d;
                    this.animation = animation;
                    this.state = state;
                    this.current_state = this.state.parse(this.current_path);
                    // give Narrative ref to Mediator to call N.exec(action) if 
                    // action has become executable by timestamp > present
                    this.mediator.set_narrative(this);
                    // fwd/back
                    // back-to-opening is disallowed - back just stays on state 1 which
                    // is the first scene chosen
                    window.onpopstate = function (event) {
                        var path = state.path(), change_location = false;
                        //basehref:string = document.getElementsByTagName('base')[0].href,
                        //      console.log(`basehref: ${basehref}`);
                        //      console.log(`location.pathname returns ${window.location.pathname}`); 
                        //      console.log(`path: ${state.path()}`); 
                        //      console.log(`opening path: ${this.config.scenepaths['opening']}`); 
                        //      console.log(`current_path: ${this.current_path}`); 
                        //      console.log(`state: ${JSON.stringify(event.state)}`);
                        // initial opening scene is not revisitable!
                        // if a try is made to go back to opening go to state 1 which
                        // is the first scene chosen
                        if (path !== _this.config.scenepaths['opening']) {
                            _this.changeState(path, change_location);
                        }
                        else {
                            window.history.go(1);
                        }
                    };
                } //ctor
                // change appearance of display substates and controls
                Narrative.prototype.changeControl = function (control) {
                    this.controlstates[control] = !this.controlstates[control];
                    console.log("controlstates[" + control + "] = " + this.controlstates[control]);
                    switch (control) {
                        case 'ui':
                            console.log("before: this.uidisplay = " + this.uidisplay);
                            this.uidisplay = (this.controlstates['ui'] ? 'block' : 'none');
                            console.log("after: this.uidisplay = " + this.uidisplay);
                            break;
                        case 'i2d':
                            console.log("before: this.i2ddisplay = " + this.i2ddisplay);
                            this.i2ddisplay = (this.controlstates['i2d'] ? 'block' : 'none');
                            console.log("after: this.i2ddisplay = " + this.i2ddisplay);
                            break;
                        case 'i3d':
                            console.log("before: this.i3ddisplay = " + this.i3ddisplay);
                            this.i3ddisplay = (this.controlstates['i3d'] ? 'block' : 'none');
                            console.log("after: this.i3ddisplay = " + this.i3ddisplay);
                            break;
                        case 'base':
                            console.log("before: this.basedisplay = " + this.basedisplay);
                            this.basedisplay = (this.controlstates['base'] ? 'inline' : 'none');
                            console.log("after: this.basedisplay = " + this.basedisplay);
                            break;
                        case 'fps':
                            console.log("before: this.fpsdisplay = " + this.fpsdisplay);
                            this.fpsdisplay = (this.controlstates['fps'] ? 'inline' : 'none');
                            console.log("after: this.fpsdisplay = " + this.fpsdisplay);
                            break;
                        default:
                            break;
                    }
                }; //changeControls
                // method to be called by action invoking a dynamic shot - shot is either:
                // [1] a string '<templatename:modelname>' whose shot model can be obtained 
                // from the Models service and drive a GSAP animation, OR
                // [2] a JSON serialization of a shot-model itself, whose parsed sot-object 
                // is capable of driving a GSAP animation.
                // The path formed to represent the statechange is absolute - i.e. fully
                // specify each substate of the state (scene, i3d, i2d, base, ui, shot)
                // The absolute path is sent to this.changeState(path) which compares each
                // substate to the previous substate and, if there is a change on a 
                // particular substate, invokes changeState on the corresponding substate 
                // component (Scene, I3d, I2d, Base, UI, Shot)
                Narrative.prototype.changeShot = function (shot) {
                    var path, pa;
                    // create an absolute path representing the new shot    
                    path = this.current_path; // create substates array 
                    pa = this.current_path.split('/'); // remove previous shot substate     
                    pa.pop();
                    path = pa.join('/') + ("/shot" + this.shotindex++ + ":") + JSON.stringify(shot);
                    console.log("changeShot: new absolute path = " + path);
                    this.changeState(path);
                };
                // change specific substate(s) while leaving the others as current.
                // allows selective dynamic change of substate layers
                // NOTE: shot changes should be made by changeShot(shot:Object) since
                // there is no mechanism to ensure  actors in new layers will be loaded
                // in order to permit animation and/or viewing in a shot.
                // The form of a delta_path is a '/' separated set of 't:m' strings where
                // t is the template-component-name and m is the model-name
                // exp: delta_path = '/sky:storm////` would cause an i3d-substate change
                // to the 'Sky' template-component using the 'storm' i3d-data-model'
                // The form of the delta_path follows the standard config.metastate, 
                // typically 'scene/i3d/i2d/base/ui/shot' where eahc of the six substates
                // is either a 't:m' or 't:' name if to be changed, or '' if no change 
                Narrative.prototype.changeSubstates = function (delta_path) {
                    var dpa = delta_path.split('/'), cpa = this.current_path.split('/'), path, i;
                    console.log('\n\n\nchangeSubstates! delta_path = ${delta_path}');
                    for (i = 0; i < cpa.length; i++) {
                        if (!dpa[i] || dpa[i] === '') {
                            dpa[i] = cpa[i];
                        }
                    }
                    path = dpa.join(':');
                    console.log('changeSubstates!pabsolute path = ${path}');
                    this.changeState(path);
                };
                // change component loading and animations according to absolute path, i.e
                // all present and transitional substate template:model pairs are represented
                // in the path argument.
                // Also, the path appears in address bar and is available from state service
                Narrative.prototype.changeState = function (path, change_location) {
                    if (change_location === void 0) { change_location = true; }
                    console.log('\n\n\nchangeState!');
                    console.log("new path = " + path);
                    console.log("current_path = " + this.current_path);
                    // check substate changes only if path change => >=1 substate change
                    if (path !== this.current_path) {
                        var pstate = this.current_state; // save current state as previous
                        // update state
                        this.current_state = this.state.parse(path); // new state
                        this.current_path = path; // new path
                        // update scene for scene ui
                        if (this.current_state['scene']['t'].length > 0) {
                            this.current_scene = this.current_state['scene']['t'];
                            // sync ui scene checkboxes
                            for (var _i = 0, _a = Object.keys(this.scenestates); _i < _a.length; _i++) {
                                var s = _a[_i];
                                this.scenestates[s] = false;
                            }
                            this.scenestates[this.current_scene] = true;
                        }
                        // change address bar and register state in browser history.
                        // The 'absolute' path is recorded (and shows in the address bar) - i.e.
                        // all present substates are present in the path irregardless of when 
                        // they were loaded.
                        //
                        // Accessibility to the path also allows any substate component to use 
                        // the State service to get modelnames by tghe following technique: 
                        // substate 's' modelname = State.model(State.path(), 's')
                        //
                        // State.go calls Location.go calls history.pushState(null,path,'')
                        // so calls to changeState after browser fwd/back events set
                        // change_location=false - change_location has default value true,
                        // so all other state changes cause a stage.go => location.go =>
                        // history,pushState(null,path,'')
                        if (change_location) {
                            console.log("$$$$$$$ state.go(" + path + ")");
                            this.state.go(path);
                        }
                        // load substate component if either template or model has changed
                        for (var _b = 0, _c = this.substates; _b < _c.length; _b++) {
                            var s = _c[_b];
                            var t = this.current_state[s]['t'];
                            var m = this.current_state[s]['m'];
                            var tp = pstate[s]['t'];
                            var mp = pstate[s]['m'];
                            console.log("substate = " + s + "  t = " + t + "  tp = " + tp);
                            console.log("substate = " + s + "  m = " + m + "  mp = " + mp);
                            // if either a new template-component or even just a new model for the
                            // present template-component, must freshly load the template-component
                            // and apply the model.
                            // NOTE: for any substate, say 'i3d' for exp., only 'i3d' actors can be
                            // animated by a shot since there is no guarantee of other substates
                            // actors being loaded on ngAfterViewInit of 'i3d' composite
                            // template-component, which is dynamically loaded by I3d.
                            // Simultaneous sot-animations in two substates are not guaranteed to
                            // be synchronized - but probably are perceptually synchronous.
                            // NOTE: all animations are done b the animation service in the phase
                            // transition ngAfterViewInit of the dynamically loaded template 
                            // component - which guarantees all branch components are loaded before
                            // the shot-animation begins.
                            if ((t !== tp) || (m !== mp)) {
                                switch (s) {
                                    case 'i3d':
                                        // 'i3d' modelname here does not require use of the State service
                                        var i3dmodelname = this.current_state['i3d']['m'];
                                        console.log("i3dmodelname = " + i3dmodelname);
                                        var i3dtemplatename = this.current_state['i3d']['t'];
                                        console.log("i3dtemplatename = " + i3dtemplatename);
                                        var i3dmodel = this.models.get(['i3d', i3dtemplatename, i3dmodelname]);
                                        console.log("i3dmodel = " + i3dmodel);
                                        var i3dscenename = i3dmodel['scene'];
                                        console.log("i3dscenename = " + i3dscenename);
                                        var i3dscene = this.scenes.get(['i3d', i3dscenename]);
                                        console.log("i3dscene = " + i3dscene);
                                        if (i3dscene) {
                                            this.camera3d.place(this.config.canvas_id, t, this, i3dscene);
                                        }
                                        else {
                                            this.camera3d.changeTemplateScene(t);
                                        }
                                        // runs any i3d animation associated with i3dmodel['shot'] 
                                        // runs Animation.perform(shot={}) in ngAfterViewInit for
                                        // dynamically loaded composite template-component (exp: 'space') 
                                        i3d_1.I3d.changeState(t);
                                        break;
                                    case 'i2d':
                                        this.camera2d.place(this); // send narrative ref to Camera2d
                                        // runs any i2d animation associated with i2dmodel['shot'] 
                                        // runs Animation.perform(shot={}) in ngAfterViewInit for
                                        // dynamically loaded composite template-component 
                                        i2d_1.I2d.changeState(t);
                                        break;
                                    case 'base':
                                        // runs any base animation associated with basemodel['shot'] 
                                        // runs Animation.perform(shot={}) in ngAfterViewInit for
                                        // dynamically loaded composite template-component 
                                        base_1.Base.changeState(t);
                                        break;
                                    case 'ui':
                                        // runs any ui animation associated with uimodel['shot'] 
                                        // runs Animation.perform(shot={}) in ngAfterViewInit for
                                        // dynamically loaded composite template-component 
                                        ui_1.Ui.changeState(t);
                                        break;
                                    case 'scene':
                                        // send m:string = score which is: 
                                        // (1) a scorename, OR
                                        // (2) a JSON-stringification of a javascript score array
                                        // The javascript score array is found in either case and sent via
                                        // Mediator.perform(score={}) which queues the score actions and
                                        // checks periodically to fire narrative.exec(action) when an
                                        // an action relative-timestamp is exceeded by the present
                                        // relative clock time. 
                                        if (m.length > 0) {
                                            // Scene will execute Mediator.perform(m);
                                            scene_1.Scene.changeState(t, m);
                                        }
                                        break;
                                    case 'shot':
                                        // runs dynamic shot-animations via narrative.changeShot(shot). 
                                        // NOTE: animations are run before any new template-components
                                        // loaded, so shot-animations should use ONLY  previously loaded 
                                        // actors! (actors loaded in templates during previous states)
                                        // Generally the path used for dynamic shot-animations is
                                        // '/////<shot> where <shot> is a string. Possibly the path
                                        // could include non-'' path-substates which then load substate
                                        // template-components which are NOT animated by <shot>
                                        // NOTE: <shot> is either 
                                        // (1) shotname 't:m' or 
                                        // (2) a JSON serialization of a shot-object {...}
                                        // If (1) get shot={} via models.get(['shot',t,m])
                                        // If (2) get shot={} via JSON.parse(<shot>)
                                        // Then for either (1) or (2) run Animation.perform(shot={})
                                        if (m.length > 0) {
                                            shot_1.Shot.changeState(t, m);
                                        }
                                        break;
                                    default:
                                        console.log("substate " + s + " is unrecognized ?!");
                                }
                            } //t or m delta  
                        } //substates 
                    }
                    else {
                        console.log("no change of path! path = " + path);
                    }
                }; //changeState
                // execute actions - declarative function invocations
                // message-based function invocation
                // NOTE: if use 'id' instead of simple 't' then id
                // can use a tuple structure with the form - id: 'type:id'
                // exp: id: 'i2d:rect0'
                // if id is simple such as id: 'cube0' then i3d is assumed
                // and the target is Camera3d.actor(action.id)
                Narrative.prototype.exec = function (_action) {
                    var _this = this;
                    var tuple, actor, // Camera3d.actor(action.id) or doc.getElById(action.id)
                    target, // actor or mediator[action.t]
                    f, // target[action.f]
                    execute = function (action) {
                        // action has 'id' or 't' target giving the execution context 
                        // Camera3d.actor(action.id).f or this.target[action.t].f
                        if (action.id) {
                            tuple = action.id.split(':');
                            // i3d is default - get Camera3d.actor
                            // otherwise use document.getElementById
                            if (tuple.length === 1) {
                                actor = _this.camera3d.actor(action.id);
                            }
                            else {
                                if ((tuple[0] === 'i3d') || (tuple[0].length === 0)) {
                                    actor = _this.camera3d.actor(tuple[1]);
                                }
                                else {
                                    if (tuple[1]) {
                                        actor = document.getElementById(tuple[1]);
                                    }
                                }
                            }
                            if (actor) {
                                // unit test
                                if (_config_1.config.unit_test) {
                                    return actor;
                                }
                                else {
                                    target = actor; // target object for function f
                                    f = actor[action.f];
                                }
                            }
                            else {
                                throw new Error("Canera3d.actor(" + action.id + ") is not defined!");
                            }
                        }
                        else {
                            console.log("t => targetname, not id: _action.t = " + _action['t']);
                            console.log("action.t = " + action.t);
                            console.log("action.f = " + action.f);
                            console.log("action.a = " + action.a);
                            console.log("this.targets[action.t] = " + _this.targets[action.t]);
                            console.log("this.targets[action.t][action.f] = " + _this.targets[action.t][action.f]);
                            console.assert(_this.targets[action.t] !== undefined, "action.t UNDEFINED!");
                            console.assert(_this.targets[action.t][action.f] !== undefined, "this.targets[action.t][action.f] UNDEFINED!");
                            if (_this.targets[action.t]) {
                                if (_this.targets[action.t][action.f]) {
                                    target = _this.targets[action.t]; // target
                                    f = target[action.f];
                                }
                                else {
                                    throw new Error(action.t + "." + action.f + " is not defined!");
                                }
                            }
                            else {
                                throw new Error("action target " + action.t + " not defined!");
                            }
                        }
                        if (f) {
                            if (Array.isArray(action.a)) {
                                // action.a is an array of args
                                switch (action.a.length) {
                                    case 1:
                                        //f(action.a[0]) => 'this' UNDEFINED in target
                                        if (_config_1.config.unit_test) {
                                            return { a0: action.a[0] };
                                        }
                                        else {
                                            target[action.f](action.a[0]);
                                        }
                                        break;
                                    case 2:
                                        //f(action.a[0], action.a[1]) => 'this' UNDEFINED in target
                                        if (_config_1.config.unit_test) {
                                            return { b0: action.a[0], b1: action.a[1] };
                                        }
                                        else {
                                            target[action.f](action.a[0], action.a[1]);
                                        }
                                        break;
                                    case 3:
                                        //f(action.a[0], [1], [2]) => 'this' UNDEFINED in target
                                        if (_config_1.config.unit_test) {
                                            return { c0: action.a[0], c1: action.a[1], c2: action.a[2] };
                                        }
                                        else {
                                            target[action.f](action.a[0], action.a[1], action.a[2]);
                                        }
                                        break;
                                    case 4:
                                        //f(action.a[0], [1], [2], [3]) => 'this' UNDEFINED in target
                                        if (_config_1.config.unit_test) {
                                            return { d0: action.a[0], d1: action.a[1], d2: action.a[2],
                                                d3: action.a[3] };
                                        }
                                        else {
                                            target[action.f](action.a[0], action.a[1], action.a[2], action.a[3]);
                                        }
                                        break;
                                    default:
                                        //f(action.a) => 'this' UNDEFINED in target
                                        if (_config_1.config.unit_test) {
                                            return action.a;
                                        }
                                        else {
                                            target[action.f](action.a);
                                        }
                                        throw new Error("CAUTION: >4 args in array treated as one array!");
                                }
                            }
                            else {
                                // action.a is a single value
                                if (_config_1.config.unit_test) {
                                    return action.a;
                                }
                                else {
                                    console.log('############## executing single action !!!!!!!');
                                    console.log("target = " + target);
                                    console.log("target === c3d is " + (target === _this.camera3d));
                                    console.log("action.f = " + action.f);
                                    console.log("action.a = " + action.a);
                                    target[action.f](action.a);
                                }
                            }
                        }
                        else {
                            if (action.id) {
                                throw new Error("actor(" + action.id + ")." + action.f + ") is not defined!");
                            }
                            else {
                                throw new Error(action.t + "." + action.f + " is not defined!");
                            }
                        }
                    }; //execute();
                    // begin      
                    console.log("@@ Narrative.exec: action = " + _action);
                    for (var p in _action) {
                        console.log("action has property " + p + " with value " + _action[p]);
                    }
                    if (Array.isArray(_action)) {
                        for (var _i = 0, _action_1 = _action; _i < _action_1.length; _i++) {
                            var a = _action_1[_i];
                            if (_config_1.config.unit_test) {
                                return execute(a);
                            }
                            else {
                                execute(a);
                            }
                        }
                    }
                    else {
                        // {1} log action - for building e2e_spec array
                        // NOTE: all shots exec {t:'Mediator', f:'queue_ready_next'}
                        // when completed to allow a new action to start - not helpful
                        // in constructing an e2e_spec
                        if (_config_1.config.unit_test) {
                            return execute(_action);
                        }
                        else {
                            execute(_action);
                        }
                    }
                }; //exec
                // ordered sequence of component lifecycle phase-transitions:
                Narrative.prototype.ngOnChanges = function (changes) {
                    console.log("!!!!! narrative ngOnChanges");
                    console.log("ngOnChanges scene = " + changes['scene'].currentValue);
                };
                Narrative.prototype.ngOnInit = function () {
                    console.log("narrative ngOnInit");
                    //    for(let p in Narrative.provider_overrides[0]){
                    //      console.log(`Narrative.provider_overrides[0] has property ${p} with val ${Narrative.provider_overrides[0][p]}`); 
                    //    }
                    //    for(let s of Object.keys(this.scenestates)){
                    //      console.log(`narrative ctor: this.scenestates[${s}] = ${this.scenestates[s]}`);
                    //    }
                    this.stats = new Stats();
                    this.stats.setMode(0); // 0:fps 1:ms, etc.
                    document.getElementById('stats').appendChild(this.stats.domElement);
                    this.camera3d.set_stats(this.stats);
                    // initial address bar url (differs from application http url
                    // to prevent http fetch on back 
                    this.state.go(this.current_path);
                };
                Narrative = __decorate([
                    core_1.Component({
                        selector: 'dome-narrative',
                        //templateUrl: './app/modules-ts/components/narrative.html', 
                        template: narrative_html_1.default,
                        providers: [
                            router_1.ROUTER_PROVIDERS,
                            core_1.provide(_config_1.CONFIG, { useValue: _config_1.config }),
                            core_1.provide(camera3d_1.Camera3d, { useClass: camera3d_1.Camera3d }),
                            core_1.provide(state_1.State, { useClass: state_1.State }),
                            core_1.provide(models_1.Models, { useClass: models_1.Models }),
                            core_1.provide(scenes_1.Scenes, { useClass: scenes_1.Scenes }),
                            core_1.provide(scores_1.Scores, { useClass: scores_1.Scores }),
                            core_1.provide(templatecache_1.Templatecache, { useClass: templatecache_1.Templatecache }),
                            core_1.provide(queue_1.Queue, { useClass: queue_1.Queue }),
                            core_1.provide(mediator_1.Mediator, { useClass: mediator_1.Mediator }),
                            core_1.provide(transform3d_1.Transform3d, { useClass: transform3d_1.Transform3d }),
                            core_1.provide(camera2d_1.Camera2d, { useClass: camera2d_1.Camera2d }),
                            core_1.provide(animation_1.Animation, { useClass: animation_1.Animation })
                        ],
                        directives: [
                            common_1.CORE_DIRECTIVES,
                            base_1.Base, i2d_1.I2d, i3d_1.I3d, ui_1.Ui, scene_1.Scene, shot_1.Shot
                        ]
                    }),
                    core_1.Injectable(),
                    __param(0, core_1.Inject(_config_1.CONFIG)), 
                    __metadata('design:paramtypes', [Object, camera3d_1.Camera3d, state_1.State, models_1.Models, scenes_1.Scenes, templatecache_1.Templatecache, mediator_1.Mediator, transform3d_1.Transform3d, camera2d_1.Camera2d, animation_1.Animation])
                ], Narrative);
                return Narrative;
            }());
            exports_1("Narrative", Narrative);
        }
    }
});
