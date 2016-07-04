//Cylinder attribute-component
import {Component, Input} from '@angular/core';

@Component({
  selector: 'cylinder',
  template: ``    
})
export class Cylinder {
  @Input() model: Object;
  @Input() node: Object;
  @Input() parent: Object;
  @Input() id: string;
  pid:string;


  // ordered sequence of component lifecycle phase-transitions:
//  ngOnChanges() { console.log(`Cylinder ngOnChanges`); }
  ngOnInit() {
    console.log(`%%%% Cylinder ${this.id} ngOnInit`); 
    this.pid = this.parent['id'];
    console.log(`node = ${this.node}`);
    console.log(`parent = ${this.parent}`);
    console.log(`pid = ${this.pid}`);
    console.log(`node.form = ${this.node['form']}`);
    console.log(`node.form.type = ${this.node['form']['type']}`);
  }
//  ngDoCheck() { console.log(`Cylinder ngDoCheck`); }
//  ngAfterContentInit() { console.log(`Cylinder ngAfterContentInit`); }
//  ngAfterContentChecked() { console.log(`Cylinder ngAfterContentChecked`); }
  ngAfterViewInit() { 
    console.log(`Cylinder ${this.id} ngAfterViewInit`); 
  }
//  ngAfterViewChecked() { console.log(`Cylinder ngAfterViewChecked`); }
//  ngOnDestroy() { console.log(`Cylinder ngOnDestroy`); }
}
