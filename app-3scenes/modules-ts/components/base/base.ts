import {Component} from '@angular/core';
import {ComponentResolver, ViewContainerRef, ComponentRef} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

// services
import {Templatecache} from '../../services/templatecache';
import {Models} from '../../services/models';


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
  models: Models;

  static changeState(substate:Object):Promise<string> {

    var templatename = substate['t'],
        modelname = substate['m'],
        tp = substate['tp'],           // previous templatename
        mp = substate['mp'],          // previous modelname
        componentref:ComponentRef,   // component = componentref.instance;
        basemodel:Object,
        template;
   
    // if neither the template or model has changed then no substate change
    // however even if just a model change we assume a component reload needed
    if((templatename === tp) && (modelname === mp)){  
      return Promise.resolve('base');
    }else{
      console.log(`Base.changeState: templatename = ${templatename}`); 
      return new Promise((resolve, reject) => {       
        // note: modelname might be '' but then models['base'] object returned
        basemodel = base.models.get(['base', templatename, modelname]);
        template = base.templates.get(templatename);
   
        //place promise resolution functions on basemodel for use by dynamically
        // loaded composite-component after template initialization complete
        if(basemodel){
          basemodel['resolve'] = resolve; 
          basemodel['reject'] = reject;
        }else{
          reject(`model base.${templatename}.${modelname} not found!`);
        }

        // clear base view and dynamically load the composite template-component
        if(template){
          base.view.clear();
          try{
            base.compiler.resolveComponent(template).then((factory) => {
              componentref = base.view.createComponent(factory, 0, base.view.injector);
            });
          }catch(e){
            reject(e);
          }
        }else{
          reject(`base template with name = ${templatename} not found!`);
        }
      });//return Promise
    }
  }


  constructor(compiler: ComponentResolver, 
              view: ViewContainerRef,
              templates: Templatecache,
              models:Models) {

    base = this;
    base.compiler = compiler;
    base.view = view;
    base.templates = templates;
    base.models = models;
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
