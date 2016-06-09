import {Component} from '@angular/core';
import {ComponentResolver, ViewContainerRef} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Templatecache} from '../../services/templatecache';


// singleton instance
var i3d;


@Component({
  selector: 'dome-i3d',
  template: ``,
  providers: [
    Templatecache
  ],
  directives: [CORE_DIRECTIVES],
  pipes: []
})
export class I3d {
  compiler: ComponentResolver;
  view: ViewContainerRef;
  templates: Templatecache;

  static changeScene(templatename) {
    var template = i3d.templates.get(templatename),
        componentref;
//    var component;

    if(template){
      i3d.view.clear();
      i3d.compiler.resolveComponent(template).then((factory) => {
        componentref = i3d.view.createComponent(factory, 0, i3d.view.injector);
      });
    }else{
      console.log(`template with name = ${templatename} not found!`);
    }

    // componentref is not returned immediately - it is available after delay
//    setTimeout(() => {
//      componentref = componentref || {};
//      component = componentref.instance;
//      console.log(`I3d.changeScene 1sec: componentref = ${componentref}`);
//      console.log(`I3d.changeScene 1sec: component = ${component}`);
//    },1000);
  }

  constructor(compiler: ComponentResolver, 
              view: ViewContainerRef,
              templates: Templatecache) {
    i3d = this;
    i3d.compiler = compiler;
    i3d.view = view;
    i3d.templates = templates;
    console.log(`I3D ctor: i3d.compiler = ${i3d.compiler}`);
    console.log(`I3D ctor: i3d.view = ${i3d.view}`);
    console.log(`I3D ctor: i3d.templates = ${i3d.templates}`);
  }


  // ordered sequence of component lifecycle phase-transitions:
//  ngOnChanges() { 
//    console.log(`I3D ngOnChanges`); 
//  }
//  ngOnInit() { 
//    console.log(`I3D ngOnInit`); 
//    console.log(`I3D: this.type = ${this.type}`);
//    console.log(`I3D: this.compiler = ${this.compiler}`);
//    console.log(`I3D: this.view = ${this.view}`);
//  }
//  ngDoCheck() { console.log(` I3D ngDoCheck`); }
//  ngAfterContentInit() { 
//    console.log(` I3D ngAfterContentInit`);
//  }
//  ngAfterContentChecked() { 
//    console.log(` I3D ngAfterContentChecked`); 
//    //document.getElementById("s").setAttribute("preseveAspectRatio", "none");
//  }
//  ngAfterViewInit() { console.log(` I3D ngAfterViewInit`); }
//  ngAfterViewChecked() { console.log(` I3D ngAfterViewChecked`); }
//  ngOnDestroy() { console.log(` I3D ngOnDestroy`); }
}
