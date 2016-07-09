// textures.ts -service for texture-loading via url or cached name
import {Injectable, Inject} from '@angular/core';

// configuration
import Config from '../configs/config.interface';
import {CONFIG} from '../configs/@config';

// services - Mediator
import {Mediator} from './mediator';

// shaders and textures
import {vsh, fsh, fsh_filter} from '../views/webgl-defs'
import {Escher_png, glad_png, sky_jpg} from '../views/webgl-defs'



@Injectable()
export class Textures {
  config:Config;
  mediator:Mediator;


  constructor(@Inject(CONFIG) cfg:Config, mediator:Mediator) {
    this.config = cfg;
    this.mediator = mediator;
  }


  // load takes an http-url or cache texture name and returns a Promise whose 
  // resolve-f returns a ShaderMaterial used to apply the texture to geometry  
  load(url:string):Promise<any> {
    console.log(`Textures.load: url = ${url}`);








    return new Promise(function resolver(resolve, reject){
      console.log();
    });
  }
}
