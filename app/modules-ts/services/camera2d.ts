//  camera2d.ts
import {Injectable, Inject} from '@angular/core';

// configuration
import Config from '../configs/config.interface';
import {CONFIG} from '../configs/@config';

// services
import {Mediator} from './mediator';
import {Narrative} from '../components/narrative';



@Injectable()
export class Camera2d {
  config: any;
  mediator:Mediator;
  narrative:Narrative;
  record_shots:boolean;
  tl:Object;
  tlp:Object;
  shot:Object;
  action:Object;
  plane:any;
  zoom_plane:any;
  x:number;
  y:number;
  angle:number;
  scale:number;


  constructor(@Inject(CONFIG) cfg:Config, mediator:Mediator){

    this.config = cfg;
    this.mediator = mediator;
    this.record_shots = this.config.recored_shots;
    this.tl = {};
    this.tlp = {};
    this.action = {};
    this.shot = {};
   
    // dolly - plane
    this.plane = undefined;
    this.x = 0.0;      // plane (webgl y-coord!)
    this.y = 0.0;

    // zoom and roll - zoom_plane child of plane
    this.zoom_plane = undefined;
    this.angle = 0.0;  // zoom_plane - angle degrees
    this.scale = 1.0;


    // key controls<br>
    // * not-alt  => 'cut' - no anim
    // *    alt  => 'fly' - anim
    // * not-shft => rel transform 'by'
    // *    shft => abs transform 'to'
    // * NOTE: logging of action is for building e2e_test cell when 
    //   generating e2e_spec
    window.addEventListener("keyup", function(e){
      var a:Object;

      switch(e.keyCode){

        // CENTER/HOME - normalize camera and csphere<br>
        // r - home,center - 2d only!
        case 82: 
          a = {d:3};
          if(e.shiftKey){ // sh => home
            this.home(a);  
            //log({t:'this', f:'home', a:a});
            if(this.record_shots){
              this.mediator.record({t:'this', f:'home', a:a});
            }
          }else{          // no-sh => center - no change to zoom
            this.center(a);
            //log({t:'this', f:'center', a:a});
            if(this.record_shots){
              this.mediator.record({t:'this', f:'center', a:a});
            }
          }
          break;

        // ZOOM<br>
        // z - zoom in          
        case 90: 
          if(e.altKey){     // alt => fly
            if(e.shiftKey){ // sh => abs transform ('to')
              a = {s:2.0, d:3};
              this.zoomflyTo(a);  
              //log({t:'this', f:'zoomflyTo', a:a});
              if(this.record_shots){
                this.mediator.record({t:'this', f:'zoomflyTo', a:a});
              }
            }else{          // no-sh => rel transform ('by')
              a = {s:1.1111, d:3};
              this.zoomflyBy(a);
              //log({t:'this', f:'zoomflyBy', a:a});
              if(this.record_shots){
                this.mediator.record({t:'this', f:'zoomflyBy', a:a});
              }
            }
          }else{            // no-alt => cut
            if(e.shiftKey){ // shift  => 'to'
              a = {s:2.0};
              this.zoomcutTo(a);
              //log({t:'this', f:'zoomcutTo', a:a});
              if(this.record_shots){
                this.mediator.record({t:'this', f:'zoomcutTo', a:a});
              }
            }else{         
              a = {s:1.1111};
              this.zoomcutBy(a); // 1.0/0.9 = 1.1111
              //log({t:'this', f:'zoomcutBy', a:a});
              if(this.record_shots){
                this.mediator.record({t:'this', f:'zoomcutBy', a:a});
              }
            }
          }
          break;

        // x - zoom out          
        case 88:
          if(e.altKey){     // alt => fly
            if(e.shiftKey){ // sh => abs transform ('to')
              a = {s:0.5, d:3};
              this.zoomflyTo(a);  
              //log({t:'this', f:'zoomflyTo', a:a});
              if(this.record_shots){
                this.mediator.record({t:'this', f:'zoomflyTo', a:a});
              }
            }else{          // no-sh => rel transform ('by')
              a = {s:0.9, d:3};
              this.zoomflyBy(a);
              //log({t:'this', f:'zoomflyBy', a:a});
              if(this.record_shots){
                this.mediator.record({t:'this', f:'zoomflyBy', a:a});
              }
            }
          }else{            // no-alt => cut
            if(e.shiftKey){ // shift  => 'to'
              a = {s:0.5};
              this.zoomcutTo(a);
              //log({t:'this', f:'zoomcutTo', a:a});
              if(this.record_shots){
                this.mediator.record({t:'this', f:'zoomcutTo', a:a});
              }
            }else{         
              a = {s:0.9};
              this.zoomcutBy(a); 
              //log({t:'this', f:'zoomcutBy', a:a});
              if(this.record_shots){
                this.mediator.record({t:'this', f:'zoomcutBy', a:a});
              }
            }
          }
          break;
 

        // ROLL<br>
        // c - roll neg => ccw          
        case 67: 
          if(e.altKey){     // alt => fly
            if(e.shiftKey){ // sh => abs transform ('to')
              a = {r:-90, d:3};
              this.rollflyTo(a);  
              //log({t:'this', f:'rollflyTo', a:a});
              if(this.record_shots){
                this.mediator.record({t:'this', f:'rollflyTo', a:a});
              }
            }else{          // no-sh => rel transform ('by')
              a = {r:-22.5, d:3};
              this.rollflyBy(a);
              //log({t:'this', f:'rollflyBy', a:a});
              if(this.record_shots){
                this.mediator.record({t:'this', f:'rollflyBy', a:a});
              }
            }
          }else{            // no-alt => cut
            if(e.shiftKey){ // shift  => 'to'
              a = {r:-90};
              this.rollcutTo(a);
              //log({t:'this', f:'rollcutTo', a:a});
              if(this.record_shots){
                this.mediator.record({t:'this', f:'rollcutTo', a:a});
              }
            }else{         
              a = {r:-22.5};
              this.rollcutBy(a); 
              //log({t:'this', f:'rollcutBy', a:a});
              if(this.record_shots){
                this.mediator.record({t:'this', f:'rollcutBy', a:a});
              }
            }
          }
          break;

        // v - roll pos => cw          
        case 86: 
          if(e.altKey){     // alt => fly
            if(e.shiftKey){ // sh => abs transform ('to')
              a = {r:90, d:3};
              this.rollflyTo(a);  
              //log({t:'this', f:'rollflyTo', a:a});
              if(this.record_shots){
                this.mediator.record({t:'this', f:'rollflyTo', a:a});
              }
            }else{          // no-sh => rel transform ('by')
              a = {r:22.5, d:3};
              this.rollflyBy(a);
              //log({t:'this', f:'rollflyBy', a:a});
              if(this.record_shots){
                this.mediator.record({t:'this', f:'rollflyBy', a:a});
              }
            }
          }else{            // no-alt => cut
            if(e.shiftKey){ // shift  => 'to'
              a = {r:90};
              this.rollcutTo(a);
              //log({t:'this', f:'rollcutTo', a:a});
              if(this.record_shots){
                this.mediator.record({t:'this', f:'rollcutTo', a:a});
              }
            }else{         
              a = {r:22.5};
              this.rollcutBy(a); 
              //log({t:'this', f:'rollcutBy', a:a});
              if(this.record_shots){
                this.mediator.record({t:'this', f:'rollcutBy', a:a});
              }
            }
          }
          break;


        // DOLLY<br>
        // q - dollyX+          
        case 81: 
          if(e.altKey){     // alt => fly
            if(e.shiftKey){ // sh => abs transform ('to')
              a = {x:20, d:3};
              this.dollyflyTo(a);  
              //log({t:'this', f:'dollyflyTo', a:a});
              if(this.record_shots){
                this.mediator.record({t:'this', f:'dollyflyTo', a:a});
              }
            }else{          // no-sh => rel transform ('by')
              a = {x:10, d:3};
              this.dollyflyBy(a);
              //log({t:'this', f:'dollyflyBy', a:a});
              if(this.record_shots){
                this.mediator.record({t:'this', f:'dollyflyBy', a:a});
              }
            }
          }else{            // no-alt => cut
            if(e.shiftKey){ // shift  => 'to'
              a = {x:20};
              this.dollycutTo(a);
              //log({t:'this', f:'dollycutTo', a:a});
              if(this.record_shots){
                this.mediator.record({t:'this', f:'dollycutTo', a:a});
              }
            }else{         
              a = {x:10};
              this.dollycutBy(a); 
              //log({t:'this', f:'dollycutBy', a:a});
              if(this.record_shots){
                this.mediator.record({t:'this', f:'dollycutBy', a:a});
              }
            }
          }
          break;

        // w - dollyX-          
        case 87: 
          if(e.altKey){     // alt => fly
            if(e.shiftKey){ // sh => abs transform ('to')
              a = {x:-20, d:3};
              this.dollyflyTo(a);  
              //log({t:'this', f:'dollyflyTo', a:a});
              if(this.record_shots){
                this.mediator.record({t:'this', f:'dollyflyTo', a:a});
              }
            }else{          // no-sh => rel transform ('by')
              a = {x:-10, d:3};
              this.dollyflyBy(a);
              //log({t:'this', f:'dollyflyBy', a:a});
              if(this.record_shots){
                this.mediator.record({t:'this', f:'dollyflyBy', a:a});
              }
            }
          }else{            // no-alt => cut
            if(e.shiftKey){ // shift  => 'to'
              a = {x:-20};
              this.dollycutTo(a);
              //log({t:'this', f:'dollyCutTo', a:a});
              if(this.record_shots){
                this.mediator.record({t:'this', f:'dollycutTo', a:a});
              }
            }else{         
              a = {x:-10};
              this.dollycutBy(a); 
              //log({t:'this', f:'dollyCutBy', a:a});
              if(this.record_shots){
                this.mediator.record({t:'this', f:'dollycutBy', a:a});
              }
            }
          }
          break;

        // y - dollyY+          
        case 89: 
          if(e.altKey){     // alt => fly
            if(e.shiftKey){ // sh => abs transform ('to')
              a = {y:20, d:3};
              this.dollyflyTo(a);  
              //log({t:'this', f:'dollyflyTo', a:a});
              if(this.record_shots){
                this.mediator.record({t:'this', f:'dollyflyTo', a:a});
              }
            }else{          // no-sh => rel transform ('by')
              a = {y:10, d:3};
              this.dollyflyBy(a);
              //log({t:'this', f:'dollyflyBy', a:a});
              if(this.record_shots){
                this.mediator.record({t:'this', f:'dollyflyBy', a:a});
              }
            }
          }else{            // no-alt => cut
            if(e.shiftKey){ // shift  => 'to'
              a = {y:20};
              this.dollycutTo(a);
              //log({t:'this', f:'dollycutTo', a:a});
              if(this.record_shots){
                this.mediator.record({t:'this', f:'dollycutTo', a:a});
              }
            }else{         
              a = {y:10};
              this.dollycutBy(a); 
              //log({t:'this', f:'dollycutBy', a:a});
              if(this.record_shots){
                this.mediator.record({t:'this', f:'dollycutBy', a:a});
              }
            }
          }
          break;

        // u - dollyY-          
        case 85: 
          if(e.altKey){     // alt => fly
            if(e.shiftKey){ // sh => abs transform ('to')
              a = {y:-20, d:3};
              this.dollyflyTo(a);  
              //log({t:'this', f:'dollyflyTo', a:a});
              if(this.record_shots){
                this.mediator.record({t:'this', f:'dollyflyTo', a:a});
              }
            }else{          // no-sh => rel transform ('by')
              a = {y:-10, d:3};
              this.dollyflyBy(a);
              //log({t:'this', f:'dollyflyBy', a:a});
              if(this.record_shots){
                this.mediator.record({t:'this', f:'dollyflyBy', a:a});
              }
            }
          }else{            // no-alt => cut
            if(e.shiftKey){ // shift  => 'to'
              a = {y:-20};
              this.dollycutTo(a);
              //log({t:'this', f:'dollycutTo', a:a});
              if(this.record_shots){
                this.mediator.record({t:'this', f:'dollycutTo', a:a});
              }
            }else{         
              a = {y:-10};
              this.dollycutBy(a); 
              //log({t:'this', f:'dollycutBy', a:a});
              if(this.record_shots){
                this.mediator.record({t:'this', f:'dollycutBy', a:a});
              }
            }
          }
          break;


        // 9 - 'random' bezier 'through' curve  
        // * NOTE: bezier() will always fail e2e-spec test because at each run
        //   the vertices and control points are chosen by Math.random() so
        //   one run will never match another.
        case 57: 
          // uses default dur=10 npoints=5 
          this.bezier(); 
          //log({t:'this', f:'bezier', a:{d:10}});
          if(this.record_shots){
            this.mediator.record({t:'this', f:'bezier', a:{d:10}});
          }
          break;

        default:
      }
    });
  }//ctor


  place(narrative) {
    this.narrative = narrative;
    this.plane = document.getElementById("plane");
    this.zoom_plane = document.getElementById("zoom_plane");
    console.assert(this.plane, 'error setting plane!');
    console.assert(this.zoom_plane, 'error setting zoom_plane!');
  }


  actor(id){
    return document.getElementById(id);
  }


  center(a) {  
    a.d = a.d || 0.0;

    // shot
    this.shot = {delta: {
        timeline: {p: {paused:true, repeat:0},
               actors:{
                 'i2d:plane':[{dur:a.d, 
                                 p:{'x': 0.0, 'y': 0.0, immediateRender:false}}],
                 'i2d:zoom_plane':[{dur:a.d, p:{'rotation': 0.0,
                    svgOrigin:'0% 0%', immediateRender:false}}]
               }
              }//tl
              }//delta
    };//shot
    this.narrative.changeShot(this.shot);
  }


  home(a) {  
    a.d = a.d || 0.0;

    //shot
    this.shot = {delta: {
        timeline: {p: {paused:true, repeat:0},
               actors:{
                 'i2d:plane':[{dur:a.d, 
                                 p:{'x': 0.0, 'y': 0.0, immediateRender:false}}],
                 'i2d:zoom_plane': [{dur:a.d, p:{rotation: 0.0,
                 scale:1.0, svgOrigin:'0% 0%', immediateRender:false}}]
               }
              }//tl
              }//delta
    };//shot
    this.narrative.changeShot(this.shot);
  }


  // ZOOM<br>
  // cut - no animation
  zoomcutTo(a) {  
    if(a.s !== undefined){this.scale = a.s;}

    // shot
    this.shot = {delta: {
                  timeline: {p: {paused:true, repeat:0, tweens:[]},
                             actors:{
                              'i2d:zoom_plane':[{dur:0, p:{'scale':this.scale,
                                svgOrigin:'0% 0%', immediateRender:false}}]
                             }
                            }//tl
                        }//delta
                };//shot
    this.narrative.changeShot(this.shot);
  }
  zoomcutBy(a) {   
    if(a.s !== undefined){this.scale *= a.s;}

    // shot
    this.shot = {delta: {
                  timeline: {p: {paused:true, repeat:0, tweens:[]},
                             actors:{
                              'i2d:zoom_plane':[{dur:0, p:{'scale':this.scale,
                                svgOrigin:'0% 0%', immediateRender:false}}]
                             }
                            }//tl
                        }//delta
                };//shot
    this.narrative.changeShot(this.shot);
  }

  // fly - animate
  zoomflyTo(a) {   
    if(a.s !== undefined){this.scale = a.s;}

    // shot
    this.shot = {delta: {
                  timeline: {p: {paused:true, repeat:0, tweens:[]},
                             actors:{
                              'i2d:zoom_plane':[{dur:a.d, p:{'scale':this.scale,
                                svgOrigin:'0% 0%', immediateRender:false}}]
                             }
                            }//tl
                        }//delta
                };//shot
    this.narrative.changeShot(this.shot);
  }
  zoomflyBy(a) {   
    if(a.s !== undefined){this.scale *= a.s;}

    // shot
    this.shot = {delta: {
                  timeline: {p: {paused:true, repeat:0, tweens:[]},
                             actors:{
                              'i2d:zoom_plane':[{dur:a.d, p:{'scale':this.scale,
                                svgOrigin:'0% 0%', immediateRender:false}}]
                             }
                            }//tl
                        }//delta
                };//shot
    this.narrative.changeShot(this.shot);
  }


  // ROLL<br>
  // cut - no animation
  rollcutTo(a) {  
    if(a.r !== undefined){this.angle = a.r;}

    // shot
    this.shot = {delta: {
      timeline: {p: {paused:true, repeat:0, tweens:[]},
                 actors:{
                   'i2d:zoom_plane':[{dur:0, p:{'rotation':this.angle,
                      svgOrigin:'0% 0%', immediateRender:false}}]
                 }
                }//tl
                }//delta
    };//shot
    this.narrative.changeShot(this.shot);
  }
  rollcutBy(a) {  
    if(a.r !== undefined){this.angle += a.r;}

    // shot
    this.shot = {delta: {
      timeline: {p: {paused:true, repeat:0, tweens:[]},
                 actors:{
                   'i2d:zoom_plane':[{dur:0, p:{'rotation':this.angle,
                      svgOrigin:'0% 0%', immediateRender:false}}]
                 }
                }//tl
                }//delta
    };//shot
    this.narrative.changeShot(this.shot);
  }

  // fly - animate
  rollflyTo(a) {  
    if(a.r !== undefined){this.angle = a.r;}

    // shot
    this.shot = {delta: {
      timeline: {p: {paused:true, repeat:0, tweens:[]},
                 actors:{
                   'i2d:zoom_plane':[{dur:a.d, p:{'rotation':this.angle,
                      svgOrigin:'0% 0%', immediateRender:false}}]
                 }
                }//tl
                }//delta
    };//shot
    this.narrative.changeShot(this.shot);
  }
  rollflyBy(a) {  
    if(a.r !== undefined){this.angle += a.r;}

    // shot
    this.shot = {delta: {
      timeline: {p: {paused:true, repeat:0, tweens:[]},
                 actors:{
                   'i2d:zoom_plane':[{dur:a.d, p:{'rotation':this.angle,
                      svgOrigin:'0% 0%', immediateRender:false}}]
                 }
                }//tl
                }//delta
    };//shot
    this.narrative.changeShot(this.shot);
  }



  // DOLLY<br>
  // cut - no animation
  dollycutTo(a) { 
    if(a.x !== undefined){this.x = a.x;}
    if(a.y !== undefined){this.y = a.y;}

    // shot<br>
    // y-coords are webgl - svg translateY must be negated!
    this.shot = {delta: {
      timeline: {p: {paused:true, repeat:0, tweens:[]},
                 actors:{
                   'i2d:plane':[{dur:0, 
                                 p:{'x': this.x, 'y': -this.y,
                                   immediateRender:false}}]
                 }
                }//tl
                }//delta
    };//shot
    this.narrative.changeShot(this.shot);
  }
  dollycutBy(a) { 
    if(a.x !== undefined){this.x += a.x;}
    if(a.y !== undefined){this.y += a.y;}

    // shot<br>
    // y-coords are webgl - svg translateY must be negated!
    this.shot = {delta: {
      timeline: {p: {paused:true, repeat:0, tweens:[]},
                 actors:{
                   'i2d:plane':[{dur:0, 
                                 p:{'x': this.x, 'y': -this.y,
                                   immediateRender:false}}]
                 }
                }//tl
                }//delta
    };//shot
    this.narrative.changeShot(this.shot);
  }

  // fly - animate
  dollyflyTo(a) { 
    if(a.x !== undefined){this.x = a.x;}
    if(a.y !== undefined){this.y = a.y;}

    // shot<br>
    // y-coords are webgl - svg translateY must be negated!
    this.shot = {delta: {
      timeline: {p: {paused:true, repeat:0, tweens:[]},
                 actors:{
                   'i2d:plane':[{dur:a.d, 
                                 p:{'x': this.x, 'y': -this.y,
                                   immediateRender:false}}]
                 }
                }//tl
                }//delta
    };//shot
    this.narrative.changeShot(this.shot);
  }
  dollyflyBy(a) { 
    if(a.x !== undefined){this.x += a.x;}
    if(a.y !== undefined){this.y += a.y;}

    // shot<br>
    // y-coords are webgl - svg translateY must be negated!
    this.shot = {delta: {
      timeline: {p: {paused:true, repeat:0, tweens:[]},
                 actors:{
                   'i2d:plane':[{dur:a.d, 
                                 p:{'x': this.x, 'y': -this.y,
                                   immediateRender:false}}]
                 }
                }//tl
                }//delta
    };//shot
    this.narrative.changeShot(this.shot);
  }

  // random 2d-bezier camera nav<br> 
  // use default 6 points and 'through' bezier curve type
  bezier(a={d:10, n:6}){
    var i,
        x = [],
        y = [],
        v = [],
        bezier;

    // bezier 'through' curve points - y coords are made neg!
    x[0] = 0.0;
    y[0] = 0.0;
    if(Math.random() > 0.5){
      x[1] = 30.0*Math.random();   // ++
      y[1] = -30.0*Math.random();
      x[2] = -30.0*Math.random();  // -+
      y[2] = -30.0*Math.random();
      x[3] = -30.0*Math.random();  // --
      y[3] = 30.0*Math.random();
      x[4] = 30.0*Math.random();  // +-
      y[4] = 30.0*Math.random();
    }else{
      x[1] = -30.0*Math.random();   // --
      y[1] = 30.0*Math.random();
      x[2] = -30.0*Math.random();  // -+
      y[2] = -30.0*Math.random();
      x[3] = 30.0*Math.random();  // ++
      y[3] = -30.0*Math.random();
      x[4] = 30.0*Math.random();  // +-
      y[4] = 30.0*Math.random();
    }
    x[5] = 0.0;
    y[5] = 0.0;

    // create values array
    for(i=0; i<a.n; i++){
      v.push({x:x[i], y:y[i]});
    }
    bezier = {bezier:{autoRotate:true, 
                      curviness:2, 
                      values:v,
                      immediateRender:false}};

    // shot<br>
    // y-coords are webgl - svg translateY must be negated!
    this.shot = {delta: {
      timeline: {p: {paused:true, repeat:0, tweens:[]},
                 actors:{
                   'i2d:c':[{dur:a.d, p:bezier}]
                 }
                }//tl
                }//delta
    };//shot
    this.narrative.changeShot(this.shot);
  }
}//Camera2D

