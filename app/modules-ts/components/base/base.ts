import {Component, Input} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

@Component({
  selector: 'dome-base',
  template: '<div *ngFor="let type of types">{{type}}</div>',
  providers: [],
  directives: [CORE_DIRECTIVES],
  pipes: []
})


export class Base {
  @Input() types;
  //@Output() myEvent = new EventEmitter();

  constructor() {
    this.types = this.types || [];
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
