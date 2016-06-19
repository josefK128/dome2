// animation.ts - angular rc1.0
import {Injectable, Inject} from '@angular/core';

// configuration
import Config from '../configs/config.interface';
import {CONFIG} from '../configs/@config';

// GSAP
//


@Injectable()
export class Animation {
  config: any;
  //timeline:any;
  //tweenmax:any;

  constructor(@Inject(CONFIG) cfg:Config) {
    this.config = cfg;
  }


  perform(shot:Object){
    console.log(`Animation.perform: shot = ${shot}`);
  }
}
