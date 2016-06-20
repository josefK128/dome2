System.register(['@angular/core', '../../../configs/@config', '../../../services/models', '../../../services/state', '../../../services/animation'], function(exports_1, context_1) {
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
    var core_1, _config_1, models_1, state_1, animation_1;
    var Display;
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
            function (animation_1_1) {
                animation_1 = animation_1_1;
            }],
        execute: function() {
            Display = (function () {
                function Display(cfg, models, state, animation) {
                    this.config = cfg;
                    this.state = state;
                    this.animation = animation;
                    console.log("state.path() = " + state.path());
                    this.templatename = state.template(state.path(), 'ui');
                    this.modelname = state.model(state.path(), 'ui');
                    console.log("######## this.templatename = " + this.templatename);
                    console.log("######## this.modelname = " + this.modelname);
                    console.log("models.get('ui." + this.templatename + "." + this.modelname + "')");
                    this.model = models.get("ui." + this.templatename + "." + this.modelname);
                    if (this.model) {
                        this.shot = this.model['shot'];
                    }
                }
                // ordered sequence of component lifecycle phase-transitions:
                //  ngOnChanges() { console.log(` Display ngOnChanges`); }
                //  ngOnInit() { console.log(` Display ngOnInit`); }
                //  ngDoCheck() { console.log(` Display ngDoCheck`); }
                //  ngAfterContentInit() { console.log(` Display ngAfterContentInit`); }
                //  ngAfterContentChecked() { console.log(` Display ngAfterContentChecked`); }
                Display.prototype.ngAfterViewInit = function () {
                    console.log("Display ngAfterViewInit");
                    if (this.shot) {
                        this.animation.perform(this.shot); // this.shot is Object
                    }
                };
                Display = __decorate([
                    core_1.Component({
                        selector: 'span',
                        template: "\n  <h4>display</h4>\n",
                        providers: [],
                    }),
                    __param(0, core_1.Inject(_config_1.CONFIG)), 
                    __metadata('design:paramtypes', [Object, models_1.Models, state_1.State, animation_1.Animation])
                ], Display);
                return Display;
            }());
            exports_1("Display", Display);
        }
    }
});
