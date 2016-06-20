import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

// services
import {Scores} from '../../services/scores';
import {Mediator} from '../../services/mediator';

// singleton instance
var scene;


@Component({
  template: ``,
  providers: [],
  directives: [CORE_DIRECTIVES],
  pipes: []
})
export class Scene {
  mediator: Mediator;
  scores: Scores;

  static changeState(templatename:string, score:string) {

    console.log(`Scene.changeState: templatename = ${templatename}`); 
    console.log(`Scene.changeState: score = ${score}`); 
    if(score[0] === '{'){
      score = JSON.parse(score);
    }else{
      score = scene.scores.get([templatename, score]);
    }
    scene.mediator.perform(score);
  }

  constructor(scores: Scores, 
              mediator: Mediator) {
    scene = this;
    scene.scores = scores;
    scene.mediator = mediator;
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
