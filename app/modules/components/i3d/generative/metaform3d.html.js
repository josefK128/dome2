System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters:[],
        execute: function() {
            exports_1("default","\n  <div *ngFor=\"let node of node.children\"> \n    <!-- <h4>{{node.id}}:{{node.form.type}}</h4> -->\n    <template [ngIf]=\"node['form']['type'] === 'cylinder'\">\n      <cylinder [attr.id]=\"node.id\" \n                [id]=\"node.id\" [node]=\"node\" [parent]=\"parent\" [model]=\"model\">\n      </cylinder>\n      <metaform3d [node]=\"node\" [parent]=\"node\" ></metaform3d>\n    </template>\n\n    <template [ngIf]=\"node['form']['type'] === 'torus'\">\n      <torus [attr.id]=\"node.id\" \n             [id]=\"node.id\" [node]=\"node\" [parent]=\"parent\" [model]=\"model\">\n      </torus>\n      <metaform3d [node]=\"node\" [parent]=\"node\"></metaform3d>\n    </template>\n  </div>\n");
        }
    }
});
