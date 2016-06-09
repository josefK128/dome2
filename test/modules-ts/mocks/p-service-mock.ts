// p-service-mock.js 
// mock client-proxy of Phenotype-service

'use strict';

import {Injectable} from 'angular2/core';


@Injectable()
export class P {
  client; 

  constructor(client, config) {
    this.client = client;
  }


  // send axiom/genotype to Genotype service as JSON
  // o is object
  emit(o){
    setTimeout(() => {
      this.client.receiveP(o);
    }, 1000);
  }
}; // class


