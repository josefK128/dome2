// mf-config.ts
import {OpaqueToken} from 'angular2/core';

export let MF_CONFIG = new OpaqueToken('mf-config');

export interface Config {
  test: boolean;
  hostG: string;
  portG: number;
  hostP: string;
  portP: number;
  hostL: string;
  portL: number;
  period: number;
  cbg: Function;
  cbp: Function;
};

export const CONFIG:Config = {
  test: true,
  hostG: 'localhost',
  portG: 8080,
  hostP: 'localhost',
  portP: 8081,
  hostL: 'localhost',
  portL: 8082,
  period: 5000,
  cbg: (o) => {o=o;},
  cbp: (o) => {o=o;} 
};

