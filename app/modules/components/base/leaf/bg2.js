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
    var Bg2;
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
            Bg2 = (function () {
                function Bg2(cfg, models, state, animation) {
                    this.config = cfg;
                    this.state = state;
                    this.animation = animation;
                    console.log("state.path() = " + state.path());
                    this.templatename = state.template(state.path(), 'base'); // 'space'
                    this.modelname = state.model(state.path(), 'base'); // 'model1'
                    console.log("######## this.templatename = " + this.templatename);
                    console.log("######## this.modelname = " + this.modelname);
                    console.log("models.get('base." + this.templatename + "." + this.modelname + "')");
                    this.model = models.get("base." + this.templatename + "." + this.modelname);
                    if (this.model) {
                        this.shot = this.model['shot'];
                    }
                }
                // ordered sequence of component lifecycle phase-transitions:
                //  ngOnChanges() { console.log(` Bg2 ngOnChanges`); }
                //  ngOnInit() { console.log(` Bg2 ngOnInit`); }
                //  ngDoCheck() { console.log(` Bg2 ngDoCheck`); }
                //  ngAfterContentInit() { console.log(` Bg2 ngAfterContentInit`); }
                //  ngAfterContentChecked() { console.log(` Bg2 ngAfterContentChecked`); }
                Bg2.prototype.ngAfterViewInit = function () {
                    console.log("Bg2 ngAfterViewInit");
                    if (this.shot) {
                        this.animation.perform(this.shot); // this.shot is Object
                    }
                };
                Bg2 = __decorate([
                    core_1.Component({
                        selector: 'span',
                        template: "\n  <div style=\"background: url('images/glad.png'); width:100%; height:100%; background-size:cover; background-repeat:no-repeat; background-position:50% 50%; opacity:0.6\">\n  </div>",
                        providers: [],
                    }),
                    __param(0, core_1.Inject(_config_1.CONFIG)), 
                    __metadata('design:paramtypes', [Object, models_1.Models, state_1.State, animation_1.Animation])
                ], Bg2);
                return Bg2;
            }());
            exports_1("Bg2", Bg2);
        }
    }
});
