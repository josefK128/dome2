// * mixin.ts - angular rc1.0
// * adds collection of methods to a given object<br> 
// (extend => singleton methods)<br>
// (include => instance methods)
import {Injectable, Inject} from '@angular/core';

// configuration
import Config from '../configs/config.interface';
import {CONFIG} from '../configs/@config';


var oa = ["object Array"],
    toString = Object.prototype.toString;
  


@Injectable()
export class Mixin {
  config: Config;

  constructor(@Inject(CONFIG) cfg:Config){
    this.config = cfg;
  }

  // Mixin.extend(o,m) => methods of m are singleton methods of object o<br>
  // Mixin.extend(F,m) => methods of m are static methods of F<br>
  // extend is a closure 
  extend(base, module){  
    base = base || {};
    module = module || {};
    for(var p in module){
      if(module.hasOwnProperty(p)){
        if(typeof p === 'object'){
          base[p] = (toString.call(p) === oa) ? [] : {};
          this.extend(base[p], p);
        }else{
          base[p] = module[p];
        }
      }
    }
  }

  // Mixin.include(o,m) => methods of m are instance methods of 
  // every object with prototype o.prototype<br>
  // Object.include(F,m) => methods of m are instance methods of 
  // all instances created by the constructor F<br>
  // include is a closure 
  include(base, module){  
    base = base || {};
    base.prototype = base.prototype || {};
    module = module || {};
    for(var p in module){
      if(module.hasOwnProperty(p)){
        if(typeof p === 'object'){
          base.prototype[p] = (toString.call(p) === oa) ? [] : {};
          this.include(base.prototype[p], p);
        }else{
          base.prototype[p] = module[p];
        }
      }
    }
  }

  // extend_all is extend but for all ancestor properties 
  extend_all(base, module){  
    base = base || {};
    module = module || {};
    for(var p in module){
      if(typeof p === 'object'){
        base[p] = (toString.call(p) === oa) ? [] : {};
        this.extend(base[p], p);
      }else{
        base[p] = module[p];
      }
    }
  }

  // include_all is include but for all ancestor properties 
  include_all(base, module){  
    base = base || {};
    base.prototype = base.prototype || {};
    module = module || {};
    for(var p in module){
      if(typeof p === 'object'){
        base.prototype[p] = (toString.call(p) === oa) ? [] : {};
        this.include(base.prototype[p], p);
      }else{
        base.prototype[p] = module[p];
      }
    }
  }

  // for unit test verification - does o contain property p
  verify(o,p){
    return(o[p] ? true : false);
  }
}//Mixin
