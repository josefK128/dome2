System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters:[],
        execute: function() {
            exports_1("default","\n  <div *ngFor=\"let node of node.children\"> \n    <!-- <h4>{{node.id}}:{{node.form.type}}</h4> -->\n    <template [ngIf]=\"node['form']['type'] === 'circle'\">\n      <circle [attr.id]=\"node.id\" \n              [id]=\"node.id\" [node]=\"node\" [parent]=\"parent\" [model]=\"model\">\n      </circle>\n      <metaform2d [node]=\"node\" [parent]=\"node\" ></metaform2d>\n    </template>\n    <template [ngIf]=\"node['form']['type'] === 'rect'\">\n      <rect [attr.id]=\"node.id\" \n            [id]=\"node.id\" [node]=\"node\" [parent]=\"parent\" [model]=\"model\">\n      </rect>\n      <metaform2d [node]=\"node\" [parent]=\"node\"></metaform2d>\n    </template>\n  </div>\n");
        }
    }
});
