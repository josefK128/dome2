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


    // get material - first time 
    it("textures.get returns Promise for a material", (done) => {
      var promise = textures.get('sky_jpg', './images/sky.jpg');

      expect(promise).toBeDefined();
      expect(promise.then).toBeDefined();
      promise.then((material) => {
        expect(material).toBeDefined();
        done();
      }).catch((e) => {
        console.log(`reject: reason = ${e}`);
        done();
      });
    });

    // get material - 2nd time 
    it("textures.get resolves promise to a THREE.ShaderMaterial", (done) => {
      textures.get('action_skate_png', './images/css3d/action_skate.png').then((material) => {
        expect(material).toBeDefined();
        expect(material.visible).toBeDefined();
        expect(material.blendSrc).toBe(THREE.SrcAlphaFactor);
        done();
      }).catch((e) => {
        console.log(`reject: reason = ${e}`);
        done();
      });
    });

    // get material - 3rd time
    it("textures.get rejects promise for non-existent texture", (done) => {
      textures.get('x_png', './images/nonexistent.png').then((material) => {
        expect(material).not.toBeDefined();
        console.log(`resolved to ${material}`);
        done();
      }).catch((e) => {
        expect(e).toBeDefined();
        console.log(`rejected for reason ${e}`);
        console.dir(e);
        done();
      });
    });
  }); //describe get


  describe('preload', () => {
    beforeEachProviders(() => [
      provide(Textures, {useClass: Textures})  
    ]);
    beforeEach(() => {                                // good
      textures = new Textures(config);
    });

    it("ctor preload loads four textures as ShaderMaterials", (done) => {
      var i = 0,
          material,
          keys = Object.keys({Escher_png: './images/Escher.png',
                     glad_png: './images/glad.png',
                     p2_jpg: './images/p2.jpg',
                     sky_jpg: './images/sky.jpg'});

      // wait for preload promise to resolve
      setTimeout(() => {
        for(let t of Object.keys(textures.materials)){
          expect(t).toEqual(keys[i++]);
          console.log(`textures.materials[${t}] = ${textures.materials[t]}`);
          material = textures.materials[t];
          expect(material.visible).toBeDefined();
          expect(material.blendSrc).toBe(THREE.SrcAlphaFactor);
        }
        done();
      },2000);
    });
  });
};


