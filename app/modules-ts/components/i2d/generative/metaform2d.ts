// Metaform2d attribute-component
// i2d-leaf objects are svg elements with ids which are registered 
// via Camera2d.addActorToScene(...) for later fetch by id and animation

import {Component, Input} from '@angular/core';
import {NgFor, NgIf} from '@angular/common';

// service
import {Camera2d} from '../../../services/camera2d';

// leaf components
import {Circle} from '../leaf/circle';
import {Rect} from '../leaf/rect';

// template
import template from './metaform2d.html';



@Component({
  selector: 'metaform2d',
  template: template,
  directives:[NgFor, NgIf, Circle, Rect, Metaform2d],  
  providers:[]
})
export class Metaform2d {
  @Input() model: Object;
  @Input() node: Object;
  @Input() parent: Object = {}; // then initially parent.id is undefined
  camera2d:Camera2d;


  constructor(camera2d: Camera2d) {
    this.camera2d = camera2d;
  }


  // ordered sequence of component lifecycle phase-transitions:
//  ngOnChanges() { console.log(`Metaform2d ngOnChanges`); }
ngOnInit() {
  console.log("\n\n%%%% Metaform2d ngOnInit:");
  console.log(`this.parent has id=${this.parent['id']}`);
  console.log(`this.node with id=${this.node['id']} is:`);
  console.dir(this.node);
}

//  ngDoCheck() { console.log(`Metaform2d ngDoCheck`); }
//  ngAfterContentInit() { console.log(`Metaform2d ngAfterContentInit`); }
//  ngAfterContentChecked() { console.log(`Metaform2d ngAfterContentChecked`); }
  ngAfterViewInit() { 
     console.log(`Metaform2d ngAfterViewInit`); 
  }

//  ngAfterViewChecked() { console.log(`Metaform2d ngAfterViewChecked`); }
//  ngOnDestroy() { console.log(`Metaform2d ngOnDestroy`); }
}
