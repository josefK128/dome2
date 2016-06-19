System.register(['@angular/core', '@angular/common', '../../../configs/@config'], function(exports_1, context_1) {
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
    var core_1, common_1, _config_1;
    var Ui2;
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
            }],
        execute: function() {
            Ui2 = (function () {
                function Ui2(cfg) {
                    this.config = cfg;
                }
                Ui2 = __decorate([
                    core_1.Component({
                        selector: 'span',
                        template: "\n  <h4>ui2</h4>\n",
                        providers: [
                            core_1.provide(_config_1.CONFIG, { useValue: _config_1.config })
                        ],
                        directives: [common_1.CORE_DIRECTIVES],
                    }),
                    __param(0, core_1.Inject(_config_1.CONFIG)), 
                    __metadata('design:paramtypes', [Object])
                ], Ui2);
                return Ui2;
            }());
            exports_1("Ui2", Ui2);
        }
    }
});
