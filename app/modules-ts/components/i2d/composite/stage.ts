//Stage component
import {Component} from '@angular/core';
import {Rect} from '../leaf/rect';
import {Circle} from '../leaf/circle';
/*
     xmlns:i3d="http://www.i3Dmedia.org/2014/i3d" 
     xmlns:i2d="http://www.i3Dmedia.org/2014/i2d" 
*/

@Component({
  selector: 'stage',
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

    <g id="i2d" > 
      <circle r="5" fill="white" opacity="0.5" ></circle>
      <g circle/>
      <!-- <g circles/> ngFor in circles fails -->
    </g>


    <!-- 2D coordinate axes reference -->
    <!-- turn on/off via top-left UI radio button -->
    <!-- NOTE!!!!! correction in this case: should be x="-1000" y="1000" -->
    <g id="axes" style="display:block; pointer-events:none" > 
      <!-- for i3Dmedia.org tosca and cav-localhost -->
      <image x="-913.25" y="-913.25" width="2100" height="2100" xlink:href="./svg/axes.svg"/>
      <!-- NOTE: prev. correction for tosca - Nov20 2014 - no longer needed -->
      <!-- <image x="-1005" y="-1005" width="2100" height="2100" xlink:href="./svg/axes.svg"/> -->
    </g><!-- axes -->

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
