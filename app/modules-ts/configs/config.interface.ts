interface Config {
  controls:string[];
  controlstates:Object;
  scenes:string[];
  scenepaths:Object;
  scenestates:Object;

  metastate:string;
  substates:string[];

  opening_scene: string;
  canvas_id: string;
  camerasphere:Object;
  preload_textures:Object;

  unit_test: boolean;
  e2e_test: boolean;
  name: string;

  server_host: string;
  server_port: number;
  server_connect:boolean;
  record_stream:boolean;
  record_shots:boolean;
  channels:string[];

  provider_overrides: any[];
};
export default Config;

