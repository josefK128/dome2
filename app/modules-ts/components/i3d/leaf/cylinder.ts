//Cylinder attribute-component
import {Component, Input} from '@angular/core';

@Component({
  selector: 'cylinder',
  template: ``    
})
export class Cylinder {
  @Input() model: Object;
  @Input() node: Object;


  // ordered sequence of component lifecycle phase-transitions:
//  ngOnChanges() { console.log(`Cylinder ngOnChanges`); }
  ngOnInit() { 
    //var mfnodes = this.model['actors']['metaforms'];

    console.log(`%%%% Cylinder ngOnInit wrote cylinder to Camera3d`); 
    console.log(`node = ${this.node}`);
    console.log(`node.form = ${this.node['form']}`);
    console.log(`node.form.type = ${this.node['form']['type']}`);
  }
//  ngDoCheck() { console.log(`Cylinder ngDoCheck`); }
//  ngAfterContentInit() { console.log(`Cylinder ngAfterContentInit`); }
//  ngAfterContentChecked() { console.log(`Cylinder ngAfterContentChecked`); }
//  ngAfterViewInit() { console.log(`Cylinder ngAfterViewInit`); }
//  ngAfterViewChecked() { console.log(`Cylinder ngAfterViewChecked`); }
//  ngOnDestroy() { console.log(`Cylinder ngOnDestroy`); }
}
