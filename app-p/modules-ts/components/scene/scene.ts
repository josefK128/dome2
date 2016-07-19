import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

// services
import {Scores} from '../../services/scores';
import {Mediator} from '../../services/mediator';

// singleton instance
var scene;


@Component({
  selector: 'dome-scene',
  template: ``,
  providers: [],
  directives: [CORE_DIRECTIVES],
  pipes: []
})
export class Scene {
  mediator: Mediator;
  scores: Scores;

  static changeState(substate:Object):Promise<string> {

     var scenename = substate['t'],
         score = substate['m'],
         scenep = substate['tp'],           // previous scenename
         scorep = substate['mp'];          // previous score

    // score is JSON sequence of actions or a string-name for scores service
    if((scenename !== scenep) || (score !== scorep)){
      if(score[0] === '{'){
        score = JSON.parse(score);
      }else{
        score = scene.scores.get([scenename, score]);
      }
      if(score !== undefined){
        scene.mediator.perform(score);
      }else{
        console.log(`score with name = ${score} not found!`);
      }
    }
    return Promise.resolve('scene');
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
