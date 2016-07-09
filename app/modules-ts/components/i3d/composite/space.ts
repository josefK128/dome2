// Space attribute-component
// Space-template is dynamically loaded under <dome-i3d> block
// which holds the canvas element
import {Component, Inject} from '@angular/core';

// configuration
import Config from '../../../configs/config.interface';
import {CONFIG} from '../../../configs/@config';

// services
import {Models} from '../../../services/models';
import {State} from '../../../services/state';
import {Camera3d} from '../../../services/camera3d';

// leaf components
import {Sphere} from '../leaf/sphere';
import {Cone} from '../leaf/cone';
import {Cube} from '../leaf/cube';


@Component({
  selector: 'space',
  directives: [Sphere, Cone, Cube],
  providers: [],
  template: `
  <sphere id="sphere1" [model]="model" ></sphere>
  <sphere id="sphere2" [model]="model" ></sphere>
  <cone></cone> <cube></cube>
 `
})
export class Space {
  config:Config;
  model:Object;
  state:State;
  camera3d:Camera3d;
  templatename:string;
  modelname:string;
  shot:Object;


  constructor(@Inject(CONFIG) cfg:Config, 
              models:Models,
              state:State, 
              camera3d:Camera3d){

    this.config = cfg;
    this.state = state;
    this.camera3d = camera3d;

    console.log(`i3d composite space: state.path() = ${state.path()}`);
    this.templatename = state.template(state.path(), 'i3d');  // 'space'
    this.modelname = state.model(state.path(), 'i3d');  // 'model1'
    console.log(`models.get('i3d.${this.templatename}.${this.modelname}')`);
    this.model = models.get(`i3d.${this.templatename}.${this.modelname}`);
    console.log(`space: this.model is:`);
    console.dir(this.model);
  }

  // lifecycle
  // ordered sequence of component lifecycle phase-transitions:
  //ngOnChanges() { console.log(`Space ngOnChanges`); }
  //ngOnInit() { console.log(`\nSpace ngOnInit`);} 
  //ngDoCheck() { console.log(`Space ngDoCheck`); }
  //ngAfterContentInit() { console.log(`Space ngAfterContentInit`); }
  //ngAfterContentChecked() { console.log(`Space ngAfterContentChecked`); }
  ngAfterViewInit() { 
    console.log(`Space ngAfterViewInit`); 
    if(this.model['resolve']){
      this.model['resolve']('i3d-space'); 
    }else{
      throw(new Error("i3dmodel['resolve'] not found!"));
    }
  }
  //ngAfterViewChecked() { console.log(`Space ngAfterViewChecked`); }
  ngOnDestroy() { 
    console.log(`@@@@@@@ !!!!!!!!  Space ngOnDestroy`); 
    console.log(`before i3d actors = ${this.camera3d.reportActors()}`);
    this.camera3d.removeActorFromScene(this.templatename);
    console.log(`after i3d actors = ${this.camera3d.reportActors()}`);
  }  
}
