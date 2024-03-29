System.register(['@angular/core', '../configs/@config'], function(exports_1, context_1) {
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
    var core_1, _config_1;
    var oa, toString, Mixin;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_config_1_1) {
                _config_1 = _config_1_1;
            }],
        execute: function() {
            oa = ["object Array"], toString = Object.prototype.toString;
            let Mixin = class Mixin {
                constructor(cfg) {
                    this.config = cfg;
                }
                // Mixin.extend(o,m) => methods of m are singleton methods of object o<br>
                // Mixin.extend(F,m) => methods of m are static methods of F<br>
                // extend is a closure 
                extend(base, module) {
                    base = base || {};
                    module = module || {};
                    for (var p in module) {
                        if (module.hasOwnProperty(p)) {
                            if (typeof p === 'object') {
                                base[p] = (toString.call(p) === oa) ? [] : {};
                                this.extend(base[p], p);
                            }
                            else {
                                base[p] = module[p];
                            }
                        }
                    }
                }
                // Mixin.include(o,m) => methods of m are instance methods of 
                // every object with prototype o.prototype<br>
                // Object.include(F,m) => methods of m are instance methods of 
                // all instances created by the constructor F<br>
                // include is a closure 
                include(base, module) {
                    base = base || {};
                    base.prototype = base.prototype || {};
                    module = module || {};
                    for (var p in module) {
                        if (module.hasOwnProperty(p)) {
                            if (typeof p === 'object') {
                                base.prototype[p] = (toString.call(p) === oa) ? [] : {};
                                this.include(base.prototype[p], p);
                            }
                            else {
                                base.prototype[p] = module[p];
                            }
                        }
                    }
                }
                // extend_all is extend but for all ancestor properties 
                extend_all(base, module) {
                    base = base || {};
                    module = module || {};
                    for (var p in module) {
                        if (typeof p === 'object') {
                            base[p] = (toString.call(p) === oa) ? [] : {};
                            this.extend(base[p], p);
                        }
                        else {
                            base[p] = module[p];
                        }
                    }
                }
                // include_all is include but for all ancestor properties 
                include_all(base, module) {
                    base = base || {};
                    base.prototype = base.prototype || {};
                    module = module || {};
                    for (var p in module) {
                        if (typeof p === 'object') {
                            base.prototype[p] = (toString.call(p) === oa) ? [] : {};
                            this.include(base.prototype[p], p);
                        }
                        else {
                            base.prototype[p] = module[p];
                        }
                    }
                }
                // for unit test verification - does o contain property p
                verify(o, p) {
                    return (o[p] ? true : false);
                }
            };
            Mixin = __decorate([
                core_1.Injectable(),
                __param(0, core_1.Inject(_config_1.CONFIG)), 
                __metadata('design:paramtypes', [Object])
            ], Mixin);
            exports_1("Mixin", Mixin); //Mixin
        }
    }
});
