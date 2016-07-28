// cube0json.js
// writes visible cube but then csphere and camera controls
// do NOT work ?!

var cube0json = JSON.stringify({
  delta: {
    timeline: {},
    branches: {
      'i3d': {children: {
                'cube0': {form: {type: "'cube.i3d'",
                                   x:0.0, y:0.0, z:0.0, 
                                   textureurl:"./images/sky.jpg",
                                   w:10.0, h:10.0, d:10.0,
                                   color:"blue", transparent:true, opacity:1.0},
                            transform: {t: [-10,-10,0],s:[1.0,1.0,1.0]},
                            children: {}
                }
             }//children
           }//i3d - parent
    }//branches
  }//delta
});//cube0json



// growa0json.js
// sequence: grow-anim done once per node (repeat:0)

var growa0json = JSON.stringify({
  delta: {
    timeline: {p: {repeat:0},
               actors:{
                 'i3d:cube0:scale': [{dur:10, p:{x:0.5, y:0.5, z:0.5}}]
              },
    },
    branches: {
      cube0: {children:{
                cube0_2: {form: {type: "'cube.i3d'",
                                   x:0.0, y:0.0, z:0.0, 
                                   textureurl:"./images/sky.jpg",
                                   w:5.0, h:10.0, d:10.0,
                                   color:"blue", transparent:true, opacity:1.0},
                            transform: {t: [-20,-10,0],s:[0.01,0.01,0.01]},
                            children: {}
                },
                cube0_3: {form: {type: "'cube.i3d'",
                                   x:0.0, y:-20.0, z:0.0, 
                                   textureurl:"sky_jpg",
                                   w:5.0, h:10.0, d:10.0,
                                   color:"blue", transparent:true, opacity:1.0},
                            transform: {t: [20,0,0], s:[0.01,0.01,0.01]},
                            children: {}
                }
              }//children
             }//cube0
    }//branches
  }//delta
});//growa0json







// growa1json.js
// sequence: grow-anim done once per node w(repeat:0)
// apply grow to prior-existing nodes, node nodes grafted
// during this shot!

var growa1json = JSON.stringify({
  delta: {
    timeline: {p:{repeat:0},
               actors:{
                   'i3d:cube0_2:scale': [{dur:10, p:{x:1.0, y:1.0, z:1.0}}],
                   'i3d:cube0_3:scale': [{dur:10, p:{x:1.0, y:1.0, z:1.0}}]
               }
              },
    branches: {
      cube0_2: {children: {
                s0_2_0: {form: {type: "'sphere.i3d'",
                                   r:5.0,
                                   color:"blue", transparent:true, opacity:0.8},
                            transform: {e:[0,-0.785,0], t: [-10,-10,0],s:[0.01,0.01,0.01]},
                            children: {}
                },
                s0_2_1: {form: {type: "'sphere.i3d'",
                                   r:5.0,
                                   color:"blue", transparent:true, opacity:0.8},
                            transform: {e:[0,0.785,0], t:[10,10,0],s:[0.01,0.01,0.01]},
                            children: {}
                }
               }//children
      }//cube0_2 - parent
    }//branches
  }//delta
});//growa1json



// growa2json.js
// sequence: grow-anim done once per node w(repeat:0)

var growa2json = JSON.stringify({
  delta: {
    timeline: {p:{repeat:0},
               actors:{
                   'i3d:s0_2_0:scale':[{dur:10, p:{x:1.0, y:1.0, z:1.0}}],
                   'i3d:s0_2_1:scale':[{dur:10, p:{x:1.0, y:1.0, z:1.0}}]
               }
              },
    branches: {}
  }//delta
});//growa2json


