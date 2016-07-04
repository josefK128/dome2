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


  // return present address bar path (with leading '\' removed)
  // relies on location.path
  path(){
    var _path = this.location.path();
    _path = decodeURI(_path);

    // if path.startsWith('/') remove it
    if(/^\//.test(_path)){  
      return _path.slice(1);
    }
    return _path;
  }


  // execute Location.go(path) - changes address bar and adds history entry
  go(path:string){
    this.location.go(path);
  }


  // substates object -> serialized state path
  stringify(substates:Object):string {
    var state:Object = {},
        path:string;

    for(let s of this.config.substates){
      state[s] = substates[s]['t'];
      state[s] = substates[s]['t'] + ':';
      substates[s]['m'] = substates[s]['m'] || '';
      state[s] = substates[s]['t'] + ':' + substates[s]['m'];
    }
    path = this.pattern.expand(state);
    console.log(`path = ${path}`);
    if(/\/$/.test(path)){   // if path.endsWith('/') remove it
      path = path.substring(0, path.length-1);
    }
    if(/^\//.test(path)){   // if path.startsWith('/') remove it
      return path.slice(1);
    }else{
      return path;
    }
  }


  // serialized state path -> substates object 
  // path must be well-formed according to config.metastate, i.e
  // scene/i3d/i2d/base/ui/shot where the substates are strings which could
  // be empty - all empty is the identity stateChange - i.e. 'no-change'
  // NOTE: '<scenename>/////' for the present scenename is also 'no-change'
  parse(path:string):Object {
    var a:string[] = path.split('/'),
        substates:Object = {},
        index:number = 0,
        tuple:string[],
        ta:string[],
        template:string,
        ma:string[],
        model:string;

    for(let p of this.config.substates){

      // ''.split(':') yields [''] so tuple[0] = '' but tuple[1] undefined
      // no more than a single split to 2 substrings in order to preserve
      // models which are shots and thus contain ':' in their objects
      tuple = a[index++].split(':'); 

      // if shot and shot is a JSON-object reassemble its ':'-split parts
      if(p === 'shot'){
        if(tuple[1] && tuple[1].length > 0){
          ta = tuple.slice(0,1);  //returns tuple[0]
          template = ta[0]; 
          console.log(`state.parse: shot template=${template}`);
          ma = tuple.slice(1);  //returns tuple[1,...]
          model = ma.join(":");
          console.log(`state.parse: shot model=${model}`);
          tuple[0] = template;
          tuple[1] = model;
        }
      }
      substates[p] = {};
      substates[p]['t'] = tuple[0] || '';  // not really needed
      substates[p]['m'] = tuple[1] || '';  // needed
    }
    return substates;
  }


  // convenience method to get specific substate template-component name
  template(path:string, substate:string){
    return this.parse(path)[substate]['t'];
  }


  // convenience method to get specific substate model name
  model(path:string, substate:string){
    return this.parse(path)[substate]['m'];
  }
}
