// Metaform3d attribute-component
// NOTE: leaf-components have empty-string template - NOT undefined! 
// input-property attribute values used by the leaf-component are declared 
// in <sphere ...></sphere> element(s) in the templates of composite 
// components (for exp. scenes)
// NOTE: the purpose of i3d leaf-components are to create webGL objects
// and via Camera3d add them to the webGL scene rendered in the '3D' canvas,
// and register the object as a scene 'actor' via Camera3d.addActorToScene(...)

import {Component, Input} from '@angular/core';
import {NgFor, NgIf} from '@angular/common';
//import {NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';

// service
import {Camera3d} from '../../../services/camera3d';

// leaf components
import {Cylinder} from '../leaf/cylinder';
import {Torus} from '../leaf/torus';

// template
import template from './metaform3d.html';



@Component({
  selector: 'metaform3d',
  template: template,
  directives:[NgFor, NgIf, Cylinder, Torus, Metaform3d],  
  providers:[]
})
export class Metaform3d {
  @Input() model: Object;
  @Input() node: Object;
  @Input() parent: Object = {}; // then initially parent.id is undefined
  camera3d:Camera3d;


  constructor(camera3d: Camera3d) {
    this.camera3d = camera3d;
  }


  // ordered sequence of component lifecycle phase-transitions:
//  ngOnChanges() { console.log(`Metaform3d ngOnChanges`); }
ngOnInit() {
  console.log("\n\n%%%% Metaform3d ngOnInit:");
  console.log(`this.parent has id=${this.parent['id']}`);
  console.log(`this.node with id=${this.node['id']} is:`);
  console.dir(this.node);
}

//  ngDoCheck() { console.log(`Metaform3d ngDoCheck`); }
//  ngAfterContentInit() { console.log(`Metaform3d ngAfterContentInit`); }
//  ngAfterContentChecked() { console.log(`Metaform3d ngAfterContentChecked`); }
  ngAfterViewInit() { 
     console.log(`Metaform3d ngAfterViewInit`); 
  }

//  ngAfterViewChecked() { console.log(`Metaform3d ngAfterViewChecked`); }
//  ngOnDestroy() { console.log(`Metaform3d ngOnDestroy`); }
}
