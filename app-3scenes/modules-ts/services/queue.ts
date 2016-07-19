// queue.ts - angular rc1.0
import {Injectable, Inject} from '@angular/core';

// configuration
import Config from '../configs/config.interface';
import {CONFIG} from '../configs/@config';



@Injectable()
export class Queue {
  config: any;
  fifo:Object[];
  ready:boolean;

  constructor(@Inject(CONFIG) cfg:Config) {
    this.config = cfg;
    this.fifo = [];  
    this.ready = true;
  }


  push(s){
    this.fifo.push(s);
  }

  pop(){
    return (this.fifo.length > 0 ? this.fifo.shift() : undefined);
  }

  peek(){
    return (this.fifo.length > 0 ? this.fifo[0] : undefined);
  }
}
