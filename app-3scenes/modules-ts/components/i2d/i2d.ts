import {Component} from '@angular/core';
import {ComponentResolver, ViewContainerRef, ComponentRef} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

// services
import {Templatecache} from '../../services/templatecache';
import {Models} from '../../services/models';


var i2d;

@Component({
  selector: 'dome-i2d',
  template: ``,
  providers: [],
  directives: [CORE_DIRECTIVES],
  pipes: []
})
export class I2d {
  compiler: ComponentResolver;
  view: ViewContainerRef;
  templates: Templatecache;
  models:Models;

  static changeState(substate:Object, narrative):Promise<string> {

     var templatename = substate['t'],
         modelname = substate['m'],
         tp = substate['tp'],           // previous templatename
         mp = substate['mp'],          // previous modelname
         componentref:ComponentRef,   // component = componentref.instance;
         i2dmodel:Object,
         template;
   
    // if neither the template or model has changed then no substate change
    // however even if just a model change we assume a component reload needed
    if((templatename === tp) && (modelname === mp)){  
      return Promise.resolve('i2d');
    }else{
      console.log(`I2d.changeState: templatename = ${templatename}`); 
      return new Promise((resolve, reject) => {       
        // note: modelname might be '' but then models['i2d'] object returned
        i2dmodel = i2d.models.get(['i2d', templatename, modelname]);
        template = i2d.templates.get(templatename);

        //place promise resolution functions on i2dmodel for use by dynamically
        // loaded composite-component after template initialization complete
        if(i2dmodel){
          i2dmodel['resolve'] = resolve; 
          i2dmodel['reject'] = reject;
        }else{
          reject(`model i2d.${templatename}.${modelname} not found!`);
        }

        // clear i2d view and dynamically load composite template-component
        if(template){
          i2d.view.clear();
          narrative.camera2d.place(narrative);
          try{
            i2d.compiler.resolveComponent(template).then((factory) => {
              componentref = i2d.view.createComponent(factory, 0, i2d.view.injector);
            });
          }catch(e){
            reject(e);
          }
        }else{
          reject(`i2d template with name = ${templatename} not found!`);
        }
      });//return Promise
    }
  }


  constructor(compiler: ComponentResolver, 
              view: ViewContainerRef,
              templates: Templatecache,
              models:Models) {

    i2d = this;
    i2d.compiler = compiler;
    i2d.view = view;
    i2d.templates = templates;
    i2d.models = models;
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
