import {Component} from '@angular/core';
import {ComponentResolver, ViewContainerRef, ComponentRef} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

// services
import {Templatecache} from '../../services/templatecache';
import {Models} from '../../services/models';


// singleton instance
var i3d;


@Component({
  selector: 'dome-i3d',
  template: ``,
  providers: [],
  directives: [CORE_DIRECTIVES],
  pipes: []
})
export class I3d {
  compiler: ComponentResolver;
  view: ViewContainerRef;
  templates: Templatecache;
  models: Models;

  static changeState(substate:Object, 
                     narrative):Promise<string> {

    var templatename = substate['t'],
        modelname = substate['m'],
        tp = substate['tp'],           // previous templatename
        mp = substate['mp'],          // previous modelname
        componentref:ComponentRef,   // component = componentref.instance;
        i3dmodel:Object,
        template;

    // if neither the template or model has changed then no substate change
    // however even if just a model change we assume a component reload needed
    if((templatename === tp) && (modelname === mp)){  
      return Promise.resolve('i3d');
    }else{
      console.log(`I3d.changeState: templatename = ${templatename}`); 

      return new Promise((resolve, reject) => {
        // note: modelname might be '' but then models['i3d'] object returned
        i3dmodel = i3d.models.get(['i3d', templatename, modelname]);
        template = i3d.templates.get(templatename);


        //place promise resolution functions on i3dmodel for use by dynamically
        // loaded composite-component after template initialization complete
        if(i3dmodel){
          i3dmodel['resolve'] = resolve; 
          i3dmodel['reject'] = reject;
        }else{
          reject(`model i3d.${templatename}.${modelname} not found!`);
        }
  
        // clear the i3d view and prepare three.js scene
        // set csphere and lights visibility and then
        // dynamically load composite-component
        if(template){
          i3d.view.clear();
          narrative.camera3d.place(templatename, i3dmodel);
          try{
            i3d.compiler.resolveComponent(template).then((factory) => {
              componentref = i3d.view.createComponent(factory, 0, i3d.view.injector);
            });
          }catch(e){
            reject(e);
          }
        }else{
          reject(`i3d template with name = ${templatename} not found!`);
        }
      });//return Promise
    }
  }


  constructor(compiler: ComponentResolver, 
              view: ViewContainerRef,
              templates: Templatecache,
              models:Models){
                
    i3d = this;
    i3d.compiler = compiler;
    i3d.view = view;
    i3d.templates = templates;
    i3d.models = models;
  }


  // ordered sequence of component lifecycle phase-transitions:
  //ngOnChanges() { console.log(`I3d ngOnChanges`); }
  //ngOnInit() { console.log(`I3d ngOnInit`); }
  //ngDoCheck() { console.log(` I3d ngDoCheck`); }
  //ngAfterContentInit() { console.log(` I3d ngAfterContentInit`); }
  //ngAfterContentChecked() { console.log(` I3d ngAfterContentChecked`); }
  //ngAfterViewInit() { console.log(` I3d ngAfterViewInit`); }
  //ngAfterViewChecked() { console.log(` I3d ngAfterViewChecked`); }
  //ngOnDestroy() { console.log(` I3d ngOnDestroy`); }
}
