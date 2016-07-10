// textures.spec.ts
import {provide} from '@angular/core';
import {beforeEach, beforeEachProviders, describe, expect, it} from '@angular/core/testing';
//import {inject} from '@angular/core/testing';   // fails ?!

// config
import {config} from '../configs/@config';

// service
import {Textures} from './textures';



export default function main() {
  var textures;

  console.log('describe textures.get');
  describe('get', () => {
    beforeEachProviders(() => [
      provide(Textures, {useClass: Textures})  
    ]);
    beforeEach(() => {                                // good
      textures = new Textures(config);
    });
    //beforeEach((inject([Injector], (injector) => {  // fails
    //  textures = injector.get(Textures);
    //}));
    //beforeEach((inject([Textures], (t) => {         // fails
    //  textures = t;
    //}));

    console.log(`Textures = ${Textures}`);

    // test
    //it('should exist', [Textures], (textures) => {
    it('Textures should exist', () => {
      expect(Textures).toBeDefined();
    });
    it('textures should exist', () => {
      expect(textures).toBeDefined();
    });
    it('Textures to be type function', () => {
      expect(typeof Textures).toBe('function');
    });
    it('textures to be type object', () => {
      expect(typeof textures).toBe('object');
    });

  }); //describe
};


