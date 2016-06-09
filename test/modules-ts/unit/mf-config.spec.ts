// mf-config.spec.ts
import {describe, expect, it, inject, beforeEachProviders} from 'angular2/testing';
import {CONFIG} from '../../../app/modules/mf-config.js';

export function main() {
  console.log('describe configuration-component mf-config');
  describe('mf-config-spec', () => {
    beforeEachProviders(() => [
    ]);

    // test
    it('should define property test', () => {
      expect(CONFIG['test']).toBeDefined();
    });

    // Genotype
    it('should define property hostG', () => {
      expect(CONFIG['hostG']).toBeDefined();
    });
    it('CONFIG["hostG"] value should be type string', () => {
      expect(typeof CONFIG['hostG']).toEqual('string');
    });
    it('should define property portG', () => {
      expect(CONFIG['portG']).toBeDefined();
    });
    it('CONFIG["portG"] value should be type number', () => {
      expect(typeof CONFIG['portG']).toEqual('number');
    });

    // Phenotype
    it('should define property hostP', () => {
      expect(CONFIG['hostP']).toBeDefined();
    });
    it('CONFIG["hostP"] value should be type string', () => {
      expect(typeof CONFIG['hostP']).toEqual('string');
    });
    it('should define property portP', () => {
      expect(CONFIG['portP']).toBeDefined();
    });
    it('CONFIG["portP"] value should be type number', () => {
      expect(typeof CONFIG['portP']).toEqual('number');
    });

    // Log
    it('should define property hostL', () => {
      expect(CONFIG['hostL']).toBeDefined();
    });
    it('CONFIG["hostL"] value should be type string', () => {
      expect(typeof CONFIG['hostL']).toEqual('string');
    });
    it('should define property portL', () => {
      expect(CONFIG['portL']).toBeDefined();
    });
    it('CONFIG["portL"] value should be type number', () => {
      expect(typeof CONFIG['portL']).toEqual('number');
    });

    // period
    it('should define property period', () => {
      expect(CONFIG['period']).toBeDefined();
    });
    it('CONFIG["period"] value should be type number', () => {
      expect(typeof CONFIG['period']).toEqual('number');
    });

    // callback-g
    it('should define property cbg', () => {
      expect(CONFIG['cbg']).toBeDefined();
    });
    it('CONFIG["cbg"] value should be type function', () => {
      expect(typeof CONFIG['cbg']).toEqual('function');
    });

    // callback-p
    it('should define property cbp', () => {
      expect(CONFIG['cbp']).toBeDefined();
    });
    it('CONFIG["cbp"] value should be type function', () => {
      expect(typeof CONFIG['cbp']).toEqual('function');
    });
  }); //describe
}
//export interface Config {
//  hostG: string,
//  portG: number,
//  hostP: string,
//  portP: number,
//  hostL: string,
//  portL: number,
//  period: number,
//  cbg: Function,
//  cbp: Function
//};


