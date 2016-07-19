//Circle attribute-component
import {Component} from '@angular/core';

@Component({
  selector: '[circle]',
  template: `
    <svg:circle [attr.r]="radius" cx="20" cy="20" stroke="black" fill="red"></svg:circle>
   <svg:rect x="-20" y="-20" [attr.width]="width" height="10" stroke="black" fill="green"></rect>
  `
})
export class Circle {
  radius: number = 10;
  width: number = 10;

  // ordered sequence of component lifecycle phase-transitions:
//  ngOnChanges() { console.log(`Circle ngOnChanges`); }
//  ngOnInit() { console.log(`Circle ngOnInit`); }
//  ngDoCheck() { console.log(`Circle ngDoCheck`); }
//  ngAfterContentInit() { console.log(`Circle ngAfterContentInit`); }
//  ngAfterContentChecked() { console.log(`Circle ngAfterContentChecked`); }
//  ngAfterViewInit() { console.log(`Circle ngAfterViewInit`); }
//  ngAfterViewChecked() { console.log(`Circle ngAfterViewChecked`); }
//  ngOnDestroy() { console.log(`Circle ngOnDestroy`); }

}
