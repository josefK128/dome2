//Cone attribute-component
import {Component} from '@angular/core';

@Component({
  selector: 'cone',
  template: ``      
})
export class Cone {

  // ordered sequence of component lifecycle phase-transitions:
//  ngOnChanges() { console.log(`Cone ngOnChanges`); }
  ngOnInit() { 
    console.log(`%%%% Cone ngOnInit: wrote cone to CameraVR`); 
  }
//  ngDoCheck() { console.log(`Cone ngDoCheck`); }
//  ngAfterContentInit() { console.log(`Cone ngAfterContentInit`); }
//  ngAfterContentChecked() { console.log(`Cone ngAfterContentChecked`); }
//  ngAfterViewInit() { console.log(`Cone ngAfterViewInit`); }
//  ngAfterViewChecked() { console.log(`Cone ngAfterViewChecked`); }
//  ngOnDestroy() { console.log(`Cone ngOnDestroy`); }
}
