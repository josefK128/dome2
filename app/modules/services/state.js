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
            State = (function () {
                function State(cfg, location) {
                    this.config = cfg;
                    this.pattern = url_template_js_1.default.parse(this.config.metastate);
                    this.location = location;
                }
                State.prototype.path = function () {
                    var path = this.location.path();
                    if (/^\//.test(path)) {
                        return path.slice(1);
                    }
                    return path;
                };
                State.prototype.go = function (url) {
                    this.location.go(url);
                };
                State.prototype.stringify = function (params) {
                    return this.pattern.expand(params);
                };
                State.prototype.parse = function (path) {
                    var a = path.split('/'), substates = {}, index = 0, tuple;
                    for (var _i = 0, _a = this.config.substates; _i < _a.length; _i++) {
                        var p = _a[_i];
                        tuple = a[index++].split(':');
                        substates[p] = { t: tuple[0], m: tuple[1] };
                    }
                    return substates;
                };
                State.prototype.template = function (path, substate) {
                    return this.parse(path)[substate]['t'];
                };
                State.prototype.model = function (path, substate) {
                    return this.parse(path)[substate]['m'];
                };
                State = __decorate([
                    core_1.Injectable(),
                    __param(0, core_1.Inject(_config_1.CONFIG)), 
                    __metadata('design:paramtypes', [Object, (typeof (_a = typeof common_1.Location !== 'undefined' && common_1.Location) === 'function' && _a) || Object])
                ], State);
                return State;
                var _a;
            }());
            exports_1("State", State);
        }
    }
});
