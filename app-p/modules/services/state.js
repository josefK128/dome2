System.register(['@angular/core', '@angular/common', '../configs/@config', '../../../node_modules/url-template/lib/url-template.js'], function(exports_1, context_1) {
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
    var core_1, common_1, _config_1, url_template_js_1;
    var State;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (_config_1_1) {
                _config_1 = _config_1_1;
            },
            function (url_template_js_1_1) {
                url_template_js_1 = url_template_js_1_1;
            }],
        execute: function() {
            let State = class State {
                constructor(cfg, location) {
                    this.config = cfg;
                    this.pattern = url_template_js_1.default.parse(this.config.metastate);
                    this.location = location;
                }
                // return present address bar path (with leading '\' removed)
                // relies on location.path
                path() {
                    var _path = this.location.path();
                    _path = decodeURI(_path);
                    // if path.startsWith('/') remove it
                    if (/^\//.test(_path)) {
                        return _path.slice(1);
                    }
                    return _path;
                }
                // execute Location.go(path) - changes address bar and adds history entry
                go(path) {
                    this.location.go(path);
                }
                // substates object -> serialized state path
                stringify(substates) {
                    var state = {}, path;
                    for (let s of this.config.substates) {
                        state[s] = substates[s]['t'];
                        state[s] = substates[s]['t'] + ':';
                        substates[s]['m'] = substates[s]['m'] || '';
                        state[s] = substates[s]['t'] + ':' + substates[s]['m'];
                    }
                    path = this.pattern.expand(state);
                    console.log(`path = ${path}`);
                    if (/\/$/.test(path)) {
                        path = path.substring(0, path.length - 1);
                    }
                    if (/^\//.test(path)) {
                        return path.slice(1);
                    }
                    else {
                        return path;
                    }
                }
                // serialized state path -> substates object 
                // path must be well-formed according to config.metastate, i.e
                // scene/i3d/i2d/base/ui/shot where the substates are strings which could
                // be empty - all empty is the identity stateChange - i.e. 'no-change'
                // NOTE: '<scenename>/////' for the present scenename is also 'no-change'
                parse(path) {
                    var a = path.split('/'), substates = {}, index = 0, tuple, ta, template, ma, model;
                    for (let p of this.config.substates) {
                        // ''.split(':') yields [''] so tuple[0] = '' but tuple[1] undefined
                        // no more than a single split to 2 substrings in order to preserve
                        // models which are shots and thus contain ':' in their objects
                        tuple = a[index++].split(':');
                        // if shot and shot is a JSON-object reassemble its ':'-split parts
                        if (p === 'shot') {
                            if (tuple[1] && tuple[1].length > 0) {
                                ta = tuple.slice(0, 1); //returns tuple[0]
                                template = ta[0];
                                console.log(`state.parse: shot template=${template}`);
                                ma = tuple.slice(1); //returns tuple[1,...]
                                model = ma.join(":");
                                console.log(`state.parse: shot model=${model}`);
                                tuple[0] = template;
                                tuple[1] = model;
                            }
                        }
                        substates[p] = {};
                        substates[p]['t'] = tuple[0] || ''; // not really needed
                        substates[p]['m'] = tuple[1] || ''; // needed
                    }
                    return substates;
                }
                // convenience method to get specific substate template-component name
                template(path, substate) {
                    return this.parse(path)[substate]['t'];
                }
                // convenience method to get specific substate model name
                model(path, substate) {
                    return this.parse(path)[substate]['m'];
                }
            };
            State = __decorate([
                core_1.Injectable(),
                __param(0, core_1.Inject(_config_1.CONFIG)), 
                __metadata('design:paramtypes', [Object, (typeof (_a = typeof common_1.Location !== 'undefined' && common_1.Location) === 'function' && _a) || Object])
            ], State);
            exports_1("State", State);
        }
    }
    var _a;
});
