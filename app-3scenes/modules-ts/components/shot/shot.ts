import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

// services
import {Models} from '../../services/models';
import {Animation} from '../../services/animation';

// singleton instance
var shot:Shot;


@Component({
  selector: 'dome-shot',
  template: ``,
  providers: [],
  directives: [CORE_DIRECTIVES],
  pipes: []
})
export class Shot {
  animation: Animation;
  models: Models;

  static changeState(substate:Object) {
     var templatename = substate['t'],
         _model = substate['m'],  // modelname
         model:Object;
    
    console.log(`Shot.changeState: templatename = ${templatename}`); 
    console.log(`Shot.changeState: _model = ${_model}`); 
    console.log(`Shot.changeState: _model[0] = ${_model[0]}`); 
    console.log(`_model is JSON-object is ${/^[\{%7B]/.test(_model)}`);
    console.log(`_model[0] is '{' is ${/\{/.test(_model[0])}`);
    console.log(`_model matches '%7B' is ${/^%7B/.test(_model)}`);
    if(/^[\{%7B]/.test(_model)){
      console.log(`Shot.changeState: _model is a JSON-object`);;
      model = JSON.parse(_model);
    }else{
      console.log(`Shot.changeState: _model is a shot-name`);;
      model = shot.models.get(['shot', templatename, _model]);
    }
    shot.animation.perform(model);
  }

  constructor(models: Models, 
              animation: Animation) {
    shot = this;
    shot.models = models;
    shot.animation = animation;
  }


  // ordered sequence of component lifecycle phase-transitions:
//  ngOnChanges() { console.log(`Ui ngOnChanges`); }
//  ngOnInit() { console.log(`Ui ngOnInit`); }
//  ngDoCheck() { console.log(` Ui ngDoCheck`); }
//  ngAfterContentInit() { console.log(` Ui ngAfterContentInit`);}
//  ngAfterContentChecked() { console.log(` Ui ngAfterContentChecked`); }
//  ngAfterViewInit() { console.log(` Ui ngAfterViewInit`); }
//  ngAfterViewChecked() { console.log(` Ui ngAfterViewChecked`); }
//  ngOnDestroy() { console.log(` Ui ngOnDestroy`); }
}
