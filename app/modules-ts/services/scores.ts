// scores.ts - angular rc1.0
import {Injectable, Inject} from '@angular/core';

// configuration
import Config from '../configs/config.interface';
import {CONFIG} from '../configs/@config';

// scores
//import {Score1} from '../scores/simple/score1';
//import {Score2} from '../scores/simple/score2';




@Injectable()
export class Scores {
  config: any;
  scores:Object;

  constructor(@Inject(CONFIG) cfg:Config) {
    this.config = cfg;
    this.scores = {
    //score1: Score1,
    //score2: Score2
    };
  }//ctor



  // if needed,create array of keys from dotted path string
  // path can be simple string such as 'i3d'
  // or a punctuated object-branch path such as 'simple.score1'
  // or an array of object-branch keys such as ['simple', 'score1']
  branch(path){
    var keys:string[],
        branch:Object = this.scores;

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
      console.log(`branch: key = ${s}  branch = ${branch}`);
      branch = (branch[s] ? branch[s] : undefined);
      if(branch === undefined){
        console.log(`!!!!!!!!!!!!!!!!!! branch from ${name} is undefined!`);
        return undefined;
      }
    }
    return branch;
  }

  // example: get('simple.score6')
  // example: get([category, scorename])
  get(path){
    return this.branch(path);
  }

  // example: add('simple', 'score6', (f(){})())
  // example: add('simple', 'score6', {...})
  // example: add([t], 'score', (f(){})())
  // example: add([t], 'score6', {...})
  add(path, scorename:string, score:Object){
    var branch = this.branch(path);
    if(branch){
      branch[scorename] = score;
      return true;
    }
    return undefined;
  }

  // example: remove('simple.score6')
  // example: remove([category, scorename])
  remove(path){
    var branch = this.branch(path);
    if(branch){
      branch = undefined;
      return true;
    }
    return undefined;
  }

}
