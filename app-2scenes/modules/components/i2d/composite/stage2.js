System.register(['@angular/core', '../../../configs/@config', '../../../services/models', '../../../services/state', '../../../services/camera2d', '../leaf/rect', '../leaf/circle'], function(exports_1, context_1) {
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
    var core_1, _config_1, models_1, state_1, camera2d_1, rect_1, circle_1;
    var Stage2;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_config_1_1) {
                _config_1 = _config_1_1;
            },
            function (models_1_1) {
                models_1 = models_1_1;
            },
            function (state_1_1) {
                state_1 = state_1_1;
            },
            function (camera2d_1_1) {
                camera2d_1 = camera2d_1_1;
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
            let Stage2 = class Stage2 {
                constructor(cfg, models, state, camera2d) {
                    this.config = cfg;
                    this.state = state;
                    this.camera2d = camera2d;
                    console.log(`i2d composite stage2: state.path() = ${state.path()}`);
                    this.templatename = state.template(state.path(), 'i2d');
                    this.modelname = state.model(state.path(), 'i2d'); // 
                    this.model = models.get(`i2d.${this.templatename}.${this.modelname}`);
                    console.log(`stage2: this.model is:`);
                    console.dir(this.model);
                    //this.node = this.model['actors'];
                    //this.node['children'] = this.model['actors']['metaforms'];  // [] or [{},...]
                    //console.log('stage2: this.node is:');
                    //console.dir(this.node);
                }
                // ordered sequence of component lifecycle phase-transitions:
                //  ngOnChanges() { console.log(`Stage2 ngOnChanges`); }
                //  ngOnInit() { console.log(`Stage2 ngOnInit`); }
                //  ngDoCheck() { console.log(`Stage2 ngDoCheck`); }
                //  ngAfterContentInit() { console.log(`Stage2 ngAfterContentInit`); }
                //  ngAfterContentChecked() { console.log(`Stage2 ngAfterContentChecked`); }
                ngAfterViewInit() {
                    console.log(`Stage2 ngAfterViewInit`);
                    if (this.model['resolve']) {
                        this.model['resolve']('i2d-stage2');
                    }
                    else {
                        throw (new Error("i2dmodel['resolve'] not found!"));
                    }
                }
            };
            Stage2 = __decorate([
                core_1.Component({
                    selector: 'stage',
                    directives: [rect_1.Rect, circle_1.Circle],
                    template: `
<svg xmlns="http://www.w3.org/2000/svg" 
     xmlns:xlink="http://www.w3.org/1999/xlink"
     preserveAspectRatio="none" 
     id="s" 
     width="100%" height="100%" 
     viewBox="-50, -50, 100, 100"> 


  <!-- plane is stage& axes vector space - used for scaling/translating -->
  <g id="plane" >
  <g id="zoom_plane" >

    <g id="i2d" > 
      <circle cx="10" cy="10" r="20" fill="blue" opacity="0.7" ></circle>
      <g rect></g>
    </g>


    <!-- 2D coordinate axes reference -->
    <!-- turn on/off via top-left UI radio button -->
    <!-- NOTE!!!!! correction in this case: should be x="-1000" y="1000" -->
    <g id="axes" style="display:block; pointer-events:none" > 
      <!-- for i3Dmedia.org tosca and cav-localhost -->
      <image x="-913.25" y="-913.25" width="2100" height="2100" xlink:href="./svg/axes.svg"></image>
      <!-- NOTE: prev. correction for tosca - Nov20 2014 - no longer needed -->
      <!-- <image x="-1005" y="-1005" width="2100" height="2100" xlink:href="./svg/axes.svg"/> -->
    </g><!-- axes -->

  </g><!-- zoom_plane -->    
  </g><!-- plane -->    
</svg><!-- s -->
 `
                }),
                __param(0, core_1.Inject(_config_1.CONFIG)), 
                __metadata('design:paramtypes', [Object, models_1.Models, state_1.State, camera2d_1.Camera2d])
            ], Stage2);
            exports_1("Stage2", Stage2);
        }
    }
});
