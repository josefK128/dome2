// templatecache.ts - angular rc1.0
import {Injectable, Inject} from '@angular/core';

// configuration
import Config from '../configs/config.interface';
import {CONFIG} from '../configs/@config';

// i3d template-components (scenes)
import {Space} from '../components/i3d/composite/space';
// ...

// i2d template-components (scenes)
import {Stage} from '../components/i2d/composite/stage';
import {Stage2} from '../components/i2d/composite/stage2';
// ...

// base template-components (scenes)
import {Bg} from '../components/base/composite/bg';
import {Bg2} from '../components/base/composite/bg2';
import {Bg3} from '../components/base/composite/bg3';

// ...
// ui template-components (scenes)
import {Display} from '../components/ui/composite/display';
import {Display2} from '../components/ui/composite/display2';



@Injectable()
export class Templatecache {
  config:any;
  components: Object;

  constructor(@Inject(CONFIG) cfg:Config) {
    this.config = cfg;
    this.components = {
      // i3d - single standard composite-component with mf template
      'space': Space,
      // i2d
      'stage': Stage,
      'stage2': Stage2,
      // base
      'bg': Bg,
      'bg2': Bg2,
      'bg3': Bg3,
      // ui
      'display': Display,
      'display2': Display2
    };
  }


//  get(name){
//    if(name){
//      if(this.components[name]){
//        return this.components[name];
//      }
//    } 
//    return undefined;
//  }

  // if needed,create array of keys from dotted path string
  // path can be simple string such as 'i3d'
  // or a punctuated object-branch path such as 'i3d.space.model1'
  // or an array of object-branch keys such as ['i3d', 'space', 'model1']
  branch(path){
    var keys:string[],
        branch:Object = this.components;

    console.log(`branch():path = ${path}`);
    if(!Array.isArray(path)){
      keys = (path.includes('.') ? path.split('.') : [path]);
      //keys = (pathstring.indexOf('.') > -1 ? pathstring.split('.') : [pathstring]);
      console.log(`Array.isArray(keys) = ${Array.isArray(keys)}`);
      console.log(`keys = ${keys}`);
    }else{
      keys = path;
    }

    // operate using array of branch keys
    for(let s of keys){
      // ignore key = ''
      if(s.length > 0){
        console.log(`branch: key = ${s}  branch = ${branch}`);
        branch = (branch[s] ? branch[s] : undefined);
        if(branch === undefined){
          console.log(`!!!!!!!!!!!!!!!!!! branch from ${name} is undefined!`);
          return undefined;
        }
      }
    }
    return branch;
  }

  // example: get('i3d.Space6')
  // example: get(['i3d', componentname])
  get(path){
    return this.branch(path);
  }

  // example: add('i3d.metaforms', 'MetaformK')
  // example: add(['i3d', category], MetaformK)
  add(path, modelname:string, model:Object){
    var branch = this.branch(path);
    if(branch){
      branch[modelname] = model;
      return true;
    }
    return undefined;
  }

  // example: remove('i3d.metaforms.MetaformK')
  // example: remove(['i3d', category, componentname])
  remove(path){
    var branch = this.branch(path);
    if(branch){
      branch = undefined;
      return true;
    }
    return undefined;
  }
}
