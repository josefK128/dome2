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
  config: any;
  camera3d: Camera3d;
  camera2d: Camera2d;
  //timeline:any;
  //tweenmax:any;

  constructor(@Inject(CONFIG) cfg:Config,
              camera3d:Camera3d, camera2d:Camera2d) {
    this.config = cfg;
    this.camera3d = camera3d;
    this.camera2d = camera2d;
  }


  perform(shot:Object){
    console.log(`Animation.perform: shot = ${shot}`);
  }
}
