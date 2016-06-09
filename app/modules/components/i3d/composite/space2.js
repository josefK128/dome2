System.register(['@angular/core', '../../../configs/@config', '../../../services/models', '../../../services/state', '../leaf/sphere', '../leaf/cone', '../leaf/cube'], function(exports_1, context_1) {
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
    var core_1, _config_1, models_1, state_1, sphere_1, cone_1, cube_1;
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
            function (sphere_1_1) {
                sphere_1 = sphere_1_1;
            },
            function (cone_1_1) {
                cone_1 = cone_1_1;
            },
            function (cube_1_1) {
                cube_1 = cube_1_1;
            }],
        execute: function() {
            Space2 = (function () {
                // NOTE: Later URL or else cfg to get models name for template 'space2'
                // NOTE: if use cfg then this template is a 'genotype' with the application
                // of the model realizing the 'phenotype'
                function Space2(cfg, models, state) {
                    this.config = cfg || {};
                    this.model = models.get('model2');
                    this.state = state;
                }
                // ordered sequence of component lifecycle phase-transitions:
                //  ngOnChanges() { console.log(`Space2 ngOnChanges`); }
                Space2.prototype.ngOnInit = function () {
                    console.log("\n#### Space2 ngOnInit");
                    console.log("url = " + this.state.path());
                    console.log("this.model = " + this.model);
                    for (var p in this.model) {
                        console.log("this.model has property " + p + " with val " + this.model[p]);
                    }
                };
                Space2 = __decorate([
                    core_1.Component({
                        selector: 'space',
                        directives: [sphere_1.Sphere, cone_1.Cone, cube_1.Cube],
                        providers: [models_1.Models, state_1.State],
                        template: "\n  <cone></cone>\n  <cube></cube>\n  <sphere id=\"sphereA\" [model]=\"model\"></sphere>\n "
                    }),
                    __param(0, core_1.Inject(_config_1.CONFIG)), 
                    __metadata('design:paramtypes', [Object, models_1.Models, state_1.State])
                ], Space2);
                return Space2;
            }());
            exports_1("Space2", Space2);
        }
    }
});
