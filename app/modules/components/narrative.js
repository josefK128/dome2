System.register(['@angular/core', '@angular/common', '@angular/router', '../configs/@config', '../services/camera3d', '../services/state', '../services/models', '../services/scenes', '../services/scores', '../services/templatecache', '../services/queue', '../services/mediator', '../services/transform3d', '../services/camera2d', '../services/animation', '../services/speech', '../services/cameras', '../services/textures', './i3d/i3d', './i2d/i2d', './base/base', './ui/ui', './scene/scene', './shot/shot', './narrative.html'], function(exports_1, context_1) {
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
    var core_1, common_1, router_1, _config_1, camera3d_1, state_1, models_1, scenes_1, scores_1, templatecache_1, queue_1, mediator_1, transform3d_1, camera2d_1, animation_1, speech_1, cameras_1, textures_1, i3d_1, i2d_1, base_1, ui_1, scene_1, shot_1, narrative_html_1;
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
            function (speech_1_1) {
                speech_1 = speech_1_1;
            },
            function (cameras_1_1) {
                cameras_1 = cameras_1_1;
            },
            function (textures_1_1) {
                textures_1 = textures_1_1;
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
            let Narrative_1;
            let Narrative = Narrative_1 = class Narrative {
                // ctor
                constructor(cfg, camera3d, state, models, scenes, templatecache, mediator, transform3d, camera2d, animation, speech) {
                    // show/hide substates by display:block/display:none or visible:t/f-on/off
                    this.display = {};
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
                    Narrative_1.provider_overrides = _config_1.config.provider_overrides || [];
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
                    this.display['ui'] = (this.controlstates['ui'] ? 'block' : 'none');
                    this.display['i2d'] = (this.controlstates['i2d'] ? 'block' : 'none');
                    this.display['i3d'] = (this.controlstates['i3d'] ? 'block' : 'none');
                    this.display['base'] = (this.controlstates['base'] ? 'block' : 'none');
                    this.display['fps'] = (this.controlstates['fps'] ? 'block' : 'none');
                    this.display['csphere'] = (this.controlstates['csphere'] ? 'on' : 'off');
                    this.display['key'] = (this.controlstates['key'] ? 'on' : 'off');
                    this.display['fill'] = (this.controlstates['fill'] ? 'on' : 'off');
                    this.display['back'] = (this.controlstates['back'] ? 'on' : 'off');
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
                    this.speech = speech;
                    this.state = state;
                    this.current_state = this.state.parse(this.current_path);
                    // give Narrative ref to Mediator, Camera3d, Camera2d to call 
                    // N.exec(action) if action has become executable by timestamp > present
                    this.mediator.set_narrative(this);
                    this.camera3d.set_narrative(this);
                    this.camera2d.set_narrative(this);
                    // fwd/back
                    // back-to-opening is disallowed - back just stays on state 1 which
                    // is the first scene chosen
                    window.onpopstate = (event) => {
                        var path = state.path();
                        // 2nd arg ('change_location') set false to prevent revisiting 'opening'
                        // scene - initial 'opening' scene is not revisitable! (default=true)
                        // if a try is made to go back to opening go to state 1 which
                        // is the first non-'opening' scene chosen
                        // 3rd arg ('init_scene') has default value true => initialize the scene,
                        // i.e turn 'on'/'off' csphere and each light according to 
                        // model.visibility settings - exp. model.visibility['fill'] is 'on' 
                        // Thus back/fwd return to their initial scene states, despite the state
                        // of the controls in the 'previous' scene.
                        if (path !== this.config.scenepaths['opening']) {
                            this.changeState(path, false);
                        }
                        else {
                            window.history.go(1);
                        }
                    };
                } //ctor
                // change appearance of display substates and controls
                changeControl(control, val) {
                    var actor;
                    // ignore change on non-existent control
                    console.log(`narrative.changeControl(${control}) val = ${val}`);
                    console.log(`controlstates[${control}] = ${this.controlstates[control]}`);
                    if (this.controlstates[control] === undefined) {
                        console.log(`controlstates[${control}] is undefined!`);
                        return;
                    }
                    // [1] val => called by action {t:'narrative' f:'changeControl' a:[c,val]} 
                    // or from init_scene in changeState -  val is 'on'/'off' so translate 
                    // val = 'on' to controlstates[control] = true and 'off' to false
                    // [2] no val => checkbox toggle => toggle controlstates[control'] boolean 
                    if (val) {
                        // set checkbox ('on' => checked(true),  'off' => unchecked(false))
                        this.controlstates[control] = (val === 'on' ? true : false);
                    }
                    else {
                        this.controlstates[control] = !this.controlstates[control];
                    }
                    // depending on the control may need to change display[control] (ui)
                    // or set the visibility of corresponding actors (csphere, key, fill, back)
                    switch (control) {
                        case 'ui':
                        case 'i3d':
                        case 'i2d':
                        case 'base':
                        case 'fps':
                            console.log(`before: display[${control}] = ${this.display[control]}`);
                            this.display[control] = (this.controlstates[control] ? 'block' : 'none');
                            console.log(`after: display[${control}] = ${this.display[control]}`);
                            break;
                        case 'csphere':
                        case 'key':
                        case 'fill':
                        case 'back':
                            actor = this.camera3d.actor(control);
                            console.log(`\nbefore: display[${control}] = ${this.display[control]}`);
                            console.log(`reportActors = ${this.camera3d.reportActors()}`);
                            this.display[control] = (this.controlstates[control] ? 'on' : 'off');
                            console.log(`after: display[${control}] = ${this.display[control]}`);
                            if (control === 'csphere') {
                                actor.material.visible = this.controlstates['csphere'];
                            }
                            else {
                                actor.visible = this.controlstates[control];
                            }
                            console.dir(actor);
                            break;
                        default:
                            console.log(`unrecognized control = ${control} ?!`);
                    } //switch
                } //changeControl
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
                setShot(shot) {
                    var path, pa;
                    // create an absolute path representing the new shot    
                    path = this.current_path; // create substates array 
                    pa = this.current_path.split('/'); // remove previous shot substate     
                    pa.pop();
                    path = pa.join('/') + `/shot${this.shotindex++}:` + JSON.stringify(shot);
                    console.log(`setShot: new absolute path = ${path}`);
                    // changeState(new-path, change-location, init-scene)
                    this.changeState(path, true, false);
                }
                // change specific substate(s) while leaving the others as current.
                // allows selective dynamic change of substate layers
                // NOTE: shot changes should be made by setShot(shot:Object) since
                // there is no mechanism to ensure  actors in new layers will be loaded
                // in order to permit animation and/or viewing in a shot.
                // The form of a delta_path is a '/' separated set of 't:m' strings where
                // t is the template-component-name and m is the model-name
                // exp: delta_path = '/sky:storm////` would cause an i3d-substate change
                // to the 'Sky' template-component using the 'storm' i3d-data-model'
                // The form of the delta_path follows the standard config.metastate, 
                // typically 'scene/i3d/i2d/base/ui/shot' where eahc of the six substates
                // is either a 't:m' or 't:' name if to be changed, or '' if no change 
                setSubstates(delta_path) {
                    var dpa = delta_path.split('/'), cpa = this.current_path.split('/'), path, i;
                    console.log('\n\n\nsetSubstates: set delta_path = ${delta_path}');
                    for (i = 0; i < cpa.length; i++) {
                        if (!dpa[i] || dpa[i] === '') {
                            dpa[i] = cpa[i];
                        }
                    }
                    path = dpa.join(':');
                    console.log('setSubstates: changing state to absolute-path = ${path}');
                    // changeState(new-path, change-location, init-scene)
                    this.changeState(path, true, false);
                }
                // change component loading and animations according to absolute path, i.e
                // all present and transitional substate template:model pairs are represented
                // in the path argument.
                // Also, the path appears in address bar and is available from state service
                changeState(path, change_location = true, init_scene = true) {
                    var pstate = {}, // previous state
                    substates = {}; // substate current&prev templatename modelname
                    console.log(`\n\n\nchangeState! change_location = ${change_location} init_scene = ${init_scene}`);
                    console.log(`new path = ${path}`);
                    console.log(`current_path = ${this.current_path}`);
                    // check substate changes only if path change => >=1 substate change
                    if (path !== this.current_path) {
                        this.speech.deutsch("ein neuer zustand aufgetreten");
                        // save current state as previous - pstate
                        pstate = this.current_state;
                        // update state and path
                        this.current_state = this.state.parse(path); // new state
                        this.current_path = path; // new path
                        // update scene for scene ui
                        if (this.current_state['scene']['t'].length > 0) {
                            this.current_scene = this.current_state['scene']['t'];
                            // sync ui scene checkboxes
                            for (let s of Object.keys(this.scenestates)) {
                                this.scenestates[s] = false;
                            }
                            this.scenestates[this.current_scene] = true;
                        }
                        // sync ui control if 'init_scene' is true (default), in the case of
                        // changeState being called to create a new scene (not fwd-back), 
                        // initialize the html render of ui, i2d, i3d, base and fps using
                        // css display = 'block'/'none'
                        if (init_scene === true) {
                            let val;
                            for (let c of Object.keys(this.config.controlstates)) {
                                switch (c) {
                                    case 'ui':
                                    case 'i3d':
                                    case 'i2d':
                                    case 'base':
                                    case 'fps':
                                        val = this.config.controlstates[c] ? 'on' : 'off';
                                        console.log(`${c} display = ${val}`);
                                        this.changeControl(c, val);
                                        break;
                                    // skip csphere, key, fill, back also in config.controlstates
                                    // these are initialized in I3d.changeState()
                                    default:
                                }
                            }
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
                            console.log(`$$$$$$$ state.go(${path})`);
                            this.state.go(path);
                        }
                        // prepare substates objects
                        for (let s of this.substates) {
                            substates[s] = {};
                            substates[s]['t'] = this.current_state[s]['t'];
                            substates[s]['m'] = this.current_state[s]['m'];
                            substates[s]['tp'] = pstate[s]['t'];
                            substates[s]['mp'] = pstate[s]['m'];
                        }
                        // wait for substates to initialize before executing shot/animation
                        // Each substate changeState function returns a Promise
                        Promise.all([
                            scene_1.Scene.changeState(substates['scene']),
                            i3d_1.I3d.changeState(substates['i3d'], this, init_scene),
                            i2d_1.I2d.changeState(substates['i2d'], this),
                            base_1.Base.changeState(substates['base']),
                            ui_1.Ui.changeState(substates['ui'])
                        ]).then((results) => {
                            console.log(`${results.join(':')} ready - begin shot/animation`);
                            shot_1.Shot.changeState(substates['shot']);
                        }).catch((e) => {
                            console.log(`error!: ${e}`);
                        });
                    }
                    else {
                        console.log(`no change of path! path = ${path}`);
                    }
                } //changeState
                // execute actions - declarative function invocations
                // message-based function invocation
                // NOTE: if use 'id' instead of simple 't' then id
                // can use a tuple structure with the form - id: 'type:id'
                // exp: id: 'i2d:rect0'
                // if id is simple such as id: 'cube0' then i3d is assumed
                // and the target is Camera3d.actor(action.id)
                exec(_action) {
                    var tuple, actor, // Camera3d.actor(action.id) or doc.getElById(action.id)
                    target, // actor or mediator[action.t]
                    f, // target[action.f]
                    execute = (action) => {
                        // action has 'id' or 't' target giving the execution context 
                        // Camera3d.actor(action.id).f or this.target[action.t].f
                        if (action.id) {
                            tuple = action.id.split(':');
                            // i3d is default - get Camera3d.actor
                            // otherwise use document.getElementById
                            if (tuple.length === 1) {
                                actor = this.camera3d.actor(action.id);
                            }
                            else {
                                if ((tuple[0] === 'i3d') || (tuple[0].length === 0)) {
                                    actor = this.camera3d.actor(tuple[1]);
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
                                throw new Error(`Canera3d.actor(${action.id}) is not defined!`);
                            }
                        }
                        else {
                            console.log(`t => targetname, not id: _action.t = ${_action['t']}`);
                            console.log(`action.t = ${action.t}`);
                            console.log(`action.f = ${action.f}`);
                            console.log(`action.a = ${action.a}`);
                            console.log(`this.targets[action.t] = ${this.targets[action.t]}`);
                            console.log(`this.targets[action.t][action.f] = ${this.targets[action.t][action.f]}`);
                            console.assert(this.targets[action.t] !== undefined, "action.t UNDEFINED!");
                            console.assert(this.targets[action.t][action.f] !== undefined, "this.targets[action.t][action.f] UNDEFINED!");
                            if (this.targets[action.t]) {
                                if (this.targets[action.t][action.f]) {
                                    target = this.targets[action.t]; // target
                                    f = target[action.f];
                                }
                                else {
                                    throw new Error(`${action.t}.${action.f} is not defined!`);
                                }
                            }
                            else {
                                throw new Error(`action target ${action.t} not defined!`);
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
                                        throw new Error(`CAUTION: >4 args in array treated as one array!`);
                                }
                            }
                            else {
                                // action.a is a single value
                                if (_config_1.config.unit_test) {
                                    return action.a;
                                }
                                else {
                                    console.log('############## executing single action !!!!!!!');
                                    console.log(`target = ${target}`);
                                    console.log(`target === c3d is ${target === this.camera3d}`);
                                    console.log(`action.f = ${action.f}`);
                                    console.log(`action.a = ${action.a}`);
                                    target[action.f](action.a);
                                }
                            }
                        }
                        else {
                            if (action.id) {
                                throw new Error(`actor(${action.id}).${action.f}) is not defined!`);
                            }
                            else {
                                throw new Error(`${action.t}.${action.f} is not defined!`);
                            }
                        }
                    }; //execute();
                    // begin      
                    console.log(`@@ Narrative.exec: action = ${_action}`);
                    for (let p in _action) {
                        console.log(`action has property ${p} with value ${_action[p]}`);
                    }
                    if (Array.isArray(_action)) {
                        for (let a of _action) {
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
                } //exec
                // ordered sequence of component lifecycle phase-transitions:
                ngOnChanges(changes) {
                    console.log(`!!!!! narrative ngOnChanges`);
                    console.log(`ngOnChanges scene = ${changes['scene'].currentValue}`);
                }
                ngOnInit() {
                    console.log(`narrative ngOnInit`);
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
                }
            };
            Narrative = Narrative_1 = __decorate([
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
                        core_1.provide(animation_1.Animation, { useClass: animation_1.Animation }),
                        core_1.provide(speech_1.Speech, { useClass: speech_1.Speech }),
                        core_1.provide(cameras_1.Cameras, { useClass: cameras_1.Cameras }),
                        core_1.provide(textures_1.Textures, { useClass: textures_1.Textures })
                    ],
                    directives: [
                        common_1.CORE_DIRECTIVES,
                        base_1.Base, i2d_1.I2d, i3d_1.I3d, ui_1.Ui, scene_1.Scene, shot_1.Shot
                    ]
                }),
                core_1.Injectable(),
                __param(0, core_1.Inject(_config_1.CONFIG)), 
                __metadata('design:paramtypes', [Object, camera3d_1.Camera3d, state_1.State, models_1.Models, scenes_1.Scenes, templatecache_1.Templatecache, mediator_1.Mediator, transform3d_1.Transform3d, camera2d_1.Camera2d, animation_1.Animation, speech_1.Speech])
            ], Narrative);
            exports_1("Narrative", Narrative);
        }
    }
});
