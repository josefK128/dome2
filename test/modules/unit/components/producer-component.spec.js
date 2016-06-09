System.register(['angular2/testing', '../../mocks/mf-config-mock.js', '../../mocks/g-service-mock.js', '../../mocks/p-service-mock.js', '../../mocks/l-service-mock.js', '../../../../app/modules/components/producer-component.js'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var testing_1, testing_2, mf_config_mock_js_1, g_service_mock_js_1, p_service_mock_js_1, l_service_mock_js_1, producer_component_js_1;
    var axiom1, axiom2, genotype1, genotype2, expect_genotype1, expect_phenotype1, expect_genotype2, expect_phenotype2, producer;
    function main() {
        console.log('describe producer-component-spec');
        testing_1.describe('producer-component-spec', function () {
            testing_2.beforeEachProviders(function () { return []; });
            testing_2.beforeEach(function () {
                // diagnostics
                console.log('\n\n %*%%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%');
                console.log("producer.spec: CONFIG.test = " + mf_config_mock_js_1.CONFIG.test);
                console.log("producer.spec: G = " + g_service_mock_js_1.G);
                console.log('\n\n %*%%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%');
            });
            testing_1.it('should be defined after construction from class Producer', function () {
                testing_1.expect(producer).toBeDefined();
            });
            testing_1.it('should correctly g-process axiom1', function (done) {
                producer.emitG(axiom1).then(function (o) {
                    testing_1.expect(o.genotype).toEqual(expect_genotype1);
                    done();
                });
            });
            testing_1.it('should correctly g-process axiom2', function (done) {
                producer.emitG(axiom2).then(function (o) {
                    testing_1.expect(o.genotype).toEqual(expect_genotype2);
                    done();
                });
            });
            testing_1.it('should correctly p-process genotype1', function (done) {
                producer.emitG(genotype1).then(function (o) {
                    testing_1.expect(o.phenotype).toEqual(expect_phenotype1);
                    done();
                });
            });
            testing_1.it('should correctly p-process genotype2', function (done) {
                producer.emitG(genotype2).then(function (o) {
                    testing_1.expect(o.phenotype).toEqual(expect_phenotype2);
                    done();
                });
            });
            testing_2.afterEach(function () {
                axiom1 = axiom1;
            });
        }); //describe
    }
    exports_1("main", main);
    return {
        setters:[
            function (testing_1_1) {
                testing_1 = testing_1_1;
                testing_2 = testing_1_1;
            },
            function (mf_config_mock_js_1_1) {
                mf_config_mock_js_1 = mf_config_mock_js_1_1;
            },
            function (g_service_mock_js_1_1) {
                g_service_mock_js_1 = g_service_mock_js_1_1;
            },
            function (p_service_mock_js_1_1) {
                p_service_mock_js_1 = p_service_mock_js_1_1;
            },
            function (l_service_mock_js_1_1) {
                l_service_mock_js_1 = l_service_mock_js_1_1;
            },
            function (producer_component_js_1_1) {
                producer_component_js_1 = producer_component_js_1_1;
            }],
        execute: function() {
            axiom1 = { axiom: [2, 4],
                g_rule: '+',
                p_rule: .5,
                genotype: 6 }, axiom2 = { axiom: [3, 5],
                g_rule: '*',
                p_rule: 2.0,
                genotype: 15 }, genotype1 = { axiom: [2, 4],
                g_rule: '+',
                p_rule: .5,
                genotype: 6,
                phenotype: 3 }, genotype2 = { axiom: [3, 5],
                g_rule: '*',
                p_rule: 2.0,
                genotype: 15,
                phenotype: 30 }, expect_genotype1 = 6, expect_phenotype1 = 3, expect_genotype2 = 15, expect_phenotype2 = 30, producer = new producer_component_js_1.Producer(mf_config_mock_js_1.CONFIG, g_service_mock_js_1.G, p_service_mock_js_1.P, l_service_mock_js_1.L);
        }
    }
});
