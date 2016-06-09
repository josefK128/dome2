// templatecache.ts - angular rc1.0
import {Injectable, Inject} from '@angular/core';
// configuration
import Config from '../configs/config.interface';
import {CONFIG} from '../configs/@config';

// composite-template-components (scenes)
import {Space} from '../components/i3d/composite/space';
import {Space2} from '../components/i3d/composite/space2';
// ...


// reference to singleton instance of Templatecache
var cache;


@Injectable()
export class Templatecache {
  // properties
  config: any;
  components: Object;

  constructor(@Inject(CONFIG) cfg:Config) {
    cache = this;
    cache.config = cfg || {};
    cache.components = {
      'space': Space,
      'space2': Space2
    };
  }

  get(name){
    if(name){
      if(cache.components[name]){
        return cache.components[name];
      }
    } 
    return undefined;
  }
}
