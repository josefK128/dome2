export var Model2 = { scene:'scene2',
                      actors: {
                        metaforms:[
                          {    // root node
                            id:'mf0',
                            form:{type:'cylinder'},
                            transform:{},
                            children:[{
                                id:'mf00',
                                form:{type:'torus'},
                                transform:{},
                                children:[{   
                                    id:'mf000',
                                    form:{type:'cylinder'},
                                    transform:{},
                                    children:[]
                                  },//mf000
                                  {   
                                    id:'mf001',
                                    form:{type:'torus'},
                                    transform:{},
                                    children:[{
                                        id:'mf0010',
                                        form:{type:'torus'},
                                        transform:{},
                                        children:[]
                                      }//mf0010
                                    ]
                                  }//mf001
                                ]
                              }//mf00
                            ]
                          },//mf0
                          {    // root node
                            id:'mf1',
                            form:{type:'torus'},
                            transform:{},
                            children:[]
                          }//mf1
                        ]//metaforms
                      }//actors
                    };//Model2

