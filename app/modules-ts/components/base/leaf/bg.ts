// bg.ts - base leaf component
import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';


@Component({
selector: 'span',
template: `
<div style="background: url('./images/sky.jpg'); width:100%; height:100%; background-size:cover; background-repeat:no-repeat; background-position:50% 50%">
  </div>`,
  providers: [],
  directives: [CORE_DIRECTIVES],
})


export class Bg {

  // ordered sequence of component lifecycle phase-transitions:
//  ngOnChanges() { console.log(` Base ngOnChanges`); }
//  ngOnInit() { console.log(` Base ngOnInit`); }
//  ngDoCheck() { console.log(` Base ngDoCheck`); }
//  ngAfterContentInit() { console.log(` Base ngAfterContentInit`); }
//  ngAfterContentChecked() { console.log(` Base ngAfterContentChecked`); }
//  ngAfterViewInit() { console.log(` Base ngAfterViewInit`); }
//  ngAfterViewChecked() { console.log(` Base ngAfterViewChecked`); }
//  ngOnDestroy() { console.log(` Base ngOnDestroy`); }
}