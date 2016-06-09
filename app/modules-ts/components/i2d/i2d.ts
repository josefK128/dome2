import {Component, Input} from '@angular/core';
import {ComponentResolver, ViewContainerRef} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Stage} from './composite/stage-empty';

@Component({
  selector: '[i2d]',
  template: ``,
  providers: [],
  directives: [CORE_DIRECTIVES, Stage],
  pipes: []
})


export class I2d {
  @Input() types;
  //@Output() myEvent = new EventEmitter();
  compiler: ComponentResolver;
  view: ViewContainerRef;
  type: any = Stage;

  constructor(compiler: ComponentResolver, i2d: ViewContainerRef) {
    this.compiler = compiler;
    this.view = i2d;
    console.log(`I2d ctor: this.type = ${this.type}`);
    console.log(`I2d ctor: this.compiler = ${this.compiler}`);
    console.log(`I2d ctor: this.view = ${this.view}`);
    //this.compiler.resolveComponent(this.type).then((factory) => {
    //  this.view.createComponent(factory, 0, this.view.injector);
    //});
  }

  // ordered sequence of component lifecycle phase-transitions:
  ngOnChanges() { 
    console.log(` I2d ngOnChanges`); 
//    console.log(`I2d ngOnChanges: this.types = ${this.types}`); 
//    for(let type of this.types){
//      this.compiler.resolveComponent(type).then((factory) => {
//        this.i2d.createComponent(factory, 0, this.i2d.injector);
//      });
//    }
  }
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
