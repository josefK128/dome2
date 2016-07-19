// animation.ts - angular rc1.0
import {Injectable, Inject} from '@angular/core';

// configuration
import Config from '../configs/config.interface';
import {CONFIG} from '../configs/@config';

// services - cameras in order to obtains refs to actors
import {Camera3d} from './camera3d';
import {Camera2d} from './camera2d';

// GSAP
//


@Injectable()
export class Animation {
  config:Config;
  camera3d:Camera3d;
  camera2d:Camera2d;
  //timeline:any;
  //tweenmax:any;

  constructor(@Inject(CONFIG) cfg:Config,
              camera3d:Camera3d, camera2d:Camera2d) {
    this.config = cfg;
    this.camera3d = camera3d;
    this.camera2d = camera2d;
  }


  perform(shot:Object){
    console.log(`Animation.perform: typeof shot = ${shot}`);
    console.log(`Animation.perform: shot = ${JSON.stringify(shot)}`);
    // diagnostics
    //this.camera3d.report_visibility();
    console.log(`key.color.r = ${this.camera3d.light('key').color.r}`);
    console.log(`key.color.g = ${this.camera3d.light('key').color.g}`);
    console.log(`key.color.b = ${this.camera3d.light('key').color.b}`);
    console.log(`fill.color.r = ${this.camera3d.light('fill').color.r}`);
    console.log(`fill.color.g = ${this.camera3d.light('fill').color.g}`);
    console.log(`fill.color.b = ${this.camera3d.light('fill').color.b}`);
    console.log(`back.color.r = ${this.camera3d.light('back').color.r}`);
    console.log(`back.color.g = ${this.camera3d.light('back').color.g}`);
    console.log(`back.color.b = ${this.camera3d.light('back').color.b}`);
  }
}
