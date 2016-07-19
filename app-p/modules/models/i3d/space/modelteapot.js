System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Modelteapot;
    return {
        setters:[],
        execute: function() {
            // current post July 15
            // metaforms model for composite-component space.ts
            exports_1("Modelteapot", Modelteapot = { scene: {
                    name: 'scene3',
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
                                    color: '0xff0000',
                                    intensity: 2.5,
                                    distance: 100.0,
                                    position: [50.0, 20.0, 20.0]
                                } },
                            fill: { form: { type: "'pointlight'",
                                    color: '0x0000ff',
                                    intensity: 0.8,
                                    distance: 100.0,
                                    position: [-50.0, -10.0, 0.0]
                                } },
                            back: { form: { type: "'pointlight'",
                                    color: '0x00ff00',
                                    intensity: 2.5,
                                    distance: 100.0,
                                    position: [-40.0, -10.0, -50.0]
                                } }
                        } //children
                    },
                    visible: { csphere: 'off', key: 'on', fill: 'on', back: 'on' }
                },
                shot: {},
                branches: {},
                actors: [] //actors
            }); //Modelteapot
        }
    }
});
