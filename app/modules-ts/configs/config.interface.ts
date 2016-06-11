interface Config {
  url_pattern:string;
  url_keys:string[];
  canvas_id: string;
  opening_scene: string;
  scene: any;
  test: boolean;
  name: string;
  server_host: string;
  server_port: number;
  provider_defaults: any[];
};
export default Config;

