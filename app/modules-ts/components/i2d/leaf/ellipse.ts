//Ellipse attribute-component
import {Component, Input} from '@angular/core';

@Component({
  selector: '[ellipse]',
  template: `
    <svg:ellipse [attr.cx]="cx" 
                [attr.cy]="cy"  
                [attr.rx]="rx" 
                [attr.ry]="ry" 
                [attr.class]="class"
                [attr.style]="style"
                [attr.fill]="fill" 
                [attr.stroke]="stroke"
                [attr.strokewidth]="strokewidth">
    </svg:ellipse>
  `
})
export class Ellipse {
  @Input() id:string;
  @Input() parent:Object;
  @Input() node:Object;
  @Input() model:Object;
  cx:string;
  cy:string;
  rx:string;
  ry:string;
  class:string;
  style:string;
  fill:string;
  stroke:string;
  strokewidth:string;



  // ordered sequence of component lifecycle phase-transitions:
//  ngOnChanges() { console.log(`Ellipse ngOnChanges`); }
  ngOnInit() { console.log(`Ellipse ngOnInit`); }
//  ngDoCheck() { console.log(`Ellipse ngDoCheck`); }
//  ngAfterContentInit() { console.log(`Ellipse ngAfterContentInit`); }
//  ngAfterContentChecked() { console.log(`Ellipse ngAfterContentChecked`); }
//  ngAfterViewInit() { console.log(`Ellipse ngAfterViewInit`); }
//  ngAfterViewChecked() { console.log(`Ellipse ngAfterViewChecked`); }
//  ngOnDestroy() { console.log(`Ellipse ngOnDestroy`); }

}
