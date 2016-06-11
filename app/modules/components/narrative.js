System.register(['@angular/core', '@angular/common', '@angular/router', '../configs/@config', '../services/cameraVR', '../services/state', './i3d/i3d', './i2d/i2d', './base/base', './narrative.html'], function(exports_1, context_1) {
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
    var core_1, common_1, router_1, _config_1, cameraVR_1, state_1, i3d_1, i2d_1, base_1, narrative_html_1;
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
            function (cameraVR_1_1) {
                cameraVR_1 = cameraVR_1_1;
            },
            function (state_1_1) {
                state_1 = state_1_1;
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
            function (narrative_html_1_1) {
                narrative_html_1 = narrative_html_1_1;
            }],
        execute: function() {
            Narrative = (function () {
                function Narrative(cfg, cameraVR, state) {
                    this.count = 0;
                    this.config = cfg || {};
                    this.f = _config_1.config.f || function () { Function.prototype; };
                    Narrative.provider_defaults = _config_1.config.provider_defaults || [];
                    this.cameraVR = cameraVR;
                    this.state = state;
                }
                // NOTE: !!!!!!!!
                // NOTE: later get url passed in on narrative.urlChange(url)  
                // fromstate-service or router url-change eventhandler.
                // Use the url to get the templatename used in I3d.changeScene(templatename)
                // NOTE: !!!!!!!!
                Narrative.prototype.urlChange = function (url) {
                    console.log('\n\n\nurlChange!');
                    console.log("this.state.path() = " + this.state.path());
                    // Later - change the address in the browser address bar
                    //         and add the url-state to the browser history
                    // this.state.go(url);
                    // Later - get component~model tuples from url and change the views
                    //         of each changed media layer
                    //         send scene:score to narrative - contains queue and clock
                    //         send shot:{} to cameraVR - contains GSAP execution - was
                    //         $scope.$on($stateChangeSuccess, ()=>{}) in dome
                    if (this.count % 2 === 0) {
                        this.cameraVR.place(this.config.canvas_id, this.config.opening_scene, this, this.config.scene);
                        i3d_1.I3d.changeScene('space');
                        i2d_1.I2d.changeScene('stage');
                        base_1.Base.changeScene('list');
                    }
                    else {
                        this.cameraVR.place(this.config.canvas_id, "scene two", this, Scene2);
                        i3d_1.I3d.changeScene('space2');
                        i2d_1.I2d.changeScene('stage2');
                        base_1.Base.changeScene('list2');
                    }
                    document.getElementById('counter').innerHTML = "count = " + ++this.count;
                };
                // ordered sequence of component lifecycle phase-transitions:
                Narrative.prototype.ngOnChanges = function () { console.log("narrative ngOnChanges"); };
                Narrative.prototype.ngOnInit = function () {
                    console.log("narrative ngOnInit");
                    console.log("Narrative.provider_defaults isArray is " + Array.isArray(Narrative.provider_defaults));
                    console.log("Narrative.provider_defaults[0] = " + Narrative.provider_defaults[0]);
                    for (var p in Narrative.provider_defaults[0]) {
                        console.log("Narrative.provider_defaults[0] has property " + p + " with val " + Narrative.provider_defaults[0][p]);
                    }
                };
                Narrative = __decorate([
                    core_1.Component({
                        selector: 'dome-narrative',
                        //templateUrl: './app/modules-ts/components/narrative.html', 
                        template: narrative_html_1.default,
                        providers: [
                            core_1.provide(_config_1.CONFIG, { useValue: _config_1.config }),
                            router_1.ROUTER_PROVIDERS,
                            cameraVR_1.CameraVR,
                            state_1.State
                        ],
                        directives: [
                            common_1.CORE_DIRECTIVES,
                            base_1.Base, i2d_1.I2d, i3d_1.I3d // later Ui
                        ]
                    }),
                    core_1.Injectable(),
                    __param(0, core_1.Inject(_config_1.CONFIG)), 
                    __metadata('design:paramtypes', [Object, cameraVR_1.CameraVR, state_1.State])
                ], Narrative);
                return Narrative;
            }());
            exports_1("Narrative", Narrative);
        }
    }
});
