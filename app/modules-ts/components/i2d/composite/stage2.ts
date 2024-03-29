//Stage2 component
// Stage2-template is dynamically loaded under <dome-i2d> block
import {Component, Inject} from '@angular/core';

// configuration
import Config from '../../../configs/config.interface';
import {CONFIG} from '../../../configs/@config';

// services
import {Models} from '../../../services/models';
import {State} from '../../../services/state';
import {Camera2d} from '../../../services/camera2d';


// leaf components
import {Rect} from '../leaf/rect';
import {Circle} from '../leaf/circle';
/*
     xmlns:i3d="http://www.i3Dmedia.org/2014/i3d" 
     xmlns:i2d="http://www.i3Dmedia.org/2014/i2d" 
*/

@Component({
  selector: 'stage',
  directives: [Rect, Circle],
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
})
export class Stage2 {
  config:Config;
  model:Object;
  state:State;
  camera2d:Camera2d;
  templatename:string;
  modelname:string;
  shot:Object;


  constructor(@Inject(CONFIG) cfg:Config, 
              models:Models,
              state:State,
              camera2d:Camera2d){

    this.config = cfg;
    this.state = state;
    this.camera2d = camera2d;
    console.log(`i2d composite stage2: state.path() = ${state.path()}`);
    this.templatename = state.template(state.path(), 'i2d');
    this.modelname = state.model(state.path(), 'i2d');  // 
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
    if(this.model['resolve']){
      this.model['resolve']('i2d-stage2');
    }else{
      throw(new Error("i2dmodel['resolve'] not found!"));
    }
}

//  ngAfterViewChecked() { console.log(`Stage2 ngAfterViewChecked`); }
//  ngOnDestroy() { console.log(`Stage2 ngOnDestroy`); }
}
