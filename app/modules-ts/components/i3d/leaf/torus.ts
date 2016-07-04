//Torus attribute-component
import {Component, Input} from '@angular/core';

@Component({
  selector: 'torus',
  template: ``      
})
export class Torus {
  @Input() model: Object;
  @Input() node: Object;
  @Input() parent: Object;
  @Input() id: string;
  pid:string;


  // ordered sequence of component lifecycle phase-transitions:
//  ngOnChanges() { console.log(`Torus ngOnChanges`); }
  ngOnInit() { 
    console.log(`%%%% Torus ${this.id} ngOnInit`); 
    this.pid = this.parent['id'];
    console.log(`node = ${this.node}`);
    console.log(`parent = ${this.parent}`);
    console.log(`pid = ${this.pid}`);
    console.log(`node.form = ${this.node['form']}`);
    console.log(`node.form.type = ${this.node['form']['type']}`);
}
//  ngDoCheck() { console.log(`Torus ngDoCheck`); }
//  ngAfterContentInit() { console.log(`Torus ngAfterContentInit`); }
//  ngAfterContentChecked() { console.log(`Torus ngAfterContentChecked`); }
  ngAfterViewInit() { 
    console.log(`Torus ${this.id} ngAfterViewInit`); 
  }
//  ngAfterViewChecked() { console.log(`Torus ngAfterViewChecked`); }
//  ngOnDestroy() { console.log(`Torus ngOnDestroy`); }
}
