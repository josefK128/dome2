// current post July 15
// metaforms model for composite-component space.ts
export var Modelhead = { scene: {
                        name: '',
                        camerasphere: null,
                        visible:{csphere:'on',key:'on',fill:'on',back:'on'}
                      },
                      shot:{},
                      branches:{},
                      actors: [
                        { id:'head',
                          form:{type:'jsonmodel',
                                phong: false,
                                color: 0xffffff,
                                emissive_color: 0x000000,
                                emissiveIntensity: 1,
                                specular_color: 0xffa500, //orange
                                reflectivity: 1,
                                shininess: 3.0,
                                jsonmodel:{head:
                                  './webgl/models/head_scan/head_scan.json'}}, 
                          transform: {t: [0.0,0.0,-10.0], e:[0.0,0.185, 0.0], s:[1.0,1.0,1.0]},
                          children:[]}, 
                      ]//actors
                    };//Modelhead

