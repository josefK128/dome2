// templatecache.ts - angular rc1.0
import {Injectable, Inject} from '@angular/core';
// configuration
import Config from '../configs/config.interface';
import {CONFIG} from '../configs/@config';

// i3d composite-template-components (scenes)
import {Space} from '../components/i3d/composite/space';
import {Space2} from '../components/i3d/composite/space2';
// ...
// i2d composite-template-components (scenes)
import {Stage} from '../components/i2d/composite/stage';
import {Stage2} from '../components/i2d/composite/stage2';
// ...
// base composite-template-components (scenes)
import {List} from '../components/base/composite/list';
import {List2} from '../components/base/composite/list2';
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
      // i3d
      'space': Space,
      'space2': Space2,
      // i2d
      'stage': Stage,
      'stage2': Stage2,
      // base
      'list': List,
      'list2': List2,
      // i2d
      //'display': Display,
      //'display2': Display2
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
