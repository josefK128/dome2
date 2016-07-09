System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Model2;
    return {
        setters:[],
        execute: function() {
            exports_1("Model2", Model2 = { scene: {
                    name: 'scene2',
                    procedural_actornames: [],
                    camerasphere: null,
                    visible: { csphere: 'on', key: 'on', fill: 'on', back: 'on' },
                },
                shot: { a: 16 },
                actors: {
                    metaforms: [
                        {
                            id: 'mf0',
                            form: { type: 'cylinder' },
                            transform: {},
                            children: [{
                                    id: 'mf00',
                                    form: { type: 'torus' },
                                    transform: {},
                                    children: [{
                                            id: 'mf000',
                                            form: { type: 'cylinder' },
                                            transform: {},
                                            children: []
                                        },
                                        {
                                            id: 'mf001',
                                            form: { type: 'torus' },
                                            transform: {},
                                            children: [{
                                                    id: 'mf0010',
                                                    form: { type: 'torus' },
                                                    transform: {},
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
                            form: { type: 'torus' },
                            transform: {},
                            children: []
                        } //mf1
                    ] //metaforms
                } //actors
            }); //Model2
        }
    }
});
