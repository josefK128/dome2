System.register(['@angular/core', '../configs/@config', '../components/i3d/composite/space', '../components/i2d/composite/stage', '../components/i2d/composite/stage2', '../components/base/composite/bg', '../components/base/composite/bg2', '../components/base/composite/bg3', '../components/ui/composite/display', '../components/ui/composite/display2'], function(exports_1, context_1) {
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
    var core_1, _config_1, space_1, stage_1, stage2_1, bg_1, bg2_1, bg3_1, display_1, display2_1;
    var Templatecache;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_config_1_1) {
                _config_1 = _config_1_1;
            },
            function (space_1_1) {
                space_1 = space_1_1;
            },
            function (stage_1_1) {
                stage_1 = stage_1_1;
            },
            function (stage2_1_1) {
                stage2_1 = stage2_1_1;
            },
            function (bg_1_1) {
                bg_1 = bg_1_1;
            },
            function (bg2_1_1) {
                bg2_1 = bg2_1_1;
            },
            function (bg3_1_1) {
                bg3_1 = bg3_1_1;
            },
            function (display_1_1) {
                display_1 = display_1_1;
            },
            function (display2_1_1) {
                display2_1 = display2_1_1;
            }],
        execute: function() {
            let Templatecache = class Templatecache {
                constructor(cfg) {
                    this.config = cfg;
                    this.components = {
                        // i3d - single standard composite-component with mf template
                        'space': space_1.Space,
                        // i2d
                        'stage': stage_1.Stage,
                        'stage2': stage2_1.Stage2,
                        // base
                        'bg': bg_1.Bg,
                        'bg2': bg2_1.Bg2,
                        'bg3': bg3_1.Bg3,
                        // ui
                        'display': display_1.Display,
                        'display2': display2_1.Display2
                    };
                }
                //  get(name){
                //    if(name){
                //      if(this.components[name]){
                //        return this.components[name];
                //      }
                //    } 
                //    return undefined;
                //  }
                // if needed,create array of keys from dotted path string
                // path can be simple string such as 'i3d'
                // or a punctuated object-branch path such as 'i3d.space.model1'
                // or an array of object-branch keys such as ['i3d', 'space', 'model1']
                branch(path) {
                    var keys, branch = this.components;
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
                            console.log(`branch: key = ${s}  branch = ${branch}`);
                            branch = (branch[s] ? branch[s] : undefined);
                            if (branch === undefined) {
                                console.log(`!!!!!!!!!!!!!!!!!! branch from ${name} is undefined!`);
                                return undefined;
                            }
                        }
                    }
                    return branch;
                }
                // example: get('i3d.Space6')
                // example: get(['i3d', componentname])
                get(path) {
                    return this.branch(path);
                }
                // example: add('i3d.metaforms', 'MetaformK')
                // example: add(['i3d', category], MetaformK)
                add(path, modelname, model) {
                    var branch = this.branch(path);
                    if (branch) {
                        branch[modelname] = model;
                        return true;
                    }
                    return undefined;
                }
                // example: remove('i3d.metaforms.MetaformK')
                // example: remove(['i3d', category, componentname])
                remove(path) {
                    var branch = this.branch(path);
                    if (branch) {
                        branch = undefined;
                        return true;
                    }
                    return undefined;
                }
            };
            Templatecache = __decorate([
                core_1.Injectable(),
                __param(0, core_1.Inject(_config_1.CONFIG)), 
                __metadata('design:paramtypes', [Object])
            ], Templatecache);
            exports_1("Templatecache", Templatecache);
        }
    }
});
