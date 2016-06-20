import {Component} from '@angular/core';
import {ComponentResolver, ViewContainerRef} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Templatecache} from '../../services/templatecache';


// singleton instance
var ui;


@Component({
  selector: 'dome-ui',
  template: ``,
  providers: [],
  directives: [CORE_DIRECTIVES],
  pipes: []
})
export class Ui {
  compiler: ComponentResolver;
  view: ViewContainerRef;
  templates: Templatecache;

  static changeState(templatename:string) {
    var template = ui.templates.get(templatename),
        componentref;
        //var component;  // component = componentref.instance;

    console.log(`Ui.changeState: templatename = ${templatename}`); 
    if(template){
      ui.view.clear();
      ui.compiler.resolveComponent(template).then((factory) => {
        componentref = ui.view.createComponent(factory, 0, ui.view.injector);
      });
    }else{
      console.log(`template with name = ${templatename} not found!`);
    }
  }

  constructor(compiler: ComponentResolver, 
              view: ViewContainerRef,
              templates: Templatecache) {
    ui = this;
    ui.compiler = compiler;
    ui.view = view;
    ui.templates = templates;
  }


  // ordered sequence of component lifecycle phase-transitions:
//  ngOnChanges() { 
//    console.log(`Ui ngOnChanges`); 
//  }
//  ngOnInit() { 
//    console.log(`Ui ngOnInit`); 
//  }
//  ngDoCheck() { console.log(` Ui ngDoCheck`); }
//  ngAfterContentInit() { 
//    console.log(` Ui ngAfterContentInit`);
//  }
//  ngAfterContentChecked() { 
//    console.log(` Ui ngAfterContentChecked`); 
//  }
//  ngAfterViewInit() { console.log(` Ui ngAfterViewInit`); }
//  ngAfterViewChecked() { console.log(` Ui ngAfterViewChecked`); }
//  ngOnDestroy() { console.log(` Ui ngOnDestroy`); }
}
