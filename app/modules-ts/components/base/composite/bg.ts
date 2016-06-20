// bg.ts - base composite component - but no present child components
import {Component, Inject} from '@angular/core';

// configuration
import Config from '../../../configs/config.interface';
import {CONFIG} from '../../../configs/@config';

// services
import {Models} from '../../../services/models';
import {State} from '../../../services/state';
import {Animation} from '../../../services/animation';


@Component({
  selector: 'span',
  template: `
<div style="background: url('./images/sky.jpg'); width:100%; height:100%; background-size:cover; background-repeat:no-repeat; background-position:50% 50%">
  </div>`,
  providers: [],
})


export class Bg {
  config:Config;
  model:Object;
  state:State;
  animation:Animation;
  templatename:string;
  modelname:string;
  shot:Object;

  constructor(@Inject(CONFIG) cfg:Config, 
              models:Models,
              state:State, 
              animation:Animation){

    this.config = cfg;
    this.state = state;
    this.animation = animation;

    console.log(`state.path() = ${state.path()}`);
    this.templatename = state.template(state.path(), 'base');  // 'space'
    this.modelname = state.model(state.path(), 'base');  // 'model1'
    console.log(`######## this.templatename = ${this.templatename}`);
    console.log(`######## this.modelname = ${this.modelname}`);
    console.log(`models.get('base.${this.templatename}.${this.modelname}')`);
    this.model = models.get(`base.${this.templatename}.${this.modelname}`);
    if(this.model){
      this.shot = this.model['shot'];
    }
  }

  // ordered sequence of component lifecycle phase-transitions:
//  ngOnChanges() { console.log(` Bg ngOnChanges`); }
//  ngOnInit() { console.log(` Bg ngOnInit`); }
//  ngDoCheck() { console.log(` Bg ngDoCheck`); }
//  ngAfterContentInit() { console.log(` Bg ngAfterContentInit`); }
//  ngAfterContentChecked() { console.log(` Bg ngAfterContentChecked`); }
  ngAfterViewInit() { 
    console.log(`Bg ngAfterViewInit`); 
    if(this.shot){
      this.animation.perform(this.shot);   // this.shot is Object
    }
  }

//  ngAfterViewChecked() { console.log(` Bg ngAfterViewChecked`); }
//  ngOnDestroy() { console.log(` Bg ngOnDestroy`); }
}
