export var Model2 = {
                      scene:'scene2',
                      visible:{csphere:'on', key:'on', fill:'on', back:'on'},
                      actors: {
                        metaforms:[
                          {    // root node
                            id:'tree0',
                            form:{type:'cylinder'},
                            transform:{},
                            children:[{
                                id:'tree00',
                                form:{type:'torus'},
                                transform:{},
                                children:[]
                              }
                            ]
                          },
                          {    // root node
                            id:'tree1',
                            form:{type:'torus'},
                            transform:{},
                            children:[]
                          }
                        ]
                      }//actors
                    };//Model2

