export default 
`
  <div *ngFor="let node of node.children"> 
    <!-- <h4>{{node.id}}:{{node.form.type}}</h4> -->
    <template [ngIf]="node['form']['type'] === 'circle'">
      <circle [attr.id]="node.id" 
              [id]="node.id" [node]="node" [parent]="parent" [model]="model">
      </circle>
      <metaform2d [node]="node" [parent]="node" ></metaform2d>
    </template>
    <template [ngIf]="node['form']['type'] === 'rect'">
      <rect [attr.id]="node.id" 
            [id]="node.id" [node]="node" [parent]="parent" [model]="model">
      </rect>
      <metaform2d [node]="node" [parent]="node"></metaform2d>
    </template>
  </div>
`;
