// models.ts - angular rc1.0
import {Injectable, Inject} from '@angular/core';

// configuration
import Config from '../configs/config.interface';
import {CONFIG} from '../configs/@config';

// models - i3d
import {Model1} from '../models/i3d/space/model1';
import {Model2} from '../models/i3d/space/model2';
import {Modelhead} from '../models/i3d/space/modelhead';
import {Modelteapot} from '../models/i3d/space/modelteapot';

// models - i2d
import {ModelA} from '../models/i2d/stage2/modelA';

// models - shot
import {s0} from '../models/shot/camera/s0';
import {yawflyByPIo3} from '../models/shot/camera/yawflyByPIo3';
import {yawflyByNegPIo3} from '../models/shot/camera/yawflyByNegPIo3';
import {yawflyByPIo6} from '../models/shot/camera/yawflyByPIo6';
import {yawflyByNegPIo6} from '../models/shot/camera/yawflyByNegPIo6';
import {yawcutByPIo3} from '../models/shot/camera/yawcutByPIo3';
import {yawcutByNegPIo3} from '../models/shot/camera/yawcutByNegPIo3';



@Injectable()
export class Models {
  config: any;
  models:Object;

  // NOTE: all templates must be listed and have defined ({}) sets of models
  constructor(@Inject(CONFIG) cfg:Config) {
    this.config = cfg;
    this.models = { 
      i3d: {
        space: {model1: Model1,  // multiple models per standard mf-template
                model2: Model2,
                modelhead: Modelhead,
                modelteapot: Modelteapot}
      },
      i2d: {stage: {},
            stage2: {modelA: ModelA}},
      base: {bg: {},
             bg2: {},
             bg3: {}},
      ui: {display: {},
           display2: {}},
      shot: {
        camera: {s0:s0,
                 yawflyByPIo3:yawflyByPIo3,
                 yawflyByNegPIo3:yawflyByNegPIo3,
                 yawflyByPIo6:yawflyByPIo6,
                 yawflyByNegPIo6:yawflyByNegPIo6,
                 yawcutByPIo3:yawcutByPIo3,
                 yawcutByNegPIo3:yawcutByNegPIo3
        }//camera
      }
    };
  }//ctor




  // if needed,create array of keys from dotted path string
  // path can be simple string such as 'i3d'
  // or a punctuated object-branch path such as 'i3d.space.model1'
  // or an array of object-branch keys such as ['i3d', 'space', 'model1']
  branch(path){
    var keys:string[],
        branch:Object = this.models;

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
        console.log(`branch: key = ${s}  branch = ${branch} branch[${s}] = ${branch[s]}`);
        branch = (branch[s] ? branch[s] : undefined);
        if(branch === undefined){
          console.log(`!!!!!!!!!!!!!!!!!! branch from ${name} is undefined!`);
          return undefined;
        }
      }
    }
    return branch;
  }

  // example: get('i3d.space.model6')
  // example: get(['i3d', t, m])
  get(path){
    return this.branch(path);
  }

  // example: add('i3d.space', 'model6', {...})
  // example: add(['i3d', t], 'model6', {...})
  add(path, modelname:string, model:Object){
    var branch = this.branch(path);
    if(branch){
      branch[modelname] = model;
      return true;
    }
    return undefined;
  }

  // example: remove('i3d.space.model6')
  // example: remove(['i3d', t, m])
  remove(path){
    var branch = this.branch(path);
    if(branch){
      branch = undefined;
      return true;
    }
    return undefined;
  }

}
