import {Component} from '@angular/core';
import {ComponentResolver, ViewContainerRef} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Templatecache} from '../../services/templatecache';


// singleton instance
var base;


@Component({
  selector: 'dome-base',
  template: ``,
  providers: [],
  directives: [CORE_DIRECTIVES],
  pipes: []
})
export class Base {
  compiler: ComponentResolver;
  view: ViewContainerRef;
  templates: Templatecache;

  static changeState(templatename) {
    var template = base.templates.get(templatename),
        componentref;
        //var component;  // component = componentref.instance;

    console.log(`Base.changeState: templatename = ${templatename}`); 
    if(template){
      base.view.clear();
      base.compiler.resolveComponent(template).then((factory) => {
        componentref = base.view.createComponent(factory, 0, base.view.injector);
      });
    }else{
      console.log(`template with name = ${templatename} not found!`);
    }
  }

  constructor(compiler: ComponentResolver, 
              view: ViewContainerRef,
              templates: Templatecache) {
    base = this;
    base.compiler = compiler;
    base.view = view;
    base.templates = templates;
  }


  // ordered sequence of component lifecycle phase-transitions:
//  ngOnChanges() { 
//    console.log(`Base ngOnChanges`); 
//  }
//  ngOnInit() { 
//    console.log(`Base ngOnInit`); 
//  }
//  ngDoCheck() { console.log(` Base ngDoCheck`); }
//  ngAfterContentInit() { 
//    console.log(` Base ngAfterContentInit`);
//  }
//  ngAfterContentChecked() { 
//    console.log(` Base ngAfterContentChecked`); 
//  }
//  ngAfterViewInit() { console.log(` Base ngAfterViewInit`); }
//  ngAfterViewChecked() { console.log(` Base ngAfterViewChecked`); }
//  ngOnDestroy() { console.log(` Base ngOnDestroy`); }
}
