import {Component} from '@angular/core';
import {ComponentResolver, ViewContainerRef} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

// application
import {Templatecache} from '../../services/templatecache';


var i2d;

@Component({
  selector: 'dome-i2d',
  template: ``,
  providers: [
    Templatecache
  ],
  directives: [CORE_DIRECTIVES],
  pipes: []
})
export class I2d {
  compiler: ComponentResolver;
  view: ViewContainerRef;

  static changeScene(templatename) {
    var template = i2d.templates.get(templatename),
        componentref:ComponentRef;

    console.log(`I2d.changeScene: templatename = ${templatename}`);
    if(template){
      i2d.view.clear();
      i2d.compiler.resolveComponent(template).then((factory) => {
        componentref = i2d.view.createComponent(factory, 0, i2d.view.injector);
      });
    }else{
      console.log(`template with name = ${templatename} not found!`);
    }
  }


  constructor(compiler: ComponentResolver, 
              view: ViewContainerRef,
              templates: Templatecache) {
    i2d = this;
    i2d.compiler = compiler;
    i2d.view = view;
    i2d.templates = templates;
  }


  // ordered sequence of component lifecycle phase-transitions:
//  ngOnChanges() { 
//    console.log(` I2d ngOnChanges`); 
//}
//  ngOnInit() { 
//    console.log(` I2d ngOnInit`); 
//  }
//  ngDoCheck() { console.log(` I2d ngDoCheck`); }
//  ngAfterContentInit() { 
//    console.log(` I2d ngAfterContentInit`);
//  }
//  ngAfterContentChecked() { 
//    console.log(` I2d ngAfterContentChecked`); 
//    //document.getElementById("s").setAttribute("preseveAspectRatio", "none");
//  }
//  ngAfterViewInit() { console.log(` I2d ngAfterViewInit`); }
//  ngAfterViewChecked() { console.log(` I2d ngAfterViewChecked`); }
//  ngOnDestroy() { console.log(` I2d ngOnDestroy`); }
}
