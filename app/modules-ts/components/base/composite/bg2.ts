// bg2.ts - base composite component - but no present child components
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
  <div style="background: url('images/glad.png'); width:100%; height:100%; background-size:cover; background-repeat:no-repeat; background-position:50% 50%; opacity:0.6">
  </div>`,
  providers: [],
})


export class Bg2 {
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

    console.log(`base compositie display2: state.path() = ${state.path()}`);
    this.templatename = state.template(state.path(), 'base');  // 'space'
    this.modelname = state.model(state.path(), 'base');  // 'model1'
    console.log(`models.get('base.${this.templatename}.${this.modelname}')`);
    this.model = models.get(`base.${this.templatename}.${this.modelname}`);
    console.log(`bg2: this.model is:`);
    console.dir(this.model);
  }

  // ordered sequence of component lifecycle phase-transitions:
//  ngOnChanges() { console.log(` Bg2 ngOnChanges`); }
//  ngOnInit() { console.log(` Bg2 ngOnInit`); }
//  ngDoCheck() { console.log(` Bg2 ngDoCheck`); }
//  ngAfterContentInit() { console.log(` Bg2 ngAfterContentInit`); }
//  ngAfterContentChecked() { console.log(` Bg2 ngAfterContentChecked`); }
  ngAfterViewInit() { 
    console.log(`Bg2 ngAfterViewInit`); 
    if(this.model['resolve']){
      this.model['resolve']('base-bg2');
    }else{
      throw(new Error("basemodel['resolve'] not found!"));
    }
}

//  ngAfterViewChecked() { console.log(` Bg2 ngAfterViewChecked`); }
//  ngOnDestroy() { console.log(` Bg2 ngOnDestroy`); }
}
