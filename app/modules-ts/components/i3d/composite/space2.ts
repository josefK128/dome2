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

// components
import {Sphere} from '../leaf/sphere';
import {Cone} from '../leaf/cone';
import {Cube} from '../leaf/cube';


@Component({
  selector: 'space',
  directives: [Sphere, Cone, Cube],
  providers: [Models, State],
  template: `
  <cone></cone>
  <cube></cube>
  <sphere id="sphereA" [model]="model"></sphere>
 `
})
export class Space2 {
  config:any;
  model:Object;
  state:State;


  // NOTE: Later URL or else cfg to get models name for template 'space2'
  // NOTE: if use cfg then this template is a 'genotype' with the application
  // of the model realizing the 'phenotype'
  constructor(@Inject(CONFIG) cfg:Config, 
              models:Models,
              state:State) {
    this.config = cfg || {};
    this.model = models.get('model2'); 
    this.state = state; 
  }

  // ordered sequence of component lifecycle phase-transitions:
//  ngOnChanges() { console.log(`Space2 ngOnChanges`); }

  ngOnInit() { 
  console.log(`\n#### Space2 ngOnInit`); 
    console.log(`url = ${this.state.path()}`);
    console.log(`this.model = ${this.model}`);
    for(var p in this.model){
      console.log(`this.model has property ${p} with val ${this.model[p]}`);
    }
  }

//  ngDoCheck() { console.log(`Space2 ngDoCheck`); }
//  ngAfterContentInit() { console.log(`Space2 ngAfterContentInit`); }
//  ngAfterContentChecked() { console.log(`Space2 ngAfterContentChecked`); }
//  ngAfterViewInit() { console.log(`Space2 ngAfterViewInit`); }
//  ngAfterViewChecked() { console.log(`Space2 ngAfterViewChecked`); }
//  ngOnDestroy() { console.log(`Space2 ngOnDestroy`); }
}
