// mediator.ts - angular rc1.0
import {Injectable, Inject} from '@angular/core';

// application
// configuration
import Config from '../configs/config.interface';
import {CONFIG} from '../configs/@config';

// socket.io-client
import * as io from 'socket.io-client';
//import * as io from '../../../node_modules/socket.io-client/socket.io';

// services
import {Queue} from './queue';



@Injectable()
export class Mediator {
  config:Config;
  iqueue:Queue;
  narrative:any;
  socket:any;


  constructor(@Inject(CONFIG) cfg:Config, iqueue:Queue){
    this.config = cfg;
    this.iqueue = iqueue;


    // connect to server
    if(this.config.server_connect){
      this.connect();
    }

    // dummy load
    this.iqueue.push({t:'camera3d', f:'reportActors', a:'not-needed'});

    // start queue checks - LATER - much smaller interval or use Clock
    setInterval(() => {
      if(this.iqueue.ready){
        this.next();
      }
    }, 5000);
  }



  set_narrative(n:any){
    this.narrative = n;
    console.log(`Mediator.set_narrative: this.narrtive = ${this.narrative}`);
  }


  // connect to index.js server = config.server_host 
  // on port config.channels_port (default is 8081)
  // set up channels with names specified in config.channels
  connect(){
    var s_h = this.config.server_host,
        c_p = this.config.server_port;
    this.socket = io.connect("http://" + s_h + ":" + c_p);
    for(let channel of this.config.channels){
      console.log(`Mediator created channel with name = ${channel}`);
      this.socket.on(channel, (o) => {
        this.iqueue.push(o);
      });
    }
  }

  // broadcast usable by external services
  emit(channel, msg){
    // guard
    if(this.config.channels.indexOf(channel) !== -1){
      this.socket.emit(channel, msg);
    }else{
      return false;
    }
  }

  // quick method for emit('actions', action)
  // record to server - used to record interactive camera shots to stream
  record(action){
    this.socket.emit('actions', action);
  }


  // set queue.ready = true, and check queue for action
  iqueue_ready_next(){
    this.iqueue.ready = true;
    this.next();
  }
    
  // fetch next action from iqueue - removes action from queue
  // if queue is empty returns undefined
  next(){
    if(this.iqueue.peek()){
      this.narrative.exec(this.iqueue.pop()); // final version
    }
  }

}//class Mediator

