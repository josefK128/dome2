import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

// services
import {Models} from '../../services/models';
import {Animation} from '../../services/animation';

// singleton instance
var shot;


@Component({
  template: ``,
  providers: [],
  directives: [CORE_DIRECTIVES],
  pipes: []
})
export class Shot {
  animation: Animation;
  models: Models;

  static changeState(templatename:string, _shot:string) {
    var tuple:string[];
    console.log(`Shot.changeState: templatename = ${templatename}`); 
    console.log(`Shot.changeState: _shot = ${_shot}`); 
    if(_shot[0] === '{'){
      _shot = JSON.parse(_shot);
    }else{
      tuple = _shot.split(':');
      tuple[1] = tuple[1] || '';     // if shot = 't:' only
      _shot = shot.models.get(['shot', templatename, tuple[0], tuple[1]]);
    }
    shot.animation.perform(_shot);
  }

  constructor(models: Models, 
              animation: Animation) {
    shot = this;
    shot.models = models;
    shot.animation = animation;
  }


  // ordered sequence of component lifecycle phase-transitions:
//  ngOnChanges() { 
//    console.log(`Ui ngOnChanges`); 
//  }
//  ngOnInit() { 
//    console.log(`Ui ngOnInit`); 
//  }
//  ngDoCheck() { console.log(` Ui ngDoCheck`); }
//  ngAfterContentInit() { 
//    console.log(` Ui ngAfterContentInit`);
//  }
//  ngAfterContentChecked() { 
//    console.log(` Ui ngAfterContentChecked`); 
//  }
//  ngAfterViewInit() { console.log(` Ui ngAfterViewInit`); }
//  ngAfterViewChecked() { console.log(` Ui ngAfterViewChecked`); }
//  ngOnDestroy() { console.log(` Ui ngOnDestroy`); }
}
