// list.ts - base leaf component
import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';


@Component({
selector: 'h3',
  template: '<div *ngFor="let type of types" style="position:relative; z-index:0" >{{type}}</div>',
  providers: [],
  directives: [CORE_DIRECTIVES],
  pipes: []
})


export class List {
  types:string[];

  constructor() {
    this.types = ["cherry", "apricot", "apple"];
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
