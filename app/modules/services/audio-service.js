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
    var bracket, parts, Audio;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_config_1_1) {
                _config_1 = _config_1_1;
            }],
        execute: function() {
            // auxiliary function to wrap single text as array
            bracket = function (text) {
                return Array.isArray(text) ? text : [text];
            };
            Audio = (function () {
                function Audio(cfg) {
                    this.config = cfg;
                }
                // male/female(F)
                // exp: english => male,  englishF => female
                // english/englishF
                Audio.prototype.english = function (text) {
                    parts = [];
                    bracket(text).forEach(function (t, i) {
                        parts[i] = { text: t, voice: "en/en-us", variant: "m3" };
                    });
                    meSpeak.speakMultipart(parts, { pitch: 30, speed: 120 });
                };
                Audio.prototype.englishF = function (text) {
                    parts = [];
                    bracket(text).forEach(function (t, i) {
                        parts[i] = { text: t, voice: "en/en-us", variant: "f5" };
                    });
                    meSpeak.speakMultipart(parts, { pitch: 60, speed: 100 });
                };
                // francais/francaisF
                Audio.prototype.francais = function (text) {
                    parts = [];
                    bracket(text).forEach(function (t, i) {
                        parts[i] = { text: t, voice: "fr", variant: "m3" };
                    });
                    meSpeak.speakMultipart(parts, { pitch: 30, speed: 120 });
                };
                Audio.prototype.francaisF = function (text) {
                    parts = [];
                    bracket(text).forEach(function (t, i) {
                        parts[i] = { text: t, voice: "fr", variant: "f5" };
                    });
                    meSpeak.speakMultipart(parts, { pitch: 60, speed: 100 });
                };
                // deutsch/deutschF
                Audio.prototype.deutsch = function (text) {
                    parts = [];
                    bracket(text).forEach(function (t, i) {
                        parts[i] = { text: t, voice: "de", variant: "m3" };
                    });
                    meSpeak.speakMultipart(parts, { pitch: 30, speed: 120 });
                };
                Audio.prototype.deutschF = function (text) {
                    parts = [];
                    bracket(text).forEach(function (t, i) {
                        parts[i] = { text: t, voice: "de", variant: "f5" };
                    });
                    meSpeak.speakMultipart(parts, { pitch: 60, speed: 100 });
                };
                // default - speak
                Audio.prototype.speak = function (text) {
                    this.english(text);
                };
                Audio = __decorate([
                    core_1.Injectable(),
                    __param(0, core_1.Inject(_config_1.CONFIG)), 
                    __metadata('design:paramtypes', [Object])
                ], Audio);
                return Audio;
            }());
            exports_1("Audio", Audio); //Audio;
        }
    }
});
