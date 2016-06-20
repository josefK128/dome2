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
    console.log(`state.path: location.path() returns ${path}`);
    if(/^\//.test(path)){   // if path.startsWith('/') remove it
      //path = path.slice(1);
      //console.log(`state.path: path.slice(1) = ${path}`);
      //return path;  
      return path.slice(1);
    }
    return path;
  }

  go(path:string){
    this.location.go(path);
  }

  stringify(params:Object):string {
    return this.pattern.expand(params);
  }

  // path must be well-formed according to config.metastate, i.e
  // scene/i3d/i2d/base/ui/shot where the substates are strings which could
  // be empty - all empty is the identity stateChange - i.e. 'no-change'
  // NOTE: '<scenename>/////' for the present scenename is also 'no-change'
  parse(path:string):Object {
    var a:string[] = path.split('/'),
        substates:Object = {},
        index:number = 0,
        tuple:string[];

    for(let p of this.config.substates){
      // ''.split(':') yields [''] so tuple[0] = '' but tuple[1] undefined
      tuple = a[index++].split(':');
      substates[p] = {};
      substates[p]['t'] = tuple[0] || '';  // not really needed
      substates[p]['m'] = tuple[1] || '';  // needed
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
