System.register(['@angular/core', '../../../configs/@config', '../../../services/models', '../../../services/state', '../../../services/camera3d', '../../../services/animation', '../generative/metaform3d'], function(exports_1, context_1) {
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
    var core_1, _config_1, models_1, state_1, camera3d_1, animation_1, metaform3d_1;
    var Space2;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_config_1_1) {
                _config_1 = _config_1_1;
            },
            function (models_1_1) {
                models_1 = models_1_1;
            },
            function (state_1_1) {
                state_1 = state_1_1;
            },
            function (camera3d_1_1) {
                camera3d_1 = camera3d_1_1;
            },
            function (animation_1_1) {
                animation_1 = animation_1_1;
            },
            function (metaform3d_1_1) {
                metaform3d_1 = metaform3d_1_1;
            }],
        execute: function() {
            // leaf components
            //import {Cylinder} from '../leaf/cylinder';
            let Space2 = class Space2 {
                constructor(cfg, models, state, camera3d, animation) {
                    this.config = cfg;
                    this.state = state;
                    this.camera3d = camera3d;
                    this.animation = animation;
                    console.log(`\n\n###### space2: state.path() = ${state.path()}`);
                    this.templatename = state.template(state.path(), 'i3d'); // 'space2'
                    this.modelname = state.model(state.path(), 'i3d'); // 'model2'
                    console.log(`this.templatename = ${this.templatename}`);
                    console.log(`this.modelname = ${this.modelname}`);
                    this.model = models.get(`i3d.${this.templatename}.${this.modelname}`);
                    console.log('space2: this.model is:');
                    console.dir(this.model);
                    if (this.model) {
                        this.shot = this.model['shot'];
                    }
                    this.node = this.model['actors'];
                    this.node['children'] = this.model['actors']['metaforms']; // [] or [{},...]
                    console.log('space2: this.node is:');
                    console.dir(this.node);
                }
                // lifecycle
                // ordered sequence of component lifecycle phase-transitions:
                //ngOnChanges() { console.log(`Space2 ngOnChanges`); }
                ngOnInit() {
                    console.log(`\nSpace2 ngOnInit`);
                }
                //ngDoCheck() { console.log(`Space2 ngDoCheck`); }
                //ngAfterContentInit() { console.log(`Space2 ngAfterContentInit`); }
                //ngAfterContentChecked() { console.log(`Space2 ngAfterContentChecked`); }
                ngAfterViewInit() {
                    var action;
                    console.log(`Space2 ngAfterViewInit`);
                    console.log(`i3d actors = ${this.camera3d.reportActors()}`);
                    if (this.shot) {
                        this.animation.perform(this.shot); // this.shot is Object
                    }
                    console.log("mf0=" + mf0 + " mf0.action= " + mf0.getAttribute('action'));
                    action = mf0.getAttribute('action');
                    console.log(`typeof action is ${typeof action}`);
                    console.dir(action);
                    console.log("mf00=" + mf00);
                    console.log("mf000=" + mf000);
                    console.log("mf001=" + mf001);
                    console.log("mf0010=" + mf0010);
                    console.log("mf1=" + mf1 + " mf1.action= " + mf1.getAttribute('action'));
                    action = mf1.getAttribute('action');
                    console.dir(action);
                    console.log(this.viewChild);
                    setTimeout(() => {
                        this.viewChild.changes.subscribe((changes) => console.dir(changes));
                    });
                }
                //ngAfterViewChecked() { console.log(`Space2 ngAfterViewChecked`); }
                ngOnDestroy() {
                    console.log(`@@@@@@@ !!!!!!!!  Space2 ngOnDestroy`);
                    console.log(`before i3d actors = ${this.camera3d.reportActors()}`);
                    this.camera3d.removeActorFromScene(this.templatename);
                    console.log(`after i3d actors = ${this.camera3d.reportActors()}`);
                }
            };
            __decorate([
                core_1.ViewChild('mf0'), 
                __metadata('design:type', Object)
            ], Space2.prototype, "viewChild", void 0);
            Space2 = __decorate([
                core_1.Component({
                    selector: 'space',
                    directives: [metaform3d_1.Metaform3d],
                    providers: [],
                    template: `
  <metaform3d [node]="node" [model]="model" [parent]="node.children"></metaform3d>
 `
                }),
                __param(0, core_1.Inject(_config_1.CONFIG)), 
                __metadata('design:paramtypes', [Object, models_1.Models, state_1.State, camera3d_1.Camera3d, animation_1.Animation])
            ], Space2);
            exports_1("Space2", Space2);
        }
    }
});
