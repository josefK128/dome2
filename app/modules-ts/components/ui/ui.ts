import {Component} from '@angular/core';
import {ComponentResolver, ViewContainerRef, ComponentRef} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

// services
import {Templatecache} from '../../services/templatecache';
import {Models} from '../../services/models';


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
  models: Models;


  static changeState(substate:Object):Promise<string> {

     var templatename = substate['t'],
         modelname = substate['m'],
         tp = substate['tp'],           // previous templatename
         mp = substate['mp'],          // previous modelname
         componentref:ComponentRef,   // component = componentref.instance;
         uimodel:Object,
         template;

    // if neither the template or model has changed then no substate change
    // however even if just a model change we assume a component reload needed
    if((templatename === tp) && (modelname === mp)){  
      return Promise.resolve('ui');
    }else{
      console.log(`Ui.changeState: templatename = ${templatename}`); 
      return new Promise((resolve, reject) => {       
        // note: modelname might be '' but then models['i2d'] object returned
        uimodel = ui.models.get(['ui', templatename, modelname]);
        template = ui.templates.get(templatename);

        //place promise resolution functions on uimodel for use by dynamically
        // loaded composite-component after template initialization complete
        if(uimodel){
          uimodel['resolve'] = resolve; 
          uimodel['reject'] = reject;
        }else{
          reject(`model ui.${templatename}.${modelname} not found!`);
        }

        // clear ui view and dynamically load composite template-component
        if(template){
          ui.view.clear();
          try{
            ui.compiler.resolveComponent(template).then((factory) => {
              componentref = ui.view.createComponent(factory, 0, ui.view.injector);
            });
          }catch(e){
            reject(e);
          }
        }else{
          reject(`ui template with name = ${templatename} not found!`);
        }
      });//return Promise
    }
  }


  constructor(compiler: ComponentResolver, 
              view: ViewContainerRef,
              templates: Templatecache,
              models:Models) {

    ui = this;
    ui.compiler = compiler;
    ui.view = view;
    ui.templates = templates;
    ui.models = models;
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
