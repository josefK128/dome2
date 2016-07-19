// scenes.ts - angular rc1.0
import {Injectable, Inject} from '@angular/core';

// configuration
import Config from '../configs/config.interface';
import {CONFIG} from '../configs/@config';

// scenes
import {Scene1} from '../scenes/simple/scene1';
import {Scene2} from '../scenes/simple/scene2';
import {Scene3} from '../scenes/simple/scene3';




@Injectable()
export class Scenes {
  config: any;
  scenes:Object;

  constructor(@Inject(CONFIG) cfg:Config) {
    this.config = cfg;
    this.scenes = {
      i3d: {
        scene1: Scene1,
        scene2: Scene2,
        scene3: Scene3
      },
      ivr: {},
    };
  }//ctor



  // if needed,create array of keys from dotted path string
  // path can be simple string such as 'i3d'
  // or a punctuated object-branch path such as 'simple.scene1'
  // or an array of object-branch keys such as ['simple', 'scene1']
  branch(path){
    var keys:string[],
        branch:Object = this.scenes;

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

  // example: get('i3d.simple.scene6')
  // example: get(['i3d', category, scenename])
  get(path){
    return this.branch(path);
  }

  // example: add('i3d.simple', 'scene6', (f(){})())
  // example: add('i3d.simple', 'scene6', {...})
  // example: add(['i3d', t], 'scene', (f(){})())
  // example: add(['i3d', t], 'scene6', {...})
  add(path, scenename:string, scene:Object){
    var branch = this.branch(path);
    if(branch){
      branch[scenename] = scene;
      return true;
    }
    return undefined;
  }

  // example: remove('i3d.simple.scene6')
  // example: remove(['i3d', category, scenename])
  remove(path){
    var branch = this.branch(path);
    if(branch){
      branch = undefined;
      return true;
    }
    return undefined;
  }

}
