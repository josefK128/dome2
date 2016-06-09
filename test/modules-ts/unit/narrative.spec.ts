// narrative.spec.ts
import {describe, expect, it, inject} from 'angular2/testing';
import {beforeEach, beforeEachProviders, afterEach} from 'angular2/testing';
import {Component, View, Injectable, Inject, provide} from 'angular2/core';
import {Narrative} from '../../../app/modules/narrative.js';
import {MF_CONFIG, Config, CONFIG} from '../mocks/mf-config-mock.js';



export function main() {
  console.log('describe root-component narrative');
  describe('narrative-spec', () => {
    var narrative;
    beforeEachProviders(() => [
      provide(MF_CONFIG, {useValue: CONFIG})
    ]);

    beforeEach(() => {
      narrative = new Narrative(CONFIG);
    });

    it('should be defined after construction from class Narrative', () => {
      expect(narrative).toBeDefined();
    });

    it('should retrieve a reference to the unique CONFIG object', () => { 
      expect(narrative.getConfig()).toBe(CONFIG);
    });

    it('should use test mode', () => { 
      var config = narrative.getConfig();
      expect(config['test']).toBe(true);
    });

    afterEach(() => {
      narrative = undefined;
    });
  }); //describe
}
