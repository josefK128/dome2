export default 
`
<div id="narrative" class="mediaweb" >
  <div class="base" [style.display]="basedisplay" > 
<dome-base id="base">
  <!-- NOTE: a-frame causes runtime error at zone.js:1115  
       Uncaught TypeError: Cannot assign to read only property 
       'detachedCallback' of object '#<a-node>' -->
  <!-- <a-scene>
    <a-box color="#6173F4" width="4" height="10" depth="2"></a-box>
  </a-scene> -->
</dome-base>
<!-- <div style="background: url('images/Escher.png'); width:100%; height:100%; background-size:cover; background-repeat:no-repeat; background-position:center; opacity:0.7"></div> -->
</div>


<!-- canvas-webgl for insertion into i3d-three.js 'singularity' via
     procedural actions on Camera3d in component lifecycle phase-transitions
     such as ngAfterViewInit() -->
<!-- NOTE: dome-i3d is the ViewContainerRef for adding/replacing i3d-component
     templates dynamically by i3d.ts fed by url-changes from narrative.ts 
     Templates are inserted just under <dome-i3d></dome-i3d> -->
<div  [style.display]="i3ddisplay" >
<canvas id="3D" class="space" >
</canvas> 
<dome-i3d id="i3d" >
</dome-i3d>
</div><!-- hide -->


<!-- 2D: svg plane optionally synchronized to 3D as HUD
     viewBox creates a new coordinate system for the (visible) viewport
     of children of svg.
     NOTE: coordinates of elements range from 0 to 100 in x and y.
     The viewBox defines a cell in an infinite coordinate space.
     Since the viewport is anchored at (0,0) and is 100x100
     units exactly match the viewport units 100vw x 100vh.
     NOTE: children will scale as the window-viewport is re-sized.
     aspect ratio clipping and justification are specified in 
     preserveAspectRatio. The default preserveAspectRatio is 
     mid-x mid-y and scales in this manner but does not crop
     In order to keep a .stage 100x100 in vector space coordinates
     for all viewport dimensions preserveAspectRatio = 'none'. -->
<!-- elements in defs are prototypes able to re-used
     their values are added to the values of the 'used' elements
     thus it is easiest if their values are set to zero
     they are not themselves displayed -->

<!-- NOTE: original <svg>...</svg> i2d scene is never cleared
     by ViewContainerRef.clear() - but it is not seen again unless
     an empty template is inserted under <dome-i2d></dome-i2d>
-->
<div id="2D" class="stage" [style.display]="i2ddisplay" > 
<dome-i2d></dome-i2d>
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
</div><!-- 2D -->


<!-- <div id="ui" class="ui" 
             style="z-index:100; x:0; y:0; pointer-events:auto; width:16vw; height:70vh; transform:scaleY(0.6) translate(3%, -30%)"> -->
<div id="display" class="ui" style="z-index:100; x:0; y:0; width:16vw; height:70vh; transform:scaleY(0.6) translate(3%, -30%)" >
  <label>
    <input type="checkbox" checked="config.controlstates['ui']" (change)="changeControl('ui')">ui 
  </label>
  <div [style.display]="uidisplay" > 

  <!-- controls -->
  <div *ngFor="let c of config.controls" > 
    <label>
      <input type="checkbox" [ngModel]="controlstates[c]" (change)="changeControl(c)">{{c}} 
    </label>
  </div>

  <!-- scenes -->
  <br/>
  <div *ngFor="let s of config.scenes" > 
    <label>
      <input type="checkbox" [ngModel]="scenestates[s]" (change)="changeState(config.scenepaths[s])">{{s}} 
    </label>
  </div> 

  <!-- <div *ngFor="let s of config.scenes" style="scale(0.5)" >
    <span>
      <input type="button" (click)="changeScene(s)">{{s}}
    </span> 
  </div> 
  <div style="padding-left:3%" ><font color="green">{{current_scene}}</font></div> -->
  
  <!-- three.js fps -->
  <div id="stats"  [style.display]="fpsdisplay "style="position:absolute; transform:scaleY(0.85) translateY(-8%)"></div>

  <dome-ui>
  </dome-ui>
  </div><!-- hide -->
</div><!--ui-->


</div><!--narrative-->
`;


