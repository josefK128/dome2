System.register(['@angular/core', '../configs/@config', '../models/i3d/space/model1', '../models/i3d/space/model2', '../models/i3d/space/modelhead', '../models/i3d/space/modelteapot', '../models/i2d/stage2/modelA', '../models/shot/camera/s0', '../models/shot/camera/yawflyByPIo3', '../models/shot/camera/yawflyByNegPIo3', '../models/shot/camera/yawflyByPIo6', '../models/shot/camera/yawflyByNegPIo6', '../models/shot/camera/yawcutByPIo3', '../models/shot/camera/yawcutByNegPIo3'], function(exports_1, context_1) {
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
    var core_1, _config_1, model1_1, model2_1, modelhead_1, modelteapot_1, modelA_1, s0_1, yawflyByPIo3_1, yawflyByNegPIo3_1, yawflyByPIo6_1, yawflyByNegPIo6_1, yawcutByPIo3_1, yawcutByNegPIo3_1;
    var Models;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_config_1_1) {
                _config_1 = _config_1_1;
            },
            function (model1_1_1) {
                model1_1 = model1_1_1;
            },
            function (model2_1_1) {
                model2_1 = model2_1_1;
            },
            function (modelhead_1_1) {
                modelhead_1 = modelhead_1_1;
            },
            function (modelteapot_1_1) {
                modelteapot_1 = modelteapot_1_1;
            },
            function (modelA_1_1) {
                modelA_1 = modelA_1_1;
            },
            function (s0_1_1) {
                s0_1 = s0_1_1;
            },
            function (yawflyByPIo3_1_1) {
                yawflyByPIo3_1 = yawflyByPIo3_1_1;
            },
            function (yawflyByNegPIo3_1_1) {
                yawflyByNegPIo3_1 = yawflyByNegPIo3_1_1;
            },
            function (yawflyByPIo6_1_1) {
                yawflyByPIo6_1 = yawflyByPIo6_1_1;
            },
            function (yawflyByNegPIo6_1_1) {
                yawflyByNegPIo6_1 = yawflyByNegPIo6_1_1;
            },
            function (yawcutByPIo3_1_1) {
                yawcutByPIo3_1 = yawcutByPIo3_1_1;
            },
            function (yawcutByNegPIo3_1_1) {
                yawcutByNegPIo3_1 = yawcutByNegPIo3_1_1;
            }],
        execute: function() {
            let Models = class Models {
                // NOTE: all templates must be listed and have defined ({}) sets of models
                constructor(cfg) {
                    this.config = cfg;
                    this.models = {
                        i3d: {
                            space: { model1: model1_1.Model1,
                                model2: model2_1.Model2,
                                modelhead: modelhead_1.Modelhead,
                                modelteapot: modelteapot_1.Modelteapot }
                        },
                        i2d: { stage: {},
                            stage2: { modelA: modelA_1.ModelA } },
                        base: { bg: {},
                            bg2: {},
                            bg3: {} },
                        ui: { display: {},
                            display2: {} },
                        shot: {
                            camera: { s0: s0_1.s0,
                                yawflyByPIo3: yawflyByPIo3_1.yawflyByPIo3,
                                yawflyByNegPIo3: yawflyByNegPIo3_1.yawflyByNegPIo3,
                                yawflyByPIo6: yawflyByPIo6_1.yawflyByPIo6,
                                yawflyByNegPIo6: yawflyByNegPIo6_1.yawflyByNegPIo6,
                                yawcutByPIo3: yawcutByPIo3_1.yawcutByPIo3,
                                yawcutByNegPIo3: yawcutByNegPIo3_1.yawcutByNegPIo3
                            } //camera
                        }
                    };
                } //ctor
                // if needed,create array of keys from dotted path string
                // path can be simple string such as 'i3d'
                // or a punctuated object-branch path such as 'i3d.space.model1'
                // or an array of object-branch keys such as ['i3d', 'space', 'model1']
                branch(path) {
                    var keys, branch = this.models;
                    console.log(`branch():path = ${path}`);
                    if (!Array.isArray(path)) {
                        keys = (path.includes('.') ? path.split('.') : [path]);
                        //keys = (pathstring.indexOf('.') > -1 ? pathstring.split('.') : [pathstring]);
                        console.log(`Array.isArray(keys) = ${Array.isArray(keys)}`);
                        console.log(`keys = ${keys}`);
                    }
                    else {
                        keys = path;
                    }
                    // operate using array of branch keys
                    for (let s of keys) {
                        // ignore key = ''
                        if (s.length > 0) {
                            console.log(`branch: key = ${s}  branch = ${branch} branch[${s}] = ${branch[s]}`);
                            branch = (branch[s] ? branch[s] : undefined);
                            if (branch === undefined) {
                                console.log(`!!!!!!!!!!!!!!!!!! branch from ${name} is undefined!`);
                                return undefined;
                            }
                        }
                    }
                    return branch;
                }
                // example: get('i3d.space.model6')
                // example: get(['i3d', t, m])
                get(path) {
                    return this.branch(path);
                }
                // example: add('i3d.space', 'model6', {...})
                // example: add(['i3d', t], 'model6', {...})
                add(path, modelname, model) {
                    var branch = this.branch(path);
                    if (branch) {
                        branch[modelname] = model;
                        return true;
                    }
                    return undefined;
                }
                // example: remove('i3d.space.model6')
                // example: remove(['i3d', t, m])
                remove(path) {
                    var branch = this.branch(path);
                    if (branch) {
                        branch = undefined;
                        return true;
                    }
                    return undefined;
                }
            };
            Models = __decorate([
                core_1.Injectable(),
                __param(0, core_1.Inject(_config_1.CONFIG)), 
                __metadata('design:paramtypes', [Object])
            ], Models);
            exports_1("Models", Models);
        }
    }
});
