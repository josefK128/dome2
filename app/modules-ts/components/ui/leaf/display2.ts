// display2.ts - base leaf component
import {Component, Inject} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

// application
import Config from '../../../configs/config.interface';
import {CONFIG} from '../../../configs/@config';


@Component({
selector: 'span',
template: `
  <h4>display2</h4>
`,
  providers: [],
  directives: [CORE_DIRECTIVES],
})


export class Display2 {
  config:any;

  constructor(@Inject(CONFIG) cfg:Config){
    this.config = cfg;
  }

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
