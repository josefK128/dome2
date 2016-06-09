// narrative.ts - angular rc1.0
import {Component, Injectable, Inject, provide} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

// router
import {
  ROUTER_PROVIDERS
} from '@angular/router';

// application
import Config from '../configs/config.interface';
import {CONFIG, config} from '../configs/@config';
import {CameraVR} from '../services/cameraVR';
import {State} from '../services/state';
import {Base} from './base/base';
import {I2d} from './i2d/i2d';
import {Circle} from './i2d/leaf/circle';
import {Rect} from './i2d/leaf/rect';
import {I3d} from './i3d/i3d';
// template
import template from './narrative.html';



@Component({
  selector: 'dome-narrative',
  //templateUrl: './app/modules-ts/components/narrative.html', 
  template: template,
  providers: [
    provide(CONFIG, {useValue: config}),
    ROUTER_PROVIDERS,
    CameraVR,
    State
  ],
  directives: [
    CORE_DIRECTIVES, 
    Base, I2d, I3d, Circle, Rect
  ]
})
@Injectable()
export class Narrative {
  static provider_defaults: any[];
  config: any;
  items: string[];
  f: Function;
  provider_defaults: any[];
  count: number = 0;
  cameraVR: any;
  state:State;


  constructor(@Inject(CONFIG) cfg:Config, 
              cameraVR:CameraVR,
              state:State
  ) {
    this.config = cfg || {};
    this.items = config.items || [];
    this.f = config.f || function(){Function.prototype;};
    Narrative.provider_defaults = config.provider_defaults || []; 
    this.cameraVR = cameraVR;
    this.state = state;
  }





















  // NOTE: !!!!!!!!
  // NOTE: later get url passed in on narrative.urlChange(url)  
  // fromstate-service or router url-change eventhandler.
  // Use the url to get the templatename used in I3d.changeScene(templatename)
  // NOTE: !!!!!!!!
  urlChange(url:string) {
  var canvas:any;
     
    console.log('\n\n\nurlChange!');
    console.log(`this.state.path() = ${this.state.path()}`);
    this.items = ['peach', 'raspberry', 'plum', 'pear'];
    //console.log(`config.canvas_id = ${this.config.canvas_id}`);
    canvas = document.getElementById(this.config.canvas_id);

    if(this.count%2 === 0){
      this.cameraVR.place(this.config.canvas_id,
                        this.config.opening_scene,
                        this,
                        this.config.scene);
                        I3d.changeScene('space');
    }else{
         this.cameraVR.place(this.config.canvas_id,
                        "scene two",
                        this,
                        Scene2);
                        I3d.changeScene('space2');
    }
    document.getElementById('counter').innerHTML = `count = ${++this.count}`;
  }

  // ordered sequence of component lifecycle phase-transitions:
  ngOnChanges() { console.log(`narrative ngOnChanges`); }

  ngOnInit() {
    console.log(`narrative ngOnInit`);
    console.log(`Narrative.provider_defaults isArray is ${Array.isArray(Narrative.provider_defaults)}`);
    console.log(`Narrative.provider_defaults[0] = ${Narrative.provider_defaults[0]}`); 
    for(let p in Narrative.provider_defaults[0]){
      console.log(`Narrative.provider_defaults[0] has property ${p} with val ${Narrative.provider_defaults[0][p]}`); 
    }
  }

//  ngDoCheck() { console.log(`narrative ngDoCheck`); }
//  ngAfterContentInit() { console.log(`narrative ngAfterContentInit`); }
//  ngAfterContentChecked() { console.log(`narrative ngAfterContentChecked`); }
//  ngAfterViewInit() { console.log(`narrative ngAfterViewInit`); }
//  ngAfterViewChecked() { console.log(`narrative ngAfterViewChecked`); }
//  ngOnDestroy() { console.log(`narrative ngOnDestroy`); }
}



