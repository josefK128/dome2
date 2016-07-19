System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Model1;
    return {
        setters:[],
        execute: function() {
            // current post July 15
            // metaforms model for composite-component space.ts
            exports_1("Model1", Model1 = { scene: {
                    name: 'scene1',
                    camerasphere: null,
                    visible: { csphere: 'on', key: 'on', fill: 'on', back: 'on' }
                },
                shot: {},
                branches: {},
                actors: [
                    { id: 'bb1',
                        form: { type: 'billboard',
                            width: 20,
                            height: 20,
                            texture: { glad_png: './images/glad.png' } },
                        transform: { t: [-20, 20, 0] },
                        children: [] },
                    { id: 'cone1',
                        form: { type: 'cone',
                            opacity: 0.4 },
                        transform: { t: [20, -20, 0] },
                        children: [] },
                    { id: 'tetra1',
                        form: { type: 'tetrahedron',
                            radius: 20,
                            opacity: 0.4,
                            texture: { p2_jpg: './images/p2.jpg' } },
                        transform: { t: [0, 20, 0] },
                        children: [] },
                    { id: 'cube1',
                        form: { type: 'torus',
                            color: 'blue',
                            radius: 10,
                            tube: 3,
                            wireframe: true,
                            radialSegments: 16,
                            tubularSegments: 16,
                            opacity: 0.9 },
                        transform: { t: [-15, -10, 20] },
                        children: [] },
                    { id: 'sphere1',
                        form: { type: 'sphere',
                            radius: 5,
                            color: 'black' },
                        transform: {},
                        children: [] },
                    { id: 'sphere2',
                        form: { type: 'sphere',
                            radius: 10,
                            opacity: 0.4,
                            wireframe: true },
                        transform: {},
                        children: [] }
                ] //actors
            }); //Model1
        }
    }
});