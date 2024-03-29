System.register(['@angular/core'], function(exports_1, context_1) {
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
    var core_1;
    var Text;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            let Text = class Text {
                //vertical text with chars normal orientation
                //style="writing-mode: tb;glyph-orientation-vertical: 0;"
                // ordered sequence of component lifecycle phase-transitions:
                //  ngOnChanges() { console.log(`Text ngOnChanges`); }
                ngOnInit() { console.log(`Text ngOnInit`); }
            };
            __decorate([
                core_1.Input(), 
                __metadata('design:type', String)
            ], Text.prototype, "id", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Object)
            ], Text.prototype, "parent", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Object)
            ], Text.prototype, "node", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Object)
            ], Text.prototype, "model", void 0);
            Text = __decorate([
                core_1.Component({
                    selector: 'text',
                    template: ``
                }), 
                __metadata('design:paramtypes', [])
            ], Text);
            exports_1("Text", Text);
        }
    }
});
