System.register(['@angular/core', '../leaf/rect', '../leaf/circle'], function(exports_1, context_1) {
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
    var core_1, rect_1, circle_1;
    var Stage2;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (rect_1_1) {
                rect_1 = rect_1_1;
            },
            function (circle_1_1) {
                circle_1 = circle_1_1;
            }],
        execute: function() {
            /*
                 xmlns:i3d="http://www.i3Dmedia.org/2014/i3d"
                 xmlns:i2d="http://www.i3Dmedia.org/2014/i2d"
            */
            Stage2 = (function () {
                function Stage2() {
                }
                Stage2 = __decorate([
                    core_1.Component({
                        selector: 'stage',
                        directives: [rect_1.Rect, circle_1.Circle],
                        template: "\n<svg xmlns=\"http://www.w3.org/2000/svg\" \n     xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n     preserveAspectRatio=\"none\" \n     id=\"s\" \n     width=\"100%\" height=\"100%\" \n     viewBox=\"-50, -50, 100, 100\"> \n\n\n  <!-- plane is stage& axes vector space - used for scaling/translating -->\n  <g id=\"plane\" >\n  <g id=\"zoom_plane\" >\n\n    <g id=\"i2d\">\n      <circle cx=\"10\" cy=\"10\" r=\"20\" fill=\"blue\" opacity=\"0.7\" ></circle>\n      <g rect/>\n    </g>\n\n\n    <!-- 2D coordinate axes reference -->\n    <!-- turn on/off via top-left UI radio button -->\n    <!-- NOTE!!!!! correction in this case: should be x=\"-1000\" y=\"1000\" -->\n    <g id=\"axes\" style=\"display:block; pointer-events:none\">\n      <!-- for i3Dmedia.org tosca and cav-localhost -->\n      <image x=\"-913.25\" y=\"-913.25\" width=\"2100\" height=\"2100\" xlink:href=\"./svg/axes.svg\"/>\n      <!-- NOTE: prev. correction for tosca - Nov20 2014 - no longer needed -->\n      <!-- <image x=\"-1005\" y=\"-1005\" width=\"2100\" height=\"2100\" xlink:href=\"./svg/axes.svg\"/> -->\n    </g><!-- axes -->\n\n  </g><!-- zoom_plane -->    \n  </g><!-- plane -->    \n</svg><!-- s -->\n "
                    }), 
                    __metadata('design:paramtypes', [])
                ], Stage2);
                return Stage2;
            }());
            exports_1("Stage2", Stage2);
        }
    }
});
