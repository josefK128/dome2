//Stage attribute-component
import {Component} from '@angular/core';
import {Rect} from '../leaf/rect';
import {Circle} from '../leaf/circle';
/*
     xmlns:i3d="http://www.i3Dmedia.org/2014/i3d" 
     xmlns:i2d="http://www.i3Dmedia.org/2014/i2d" 
*/

@Component({
  selector: '[stage]',
  directives: [Rect, Circle],
  template: `
<svg xmlns="http://www.w3.org/2000/svg" 
     xmlns:xlink="http://www.w3.org/1999/xlink"
     preserveAspectRatio="none" 
     id="s" 
     width="100%" height="100%" 
     viewBox="-50, -50, 100, 100"> 


  <!-- plane is stage& axes vector space - used for scaling/translating -->
  <g id="plane" >
  <g id="zoom_plane" >

    <g id="i2d">
    </g>


    <!-- i3d-svg-webgl templates are inserted into 'space' at i3d ui-view  -->
    <g id="i3d" >
    </g><!-- 'i3d' -->

  </g><!-- zoom_plane -->    
  </g><!-- plane -->    
</svg><!-- s -->
 `
})
export class Stage {

  // ordered sequence of component lifecycle phase-transitions:
//  ngOnChanges() { console.log(`Stage ngOnChanges`); }
//  ngOnInit() { console.log(`Stage ngOnInit`); }
//  ngDoCheck() { console.log(`Stage ngDoCheck`); }
//  ngAfterContentInit() { console.log(`Stage ngAfterContentInit`); }
//  ngAfterContentChecked() { console.log(`Stage ngAfterContentChecked`); }
//  ngAfterViewInit() { console.log(`Stage ngAfterViewInit`); }
//  ngAfterViewChecked() { console.log(`Stage ngAfterViewChecked`); }
//  ngOnDestroy() { console.log(`Stage ngOnDestroy`); }
}
