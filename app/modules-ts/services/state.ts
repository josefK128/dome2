// state.ts - angular rc1.0
import {Injectable, Inject} from '@angular/core';
import {Location} from '@angular/common';

// configuration
import Config from '../configs/config.interface';
import {CONFIG} from '../configs/@config';

// url-template
import PATH from '../../../node_modules/url-template/lib/url-template.js';


@Injectable()
export class State {
  config: any;
  location:Location;
  pattern:any;

  constructor(@Inject(CONFIG) cfg:Config,
              location:Location) {
                this.config = cfg;
                this.pattern = PATH.parse(this.config.metastate);
                this.location = location;
  }

  path(){
    var path = this.location.path();
    if(/^\//.test(path)){   // if path.startsWith('/') remove it
      return path.slice(1);  
    }
    return path;
  }

  go(url:string){
    this.location.go(url);
  }

  stringify(params:Object):string {
    return this.pattern.expand(params);
  }

  parse(path:string):Object {
    var a:string[] = path.split('/'),
        substates:Object = {},
        index:number = 0,
        tuple:string[];

    for(let p of this.config.substates){
      tuple = a[index++].split(':');
      substates[p] = {t: tuple[0], m: tuple[1]};
    }
    return substates;
  }

  template(path:string, substate:string){
    return this.parse(path)[substate]['t'];
  }

  model(path:string, substate:string){
    return this.parse(path)[substate]['m'];
  }
}
