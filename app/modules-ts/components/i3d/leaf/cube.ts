//Cube attribute-component
import {Component} from '@angular/core';

@Component({
  selector: 'cube',
  template: ``    
})
export class Cube {

  // ordered sequence of component lifecycle phase-transitions:
//  ngOnChanges() { console.log(`Cube ngOnChanges`); }
  ngOnInit() { 
    console.log(`%%%% Cube ngOnInit wrote cube to Camera3d`); 
  }
//  ngDoCheck() { console.log(`Cube ngDoCheck`); }
//  ngAfterContentInit() { console.log(`Cube ngAfterContentInit`); }
//  ngAfterContentChecked() { console.log(`Cube ngAfterContentChecked`); }
//  ngAfterViewInit() { console.log(`Cube ngAfterViewInit`); }
//  ngAfterViewChecked() { console.log(`Cube ngAfterViewChecked`); }
//  ngOnDestroy() { console.log(`Cube ngOnDestroy`); }
}
