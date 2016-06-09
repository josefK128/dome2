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
                this.pattern = PATH.parse(this.config.url_pattern);
                this.location = location;
  }

  path(){
  var params:Object = {scene:'scene1', i3d:'space~model1', shot:''},
      url:string,
      _params:Object = {};

    console.log(`state.path: PATH = ${PATH}`);  
    console.log(`state.path: url_pattern = ${this.config.url_pattern}`);  
    console.log(`state.path: this.pattern = ${this.pattern}`);  
    for(var p in params){
      console.log(`params has property ${p} with val ${params[p]}`);
    }
    url = this.stringify(params);
    console.log(`state.path: url = ${url}`);  
    _params = this.parse(url);
    for(var p in _params){
      console.log(`_params has property ${p} with val ${_params[p]}`);
    }
    url = this.stringify(_params);
    console.log(`state.path: (for _params) url = ${url}`);

    return this.location.path();
  }

  go(url:string){
    this.location.go(url);
  }

  stringify(params:Object):string {
    return this.pattern.expand(params);
  }

  parse(path:string):Object {
    var a:string[] = path.split('/'),
        params:Object = {},
        index:number = 0;

    for(let p of this.config.url_keys){
      params[p] = a[index++];
    }
    return params;
  }
}
