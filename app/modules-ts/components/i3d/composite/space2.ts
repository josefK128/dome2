// Space2 component
// Space2-template is dynamically loaded under <dome-i3d> block
// which holds the canvas element
import {Component, Inject} from '@angular/core';

// configuration
import Config from '../../../configs/config.interface';
import {CONFIG} from '../../../configs/@config';

// services
import {Models} from '../../../services/models';
import {State} from '../../../services/state';
import {Camera3d} from '../../../services/camera3d';

// components
import {Sphere} from '../leaf/sphere';
import {Cone} from '../leaf/cone';
import {Cube} from '../leaf/cube';


@Component({
  selector: 'space',
  directives: [Sphere, Cone, Cube],
  providers: [],
  template: `
  <cone></cone>
  <cube></cube>
  <sphere id="sphereA" [model]="model"></sphere>
 `
})
export class Space2 {
  config:Config;
  model:Object;
  state:State;
  camera3d:Camera3d;
  templatename:string;
  modelname:string;


  // NOTE: Later URL or else cfg to get models name for template 'space2'
  // NOTE: if use cfg then this template is a 'genotype' with the application
  // of the model realizing the 'phenotype'
  constructor(@Inject(CONFIG) cfg:Config, 
              models:Models,
              state:State, 
              camera3d:Camera3d) {

    this.config = cfg;
    this.state = state;
    this.camera3d = camera3d;

    // this.model = models.get('model2');
    console.log(`state.path() = ${state.path()}`);
    this.templatename = state.template(state.path(), 'i3d');  // 'space2'
    this.modelname = state.model(state.path(), 'i3d');  // 'model2'
    console.log(`######## this.templatename = ${this.templatename}`);
    console.log(`######## this.modelname = ${this.modelname}`);
    console.log(`models.get('i3d.${this.templatename}.${this.modelname}')`);
    this.model = models.get(`i3d.${this.templatename}.${this.modelname}`);
  }


  // lifecycle
  // ordered sequence of component lifecycle phase-transitions:
  //ngOnChanges() { console.log(`Space2 ngOnChanges`); }
  //ngOnInit() { console.log(`\nSpace2 ngOnInit`);} 
  //ngDoCheck() { console.log(`Space2 ngDoCheck`); }
  //ngAfterContentInit() { console.log(`Space2 ngAfterContentInit`); }
  //ngAfterContentChecked() { console.log(`Space2 ngAfterContentChecked`); }
  ngAfterViewInit() { 
    console.log(`Space2 ngAfterViewInit`); 
    console.log(`i3d actors = ${this.camera3d.reportActors()}`);
  }
  //ngAfterViewChecked() { console.log(`Space2 ngAfterViewChecked`); }
  ngOnDestroy() { 
    console.log(`@@@@@@@ !!!!!!!!  Space2 ngOnDestroy`); 
    console.log(`before i3d actors = ${this.camera3d.reportActors()}`);
    this.camera3d.removeActorFromScene(this.templatename);
    console.log(`after i3d actors = ${this.camera3d.reportActors()}`);
  }
}
