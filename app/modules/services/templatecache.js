System.register(['@angular/core', '../configs/@config', '../components/i3d/composite/space', '../components/i3d/composite/space2'], function(exports_1, context_1) {
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
    var core_1, _config_1, space_1, space2_1;
    var cache, Templatecache;
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
            function (space2_1_1) {
                space2_1 = space2_1_1;
            }],
        execute: function() {
            // ...
            // reference to singleton instance of Templatecache
            Templatecache = (function () {
                function Templatecache(cfg) {
                    cache = this;
                    cache.config = cfg || {};
                    cache.components = {
                        'space': space_1.Space,
                        'space2': space2_1.Space2
                    };
                }
                Templatecache.prototype.get = function (name) {
                    if (name) {
                        if (cache.components[name]) {
                            return cache.components[name];
                        }
                    }
                    return undefined;
                };
                Templatecache = __decorate([
                    core_1.Injectable(),
                    __param(0, core_1.Inject(_config_1.CONFIG)), 
                    __metadata('design:paramtypes', [Object])
                ], Templatecache);
                return Templatecache;
            }());
            exports_1("Templatecache", Templatecache);
        }
    }
});
