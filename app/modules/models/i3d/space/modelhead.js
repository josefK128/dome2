System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Modelhead;
    return {
        setters:[],
        execute: function() {
            // current post July 15
            // metaforms model for composite-component space.ts
            exports_1("Modelhead", Modelhead = { scene: {
                    name: '',
                    visible: { csphere: 'off', key: 'on', fill: 'on', back: 'on' },
                    camerasphere: {
                        form: {
                            radius: 50.0,
                            wireframe: true,
                            transparent: true,
                            opacity: 0.5,
                            color: "red" },
                        transform: {},
                        children: {
                            camera: { form: { name: 'default',
                                    fov: 90,
                                    near: 1,
                                    far: 1000,
                                    position: [0, 0, 50]
                                } },
                            key: { form: { type: "'pointlight'",
                                    color: 'rgb(255,165,0)',
                                    intensity: 5.0,
                                    distance: 100.0,
                                    position: [40.0, 20.0, 20.0]
                                } },
                            fill: { form: { type: "'pointlight'",
                                    color: 'rgb(0,0,255)',
                                    intensity: 7.8,
                                    distance: 100.0,
                                    position: [-50.0, -10.0, 0.0]
                                } },
                            back: { form: { type: "'pointlight'",
                                    color: 'rgb(30,30,30)',
                                    intensity: 2.0,
                                    distance: 40.0,
                                    position: [-40.0, -10.0, -50.0]
                                } }
                        } //children
                    } //camerasphere
                },
                shot: {},
                branches: {},
                actors: [
                    { id: 'head',
                        form: { type: 'jsonmodel',
                            phong: false,
                            color: 0xffffff,
                            emissive_color: 0x000000,
                            emissiveIntensity: 1,
                            specular_color: 0xffa500,
                            reflectivity: 1,
                            shininess: 3.0,
                            jsonmodel: { head: './webgl/models/teapot/teapot.json' } },
                        //'./webgl/models/head_scan/head_scan.json'}}, 
                        transform: { t: [0.0, 0.0, -10.0], e: [0.0, 0.185, 0.0], s: [1.0, 1.0, 1.0] },
                        children: [] },
                ] //actors
            }); //Modelhead
        }
    }
});
