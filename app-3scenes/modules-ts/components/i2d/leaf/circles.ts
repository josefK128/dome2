//Circles attribute-component
import {Component} from '@angular/core';

@Component({
  selector: '[circles]',
  template: `
   <svg:circle *ngFor="c of circles" stroke="black" fill="red"
     [attr.x]="c.x", [attr.y]="c.y", [attr.r]="c.radius" ></svg:circle>
   <svg:rect x="-20" y="-20" [attr.width]="width" height="10" stroke="black" fill="green"></rect>
  `
})
export class Circles {
  circles: any[] = [
    {x:10, y:10, radius:5},
    {x:20, y:20, radius:5},
    {x:30, y:30, radius:5}];
  width: number = 10;

  // ordered sequence of component lifecycle phase-transitions:
//  ngOnChanges() { console.log(`Circles ngOnChanges`); }
//  ngOnInit() { console.log(`Circles ngOnInit`); }
//  ngDoCheck() { console.log(`Circles ngDoCheck`); }
//  ngAfterContentInit() { console.log(`Circles ngAfterContentInit`); }
//  ngAfterContentChecked() { console.log(`Circles ngAfterContentChecked`); }
//  ngAfterViewInit() { console.log(`Circles ngAfterViewInit`); }
//  ngAfterViewChecked() { console.log(`Circles ngAfterViewChecked`); }
//  ngOnDestroy() { console.log(`Circles ngOnDestroy`); }

}
