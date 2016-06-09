export default 
`
<div id="narrative" class="mediaweb" >
<dome-base id="base" [types] = "items" class="base">
  <!-- NOTE: a-frame causes runtime error at zone.js:1115  
       Uncaught TypeError: Cannot assign to read only property 
       'detachedCallback' of object '#<a-node>' -->
  <!-- <a-scene>
    <a-box color="#6173F4" width="4" height="10" depth="2"></a-box>
  </a-scene> -->
</dome-base>


<!-- canvas-webgl for insertion into i3d-three.js 'singularity' via
     procedural actions on CameraVR in component lifecycle phase-transitions
     such as ngAfterViewInit() -->
<!-- NOTE: dome-i3d is the ViewContainerRef for adding/replacing i3d-component
     templates dynamically by i3d.ts fed by url-changes from narrative.ts 
     Templates are inserted just under <dome-i3d></dome-i3d> -->
<canvas id="3D" class="space">
</canvas> 
<dome-i3d id="i3d" >
</dome-i3d>
<!-- style="z-index:1; pointer-events:auto"  width="100%" height="100%"> -->


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
<div id="2D" class="stage" 
     style="z-index:10; pointer-events:none'" stage >  
<svg xmlns="http://www.w3.org/2000/svg" 
     xmlns:xlink="http://www.w3.org/1999/xlink"
     preserveAspectRatio="none" 
     id="s" 
     width="100%" height="100%" 
     viewBox="-50, -50, 100, 100"> 


  <!-- plane is stage& axes vector space - used for scaling/translating -->
  <g id="plane" >
  <g id="zoom_plane" >

    <!-- static svg elements introduced once by declaration or else by
         low-level svgDOM adding via jQuery or DOM equivalent --> 
    <!-- NOTE: dynamic component load is not presently possible since the
         associated template (even if svg or xml-namespace) is wrapped in
         <div></div> and therefore cannot be embedded gracefully in the <svg>
         Possibly future angualr2 versions will permit dynamic svg-tempates
         as did angular1 - see dom -->
    <g id="i2d">
        <g circle/>
        <g rect/>
        <!-- <g circles/> ngFor in circles fails -->
    </g>


    <!-- 2D coordinate axes reference -->
    <!-- turn on/off via top-left UI radio button -->
    <!-- NOTE!!!!! correction in this case: should be x="-1000" y="1000" -->
    <g id="axes" style="display:block; pointer-events:none">
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
<div id="ui" class="ui" 
  style="z-index:100; x:0; y:0; pointer-events:auto; width:16vw; height:70vh; transform:scaleY(0.6) translate(3%, 90%)"> 
<button (click)="urlChange()" style="z-index:100" >url change</button>
<div id="counter"></div>
</div><!--ui-->
<dome-ui>
</dome-ui>


</div><!--narrative-->
`;


