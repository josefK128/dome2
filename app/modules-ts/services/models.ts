// models.ts - angular rc1.0
import {Injectable, Inject} from '@angular/core';
// configuration
import Config from '../configs/config.interface';
import {CONFIG} from '../configs/@config';



@Injectable()
export class Models {
  model1:Object = {sphere1:{radius: 5},
                           sphere2:{radius:10}};
  model2:Object = {sphereA:{radius:20}};
  models:Object; 
  config: any;

  constructor(@Inject(CONFIG) cfg:Config) {
    this.models = {model1: this.model1,
                   model2: this.model2};
  }

  get(name){
    if(name){
      if(this.models[name]){
        return this.models[name];
      }
    } 
    return undefined;
  }
}
