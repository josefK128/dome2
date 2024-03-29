// display2.ts - ui composite component - but no present child components
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
  <h4>display2</h4>
`,
  providers: [],
})


export class Display2 {
  config:any;
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

    console.log(`ui composite display2 state.path() = ${state.path()}`);
    this.templatename = state.template(state.path(), 'ui'); 
    this.modelname = state.model(state.path(), 'ui');  
    console.log(`models.get('ui.${this.templatename}.${this.modelname}')`);
    this.model = models.get(`ui.${this.templatename}.${this.modelname}`);
    console.log(`display2: this.model is:`);
    console.dir(this.model);
 }

  // ordered sequence of component lifecycle phase-transitions:
//  ngOnChanges() { console.log(` Display2 ngOnChanges`); }
//  ngOnInit() { console.log(` Display2 ngOnInit`); }
//  ngDoCheck() { console.log(` Display2 ngDoCheck`); }
//  ngAfterContentInit() { console.log(` Display2 ngAfterContentInit`); }
//  ngAfterContentChecked() { console.log(` Display2 ngAfterContentChecked`); }
  ngAfterViewInit() { 
    console.log(`Display2 ngAfterViewInit`); 
    if(this.model['resolve']){
      this.model['resolve']('ui-display2');
    }else{
      throw(new Error("uimodel['resolve'] not found!"));
    }
  }

//  ngAfterViewChecked() { console.log(` Display2 ngAfterViewChecked`); }
//  ngOnDestroy() { console.log(` Display2 ngOnDestroy`); }
}
