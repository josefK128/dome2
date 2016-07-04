// cameras.ts - angular rc1.0
import {Injectable, Inject} from '@angular/core';

// configuration
import Config from '../configs/config.interface';
import {CONFIG} from '../configs/@config';

// cameras
//import {Camera1} from '../cameras/simple/camera1';
//import {Camera2} from '../cameras/simple/camera2';




@Injectable()
export class Cameras {
  config: any;
  cameras:Object;

  constructor(@Inject(CONFIG) cfg:Config) {
    this.config = cfg;
    this.cameras = {
    //camera1: Camera1,
    //camera2: Camera2
    };
  }//ctor



  // if needed,create array of keys from dotted path string
  // path can be simple string such as 'i3d'
  // or a punctuated object-branch path such as 'simple.camera1'
  // or an array of object-branch keys such as ['simple', 'camera1']
  branch(path){
    var keys:string[],
        branch:Object = this.cameras;

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

  // example: get('simple.camera6')
  // example: get([category, cameraname])
  get(path){
    return this.branch(path);
  }

  // example: add('simple', 'camera6', (f(){})())
  // example: add('simple', 'camera6', {...})
  // example: add([t], 'camera', (f(){})())
  // example: add([t], 'camera6', {...})
  add(path, cameraname:string, camera:Object){
    var branch = this.branch(path);
    if(branch){
      branch[cameraname] = camera;
      return true;
    }
    return undefined;
  }

  // example: remove('simple.camera6')
  // example: remove([category, cameraname])
  remove(path){
    var branch = this.branch(path);
    if(branch){
      branch = undefined;
      return true;
    }
    return undefined;
  }

}
