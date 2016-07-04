//Text attribute-component
import {Component, Input} from '@angular/core';

@Component({
  selector: '[circle]',
  template: `
    <svg:text [attr.x]="x" 
              [attr.y]="y"  
              [attr.dx]="dx" 
              [attr.dy]="dy" 
              [attr.class]="class"
              [attr.style]="style"
              [attr.fill]="fill" 
              [attr.stroke]="stroke"
              [attr.stroke-width]="stroke_width"
              [attr.font-family]="font_family"
              [attr.font-size]="font_size" >
    </svg:text>
  `
})
export class Text {
  @Input() id:string;
  @Input() parent:Object;
  @Input() node:Object;
  @Input() model:Object;
  x:string;
  y:string;
  dx:string;
  dy:string;
  class:string;
  style:string;
  fill:string;
  stroke:string;
  stroke_width:string;
  font_family:string;
  font_size:string;
  //vertical text with chars normal orientation
  //style="writing-mode: tb;glyph-orientation-vertical: 0;"



  // ordered sequence of component lifecycle phase-transitions:
//  ngOnChanges() { console.log(`Text ngOnChanges`); }
  ngOnInit() { console.log(`Text ngOnInit`); }
//  ngDoCheck() { console.log(`Text ngDoCheck`); }
//  ngAfterContentInit() { console.log(`Text ngAfterContentInit`); }
//  ngAfterContentChecked() { console.log(`Text ngAfterContentChecked`); }
//  ngAfterViewInit() { console.log(`Text ngAfterViewInit`); }
//  ngAfterViewChecked() { console.log(`Text ngAfterViewChecked`); }
//  ngOnDestroy() { console.log(`Text ngOnDestroy`); }

}
