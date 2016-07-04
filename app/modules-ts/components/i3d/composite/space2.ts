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
import {Animation} from '../../../services/animation';

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
export class Space2 {
  config:Config;
  model:Object;
  node:Object;
  state:State;
  camera3d:Camera3d;
  animation:Animation;
  templatename:string;
  modelname:string;
  shot:Object;


  constructor(@Inject(CONFIG) cfg:Config, 
              models:Models,
              state:State, 
              camera3d:Camera3d,
              animation:Animation){

    this.config = cfg;
    this.state = state;
    this.camera3d = camera3d;
    this.animation = animation;

    console.log(`\n\n###### space2: state.path() = ${state.path()}`);
    this.templatename = state.template(state.path(), 'i3d');  // 'space2'
    this.modelname = state.model(state.path(), 'i3d');  // 'model2'
    console.log(`this.templatename = ${this.templatename}`);
    console.log(`this.modelname = ${this.modelname}`);
    this.model = models.get(`i3d.${this.templatename}.${this.modelname}`);
    console.log('space2: this.model is:');
    console.dir(this.model);
    if(this.model){
      this.shot = this.model['shot'];
    }
    this.node = this.model['actors'];
    this.node['children'] = this.model['actors']['metaforms'];  // [] or [{},...]
    console.log('space2: this.node is:');
    console.dir(this.node);
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
    if(this.shot){
      this.animation.perform(this.shot);   // this.shot is Object
    }
  }
  //ngAfterViewChecked() { console.log(`Space2 ngAfterViewChecked`); }
  ngOnDestroy() { 
    console.log(`@@@@@@@ !!!!!!!!  Space2 ngOnDestroy`); 
    console.log(`before i3d actors = ${this.camera3d.reportActors()}`);
    this.camera3d.removeActorFromScene(this.templatename);
    console.log(`after i3d actors = ${this.camera3d.reportActors()}`);
  }
}
