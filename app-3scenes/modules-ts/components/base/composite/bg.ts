// bg.ts - base composite component - but no present child components
import {Component, Inject} from '@angular/core';

// configuration
import Config from '../../../configs/config.interface';
import {CONFIG} from '../../../configs/@config';

// services
import {Models} from '../../../services/models';
import {State} from '../../../services/state';


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
  templatename:string;
  modelname:string;
  shot:Object;

  constructor(@Inject(CONFIG) cfg:Config, 
              models:Models,
              state:State){

    this.config = cfg;
    this.state = state;

    console.log(`base composite bg: state.path() = ${state.path()}`);
    this.templatename = state.template(state.path(), 'base');  // 'space'
    this.modelname = state.model(state.path(), 'base');  // 'model1'
    console.log(`models.get('base.${this.templatename}.${this.modelname}')`);
    this.model = models.get(`base.${this.templatename}.${this.modelname}`);
    console.log(`bg: this.model is:`);
    console.dir(this.model);
  }

  // ordered sequence of component lifecycle phase-transitions:
//  ngOnChanges() { console.log(` Bg ngOnChanges`); }
//  ngOnInit() { console.log(` Bg ngOnInit`); }
//  ngDoCheck() { console.log(` Bg ngDoCheck`); }
//  ngAfterContentInit() { console.log(` Bg ngAfterContentInit`); }
//  ngAfterContentChecked() { console.log(` Bg ngAfterContentChecked`); }
  ngAfterViewInit() { 
    console.log(`Bg ngAfterViewInit`); 
    if(this.model['resolve']){
      this.model['resolve']('base-bg');
    }else{
      throw(new Error("basemodel['resolve'] not found!"));
    }
  }

//  ngAfterViewChecked() { console.log(` Bg ngAfterViewChecked`); }
//  ngOnDestroy() { console.log(` Bg ngOnDestroy`); }
}
