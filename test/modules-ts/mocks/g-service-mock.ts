// g-service-mock.js 
// mock client-proxy of Genotype-service

'use strict';

import {Injectable} from 'angular2/core';


@Injectable()
export class G {
  client;

  constructor(client, config) {
    this.client = client;
  }


  // send axiom/genotype to Genotype service as JSON
  // o is object
  emit(o){
    setTimeout(() => {
      this.client.receiveG(o);
    }, 1000);
  }
}; // class


