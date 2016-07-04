System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Model2;
    return {
        setters:[],
        execute: function() {
            exports_1("Model2", Model2 = {
                scene: 'scene2',
                visible: { csphere: 'on', key: 'on', fill: 'on', back: 'on' },
                actors: {
                    metaforms: [
                        {
                            id: 'tree0',
                            form: { type: 'cylinder' },
                            transform: {},
                            children: [{
                                    id: 'tree00',
                                    form: { type: 'torus' },
                                    transform: {},
                                    children: []
                                }
                            ]
                        },
                        {
                            id: 'tree1',
                            form: { type: 'torus' },
                            transform: {},
                            children: []
                        }
                    ]
                } //actors
            }); //Model2
        }
    }
});
