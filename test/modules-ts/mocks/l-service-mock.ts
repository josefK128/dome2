// l-service-mock.js 
// mock client-proxy of Log-service

'use strict';

import {Injectable} from 'angular2/core';


@Injectable()
export class L {

  constructor(config) {
    config = config;
  }


  // send msg to Log service
  // o is object
  emit(o){
    o=o;
  }
}; // class


