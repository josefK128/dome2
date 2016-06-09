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
    var Circles;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Circles = (function () {
                function Circles() {
                    this.circles = [
                        { x: 10, y: 10, radius: 5 },
                        { x: 20, y: 20, radius: 5 },
                        { x: 30, y: 30, radius: 5 }];
                    this.width = 10;
                }
                Circles = __decorate([
                    core_1.Component({
                        selector: '[circles]',
                        template: "\n   <svg:circle *ngFor=\"c of circles\" stroke=\"black\" fill=\"red\"\n     [attr.x]=\"c.x\", [attr.y]=\"c.y\", [attr.r]=\"c.radius\" ></svg:circle>\n   <svg:rect x=\"-20\" y=\"-20\" [attr.width]=\"width\" height=\"10\" stroke=\"black\" fill=\"green\"></rect>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], Circles);
                return Circles;
            }());
            exports_1("Circles", Circles);
        }
    }
});
