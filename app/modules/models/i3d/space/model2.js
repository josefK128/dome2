System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Model2;
    return {
        setters:[],
        execute: function() {
            // current post July 15
            // metaforms model for composite-component space.ts
            // initialize node['children'] = model['actors']
            // each i3d composite-component uses same recursive metaforms template!
            //  template: `
            //  <metaform3d [node]="node" [model]="model" [parent]="node.children"></metaform3d>
            // `
            exports_1("Model2", Model2 = { scene: {
                    name: 'scene2',
                    procedural_actornames: [],
                    camerasphere: null,
                    visible: { csphere: 'off', key: 'on', fill: 'on', back: 'on' },
                },
                shot: { a: 16 },
                actors: [
                    {
                        id: 'mf0',
                        form: { type: 'cylinder' },
                        transform: { t: [10, 0, 0] },
                        children: [{
                                id: 'mf00',
                                form: { type: 'torus',
                                    color: 'blue',
                                    radius: 10,
                                    tube: 3,
                                    wireframe: true,
                                    radialSegments: 16,
                                    tubularSegments: 16,
                                    opacity: 0.9 },
                                transform: { t: [-20, -20, 10] },
                                children: [{
                                        id: 'mf000',
                                        form: { type: 'cylinder',
                                            radius: 3,
                                            height: 10,
                                            opacity: 0.4,
                                            color: 'orange' },
                                        transform: { t: [10, 10, 10] },
                                        children: []
                                    },
                                    {
                                        id: 'mf001',
                                        form: { type: 'torus',
                                            color: 'green',
                                            opacity: 0.4 },
                                        transform: {},
                                        children: [{
                                                id: 'mf0010',
                                                form: { type: 'torus',
                                                    color: 'green',
                                                    opacity: 0.4,
                                                    radialSegments: 16,
                                                    tubularSegments: 16 },
                                                transform: { t: [-30, -30, -20] },
                                                children: []
                                            } //mf0010
                                        ]
                                    } //mf001
                                ]
                            } //mf00
                        ]
                    },
                    {
                        id: 'mf1',
                        form: { type: 'torus',
                            color: 'green',
                            radialSegments: 16,
                            tubularSegments: 16,
                            opacity: 0.3 },
                        transform: { t: [-10, 0, 0] },
                        children: []
                    } //mf1
                ] //actors
            }); //Model2
        }
    }
});
// pre July 15
// initialize node['children'] = model['actors']['metaforms']
//export var Model2 = { scene: {
//                        name: 'scene2',
//                        procedural_actornames: [],
//                        camerasphere: null,
//                        visible:{csphere:'on',key:'on',fill:'on',back:'on'},
//                      },
//                      shot:{a:16},
//                      actors: {
//                        metaforms: [
//                          { // root node
//                            id:'mf0',
//                            form:{type:'cylinder'},
//                            transform:{},
//                            children:[{
//                                id:'mf00',
//                                form:{type:'torus'},
//                                transform:{},
//                                children:[{   
//                                    id:'mf000',
//                                    form:{type:'cylinder'},
//                                    transform:{},
//                                    children:[]
//                                  },//mf000
//                                  {   
//                                    id:'mf001',
//                                    form:{type:'torus'},
//                                    transform:{},
//                                    children:[{
//                                        id:'mf0010',
//                                        form:{type:'torus'},
//                                        transform:{},
//                                        children:[]
//                                      }//mf0010
//                                    ]
//                                  }//mf001
//                                ]
//                              }//mf00
//                            ]
//                          },//mf0
//                          { // root node
//                            id:'mf1',
//                            form:{type:'torus'},
//                            transform:{},
//                            children:[]
//                          }//mf1
//                        ]//metaforms
//                      }//actors
//                    };//Model2
