export default 
`
  <div *ngFor="let node of node.children"> 
    <!-- <h4>{{node.id}}:{{node.form.type}}</h4> -->
    <template [ngIf]="node['form']['type'] === 'cylinder'">
      <cylinder [attr.id]="node.id" 
                [id]="node.id" [node]="node" [parent]="parent" [model]="model">
      </cylinder>
      <metaform3d [node]="node" [parent]="node" ></metaform3d>
    </template>

    <template [ngIf]="node['form']['type'] === 'torus'">
      <torus [attr.id]="node.id" 
             [id]="node.id" [node]="node" [parent]="parent" [model]="model">
      </torus>
      <metaform3d [node]="node" [parent]="node"></metaform3d>
    </template>
  </div>
`;
