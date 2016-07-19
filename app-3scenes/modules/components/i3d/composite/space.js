System.register(['@angular/core', '../../../configs/@config', '../../../services/models', '../../../services/state', '../../../services/camera3d', '../generative/metaform3d'], function(exports_1, context_1) {
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
    var core_1, _config_1, models_1, state_1, camera3d_1, metaform3d_1;
    var Space;
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
            function (metaform3d_1_1) {
                metaform3d_1 = metaform3d_1_1;
            }],
        execute: function() {
            let Space = class Space {
                constructor(cfg, models, state, camera3d) {
                    this.config = cfg;
                    this.state = state;
                    this.camera3d = camera3d;
                    console.log(`i3d compositie space: state.path() = ${state.path()}`);
                    this.templatename = state.template(state.path(), 'i3d'); // 'space'
                    this.modelname = state.model(state.path(), 'i3d'); // 'model2'
                    this.model = models.get(`i3d.${this.templatename}.${this.modelname}`);
                    console.log('space: this.model is:');
                    console.dir(this.model);
                    this.node = this.model;
                    this.node['children'] = this.model['actors']; // [] or [{},...]
                    console.log('space: this.node is:');
                    console.dir(this.node);
                }
                // lifecycle
                // ordered sequence of component lifecycle phase-transitions:
                //ngOnChanges() { console.log(`Space ngOnChanges`); }
                //ngOnInit() { console.log(`\nSpace ngOnInit`);} 
                //ngDoCheck() { console.log(`Space ngDoCheck`); }
                //ngAfterContentInit() { console.log(`Space ngAfterContentInit`); }
                //ngAfterContentChecked() { console.log(`Space ngAfterContentChecked`); }
                ngAfterViewInit() {
                    console.log(`Space ngAfterViewInit`);
                    if (this.model['resolve']) {
                        this.model['resolve']('i3d-space');
                    }
                    else {
                        throw (new Error("i3dmodel['resolve'] not found!"));
                    }
                }
                //ngAfterViewChecked() { console.log(`Space ngAfterViewChecked`); }
                ngOnDestroy() {
                    console.log(`@@@@@@@ !!!!!!!!  Space ngOnDestroy`);
                    console.log(`before i3d actors = ${this.camera3d.reportActors()}`);
                    this.camera3d.removeActorFromScene(this.templatename);
                    console.log(`after i3d actors = ${this.camera3d.reportActors()}`);
                }
            };
            Space = __decorate([
                core_1.Component({
                    selector: 'space',
                    directives: [metaform3d_1.Metaform3d],
                    providers: [],
                    template: `
  <metaform3d [node]="node" [model]="model" [parent]="node.children"></metaform3d>
 `
                }),
                __param(0, core_1.Inject(_config_1.CONFIG)), 
                __metadata('design:paramtypes', [Object, models_1.Models, state_1.State, camera3d_1.Camera3d])
            ], Space);
            exports_1("Space", Space);
        }
    }
});
