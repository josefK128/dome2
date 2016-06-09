interface Config {
  url_pattern:string;
  url_keys:string[];
  canvas_id: string;
  opening_scene: string;
  scene: any;
  test: boolean;
  name: string;
  items: string[];
  hostL: string;
  portL: number;
  f: Function;
  provider_defaults: any[];
};
export default Config;

