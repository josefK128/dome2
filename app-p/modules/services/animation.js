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
    var Animation;
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
            // GSAP
            //
            let Animation = class Animation {
                //timeline:any;
                //tweenmax:any;
                constructor(cfg, camera3d, camera2d) {
                    this.config = cfg;
                    this.camera3d = camera3d;
                    this.camera2d = camera2d;
                }
                perform(shot) {
                    console.log(`Animation.perform: typeof shot = ${shot}`);
                    console.log(`Animation.perform: shot = ${JSON.stringify(shot)}`);
                    // diagnostics
                    this.camera3d.report_visibility();
                }
            };
            Animation = __decorate([
                core_1.Injectable(),
                __param(0, core_1.Inject(_config_1.CONFIG)), 
                __metadata('design:paramtypes', [Object, camera3d_1.Camera3d, camera2d_1.Camera2d])
            ], Animation);
            exports_1("Animation", Animation);
        }
    }
});
