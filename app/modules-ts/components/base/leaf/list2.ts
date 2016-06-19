// list2.ts - base leaf component
import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

@Component({
  selector: 'h3',
  template: '<div *ngFor="let type of types" >{{type}}</div>',
  providers: [],
  directives: [CORE_DIRECTIVES],
  pipes: []
})


export class List2 {
  types:string[];

  constructor() {
    this.types = ["peach", "raspberry", "plum", "pear", "strawberry"];
  }

  // ordered sequence of component lifecycle phase-transitions:
//  ngOnChanges() { console.log(` Base ngOnChanges this.types = ${this.types}`); }
//  ngOnInit() { console.log(` Base ngOnInit`); }
//  ngDoCheck() { console.log(` Base ngDoCheck`); }
//  ngAfterContentInit() { console.log(` Base ngAfterContentInit`); }
//  ngAfterContentChecked() { console.log(` Base ngAfterContentChecked`); }
//  ngAfterViewInit() { console.log(` Base ngAfterViewInit`); }
//  ngAfterViewChecked() { console.log(` Base ngAfterViewChecked`); }
//  ngOnDestroy() { console.log(` Base ngOnDestroy`); }
}
