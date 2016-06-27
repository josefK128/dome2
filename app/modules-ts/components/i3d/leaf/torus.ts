//Torus attribute-component
import {Component, Input} from '@angular/core';

@Component({
  selector: 'torus',
  template: ``      
})
export class Torus {
  @Input() model: Object;
  @Input() node: Object;


  // ordered sequence of component lifecycle phase-transitions:
//  ngOnChanges() { console.log(`Torus ngOnChanges`); }
  ngOnInit() { 
    //var mfnodes = this.model['actors']['metaforms'];

    console.log(`%%%% Torus ngOnInit wrote torus to Camera3d`); 
    console.log(`node = ${this.node}`);
    console.log(`node.form = ${this.node['form']}`);
    console.log(`node.form.type = ${this.node['form']['type']}`);
}
//  ngDoCheck() { console.log(`Torus ngDoCheck`); }
//  ngAfterContentInit() { console.log(`Torus ngAfterContentInit`); }
//  ngAfterContentChecked() { console.log(`Torus ngAfterContentChecked`); }
//  ngAfterViewInit() { console.log(`Torus ngAfterViewInit`); }
//  ngAfterViewChecked() { console.log(`Torus ngAfterViewChecked`); }
//  ngOnDestroy() { console.log(`Torus ngOnDestroy`); }
}
