import {Component} from '@angular/core';

@Component({
  selector: '[rect]',
  template: `<svg:rect x="20" y="-20" [attr.width]="width" height="10" stroke="black" fill="blue"></rect>`
})


export class Rect {
  width: number = 20;

  // ordered sequence of component lifecycle phase-transitions:
//  ngOnChanges() { console.log(`Rect ngOnChanges`); }
//  ngOnInit() { console.log(`Rect ngOnInit`); }
//  ngDoCheck() { console.log(`Rect ngDoCheck`); }
//  ngAfterContentInit() { console.log(`Rect ngAfterContentInit`); }
//  ngAfterContentChecked() { console.log(`Rect ngAfterContentChecked`); }
//  ngAfterViewInit() { console.log(`Rect ngAfterViewInit`); }
//  ngAfterViewChecked() { console.log(`Rect ngAfterViewChecked`); }
//  ngOnDestroy() { console.log(`Rect ngOnDestroy`); }
}
