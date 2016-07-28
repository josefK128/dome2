System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var s0;
    return {
        setters:[],
        execute: function() {
            exports_1("s0", s0 = {
                timeline: {
                    p: { paused: true, repeat: 1, yoyo: true },
                    actors: {
                        'i3d:csphere:position': [{ dur: 4, p: { x: 20 } }],
                        'i3d:csphere:rotation': [{ dur: 4, p: { y: 1.0 } }],
                        //'i2d:zoom_plane:translate':[{dur:2, p:{x:-50}}, {dur:2, p:{y:-50}}], 
                        //'i2d:zoom_plane':[{dur:2, p:{scale:0.2}}], 
                        'i2d:plane': [{ dur: 4, p: { x: -20 } }]
                    }
                }
            }); //s0
        }
    }
});
