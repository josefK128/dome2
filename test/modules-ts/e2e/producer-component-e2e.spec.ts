// producer-component-e2e.spec.ts
import {describe, expect, it, inject} from 'angular2/testing';
import {beforeEach, beforeEachProviders, afterEach} from 'angular2/testing';
import {Injectable, provide} from 'angular2/core';
import promise from 'es6-promise';
import {MF_CONFIG, Config, CONFIG} from '../../../app/modules/mf-config.js';
import {G} from '../../../app/modules/services/g-service.js';
import {P} from '../../../app/modules/services/p-service.js';
import {L} from '../../../app/modules/services/l-service.js';
import {Producer} from '../../../app/modules/components/producer-component.js';


var axiom1 = { axiom: [2,4],
            g_rule: '+',
            p_rule: .5 },
    axiom2 = { axiom: [3,5],
            g_rule: '*',
            p_rule: 2.0 },
    genotype1 = { axiom: [2,4],
            g_rule: '+',
            p_rule: .5, 
            genotype: 6},
    genotype2 = { axiom: [3,5],
            g_rule: '*',
            p_rule: 2.0, 
            genotype: 15},
    expect_genotype1 = 6,
    expect_phenotype1 = 3,
    expect_genotype2 = 15,
    expect_phenotype2 = 30,
    producer = new Producer(CONFIG, G, P, L);


export function main() {

  console.log('describe producer-component-e2e-spec');
  describe('producer-component-e2e-spec', () => {
    beforeEachProviders(() => [
    ]);

    beforeEach(() => {
      // diagnostics
      console.log(`producer.spec: CONFIG.test = ${CONFIG.test}`);
    });

    it('should be defined after construction from class Producer', () => {
      expect(producer).toBeDefined();
    });


    it('should correctly g-process axiom1', (done) => {
        producer.emitG(axiom1).then((o) => {
          expect(o.genotype).toEqual(expect_genotype1);
          done();
        });
    });

    it('should correctly g-process axiom2', (done) => {
        producer.emitG(axiom2).then((o) => {
          expect(o.genotype).toEqual(expect_genotype2);
          done();
        });
    });

    it('should correctly p-process genotype1', (done) => {
        producer.emitP(genotype1).then((o) => {
          expect(o.phenotype).toEqual(expect_phenotype1);
          done();
        });
    });

    it('should correctly p-process genotype2', (done) => {
        producer.emitP(genotype2).then((o) => {
          expect(o.phenotype).toEqual(expect_phenotype2);
          done();
        });
    });


    afterEach(() => {
      axiom1 = axiom1;
    });
  }); //describe
}
