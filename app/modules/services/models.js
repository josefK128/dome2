System.register(['@angular/core', '../configs/@config', '../models/i3d/space/model1', '../models/i3d/space2/model2'], function(exports_1, context_1) {
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
    var core_1, _config_1, model1_1, model2_1;
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
            }],
        execute: function() {
            Models = (function () {
                function Models(cfg) {
                    this.config = cfg;
                    this.models = {
                        i3d: {
                            space: { model1: model1_1.Model1 },
                            space2: { model2: model2_1.Model2 }
                        },
                        i2d: {},
                        base: {},
                        ui: {}
                    };
                } //ctor
                // if needed,create array of keys from dotted path string
                // path can be simple string such as 'i3d'
                // or a punctuated object-branch path such as 'i3d.space.model1'
                // or an array of object-branch keys such as ['i3d', 'space', 'model1']
                Models.prototype.branch = function (path) {
                    var keys, branch = this.models;
                    console.log("branch():path = " + path);
                    if (!Array.isArray(path)) {
                        keys = (path.includes('.') ? path.split('.') : [path]);
                        //keys = (pathstring.indexOf('.') > -1 ? pathstring.split('.') : [pathstring]);
                        console.log("Array.isArray(keys) = " + Array.isArray(keys));
                        console.log("keys = " + keys);
                    }
                    else {
                        keys = path;
                    }
                    // operate using array of branch keys
                    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                        var s = keys_1[_i];
                        // ignore key = ''
                        if (s.length > 0) {
                            console.log("branch: key = " + s + "  branch = " + branch);
                            branch = (branch[s] ? branch[s] : undefined);
                            if (branch === undefined) {
                                console.log("!!!!!!!!!!!!!!!!!! branch from " + name + " is undefined!");
                                return undefined;
                            }
                        }
                    }
                    return branch;
                };
                // example: get('i3d.space.model6')
                // example: get(['i3d', t, m])
                Models.prototype.get = function (path) {
                    return this.branch(path);
                };
                // example: add('i3d.space', 'model6', {...})
                // example: add(['i3d', t], 'model6', {...})
                Models.prototype.add = function (path, modelname, model) {
                    var branch = this.branch(path);
                    if (branch) {
                        branch[modelname] = model;
                        return true;
                    }
                    return undefined;
                };
                // example: remove('i3d.space.model6')
                // example: remove(['i3d', t, m])
                Models.prototype.remove = function (path) {
                    var branch = this.branch(path);
                    if (branch) {
                        branch = undefined;
                        return true;
                    }
                    return undefined;
                };
                Models = __decorate([
                    core_1.Injectable(),
                    __param(0, core_1.Inject(_config_1.CONFIG)), 
                    __metadata('design:paramtypes', [Object])
                ], Models);
                return Models;
            }());
            exports_1("Models", Models);
        }
    }
});
