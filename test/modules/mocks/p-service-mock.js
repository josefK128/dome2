// p-service-mock.js 
// mock client-proxy of Phenotype-service
System.register(['angular2/core'], function(exports_1, context_1) {
    'use strict';
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
    var core_1;
    var P;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            P = (function () {
                function P(client, config) {
                    this.client = client;
                }
                // send axiom/genotype to Genotype service as JSON
                // o is object
                P.prototype.emit = function (o) {
                    var _this = this;
                    setTimeout(function () {
                        _this.client.receiveP(o);
                    }, 1000);
                };
                P = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [Object, Object])
                ], P);
                return P;
            }());
            exports_1("P", P);
            ; // class
        }
    }
});
