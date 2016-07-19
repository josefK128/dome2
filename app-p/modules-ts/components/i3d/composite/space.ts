// Space component
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

// generative components
import {Metaform3d} from '../generative/metaform3d';


@Component({
  selector: 'space',
  directives: [Metaform3d],
  providers: [],
  template: `
  <metaform3d [node]="node" [model]="model" [parent]="node.children"></metaform3d>
 `
})
export class Space {
  config:Config;
  model:Object;
  node:Object;
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

    console.log(`i3d compositie space: state.path() = ${state.path()}`);
    this.templatename = state.template(state.path(), 'i3d');  // 'space'
    this.modelname = state.model(state.path(), 'i3d');  // 'model2'
    this.model = models.get(`i3d.${this.templatename}.${this.modelname}`);
    console.log('space: this.model is:');
    console.dir(this.model);
    this.node = this.model;
    this.node['children'] = this.model['actors']; // [] or [{},...]
    console.log('space: this.node is:');
    console.dir(this.node);
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
