// Sphere leaf-component
// NOTE: leaf-components have empty-string template - NOT undefined! 
// input-property attribute values used by the leaf-component are declared 
// in <sphere ...></sphere> element(s) in the templates of composite 
// components (for exp. scenes)
// NOTE: the purpose of i3d leaf-components are to create webGL objects
// and via Camera3d add them to the webGL scene rendered in the '3D' canvas,
// and register the object as a scene 'actor' via Camera3d.addActorToScene(...)

import {Component, Input} from '@angular/core';
import {Camera3d} from '../../../services/camera3d';


@Component({
  selector: 'sphere',
  template: '',
  providers: [
  ]
})
export class Sphere {
  @Input() id: string;
  @Input() model: Object;
  radius:number;
  camera3d: Camera3d;
  parentElement:string;
  pid:string;


  constructor(_camera3d: Camera3d) {
    this.camera3d = _camera3d;
  }

  // ordered sequence of component lifecycle phase-transitions:
//  ngOnChanges() { console.log(`Sphere ngOnChanges`); }
ngOnInit() {
  var node;
  console.log("\n\n%%%% Sphere ngOnInit:");
  console.log(`%%%% this.id = ${this.id}`); 
  node = document.getElementById(this.id).parentNode;
  if (node){
    this.parentElement=node.nodeName;
    this.pid=node.id;
    console.log(`%%%% this.parentElement = ${this.parentElement}`); 
    console.log(`%%%% this.pid = ${this.pid}`); 
  }else{
  console.log(`%%%% Note: there is no parentNode of this.id= ${this.id}`); 
  }
  this.radius = this.model['actors'][this.id]['radius'];
  console.log(`%%%% sphere.radius = ${this.radius}`); 
  console.log(`%%%% Sphere wrote sphere ${this.id} to Camera3d`); 
}

//  ngDoCheck() { console.log(`Sphere ngDoCheck`); }
//  ngAfterContentInit() { console.log(`Sphere ngAfterContentInit`); }
//  ngAfterContentChecked() { console.log(`Sphere ngAfterContentChecked`); }
//  ngAfterViewInit() { console.log(`Sphere ngAfterViewInit`); }
//  ngAfterViewChecked() { console.log(`Sphere ngAfterViewChecked`); }
//  ngOnDestroy() { console.log(`Sphere ngOnDestroy`); }
}
