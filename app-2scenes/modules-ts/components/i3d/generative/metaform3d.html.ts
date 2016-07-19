export default 
`
<div *ngFor="let node of node.children"> 
    <!-- <h4>{{node.id}}:{{node.form.type}}</h4> -->

    <!-- CYLINDER -->
    <template [ngIf]="node['form']['type'] === 'cylinder'">
      <cylinder [attr.id]="node.id" #{{node.id}} 
                [id]="node.id" [node]="node" [parent]="parent" [model]="model">
      </cylinder>
      <metaform3d [node]="node" [parent]="node" ></metaform3d>
    </template>

    <!-- TORUS -->
    <template [ngIf]="node['form']['type'] === 'torus'">
      <torus [attr.id]="node.id"  #{{node.id}}
             [id]="node.id" [node]="node" [parent]="parent" [model]="model">
      </torus>
      <metaform3d [node]="node" [parent]="node"></metaform3d>
    </template>

    <!-- TETRAHEDRON -->
    <template [ngIf]="node['form']['type'] === 'tetrahedron'">
      <tetrahedron [attr.id]="node.id"  #{{node.id}}
             [id]="node.id" [node]="node" [parent]="parent" [model]="model">
      </tetrahedron>
      <metaform3d [node]="node" [parent]="node"></metaform3d>
    </template>

    <!-- SPHERE -->
    <template [ngIf]="node['form']['type'] === 'sphere'">
      <sphere [attr.id]="node.id"  #{{node.id}}
             [id]="node.id" [node]="node" [parent]="parent" [model]="model">
      </sphere>
      <metaform3d [node]="node" [parent]="node"></metaform3d>
    </template>

    <!-- CUBE -->
    <template [ngIf]="node['form']['type'] === 'cube'">
      <cube [attr.id]="node.id"  #{{node.id}}
             [id]="node.id" [node]="node" [parent]="parent" [model]="model">
      </cube>
      <metaform3d [node]="node" [parent]="node"></metaform3d>
    </template>

    <!-- CONE -->
    <template [ngIf]="node['form']['type'] === 'cone'">
      <cone [attr.id]="node.id"  #{{node.id}}
             [id]="node.id" [node]="node" [parent]="parent" [model]="model">
      </cone>
      <metaform3d [node]="node" [parent]="node"></metaform3d>
    </template>
    
    <!-- BILLBOARD -->
    <template [ngIf]="node['form']['type'] === 'billboard'">
      <billboard [attr.id]="node.id"  #{{node.id}}
             [id]="node.id" [node]="node" [parent]="parent" [model]="model">
      </billboard>
      <metaform3d [node]="node" [parent]="node"></metaform3d>
    </template>

</div>
`;
