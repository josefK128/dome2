interface Config {
  controls:string[];
  controlstates:Object;
  scenes:string[];
  scenepaths:Object;
  scenestates:Object;

  metastate:string;
  substates:string[];

  canvas_id: string;
  opening_scene: string;

  unit_test: boolean;
  e2e_test: boolean;
  name: string;

  server_host: string;
  server_port: number;
  server_connect:boolean;
  record_stream:boolean;
  channels:string[];

  targets:Object;

  provider_overrides: any[];
};
export default Config;

