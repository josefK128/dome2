System.register(['@angular/core', '../configs/@config', 'socket.io-client', './queue'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, _config_1, io, queue_1;
    var Mediator;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_config_1_1) {
                _config_1 = _config_1_1;
            },
            function (io_1) {
                io = io_1;
            },
            function (queue_1_1) {
                queue_1 = queue_1_1;
            }],
        execute: function() {
            Mediator = (function () {
                function Mediator(cfg, iqueue) {
                    var _this = this;
                    this.config = cfg;
                    this.iqueue = iqueue;
                    // connect to server
                    if (this.config.server_connect) {
                        this.connect();
                    }
                    // dummy load
                    this.iqueue.push({ t: 'camera3d', f: 'reportActors', a: 'not-needed' });
                    // start queue checks - LATER - much smaller interval or use Clock
                    setInterval(function () {
                        if (_this.iqueue.ready) {
                            _this.next();
                        }
                    }, 5000);
                }
                Mediator.prototype.set_narrative = function (n) {
                    this.narrative = n;
                    console.log("Mediator.set_narrative: this.narrtive = " + this.narrative);
                };
                // connect to index.js server = config.server_host 
                // on port config.channels_port (default is 8081)
                // set up channels with names specified in config.channels
                Mediator.prototype.connect = function () {
                    var _this = this;
                    var s_h = this.config.server_host, c_p = this.config.server_port;
                    this.socket = io.connect("http://" + s_h + ":" + c_p);
                    for (var _i = 0, _a = this.config.channels; _i < _a.length; _i++) {
                        var channel = _a[_i];
                        console.log("Mediator created channel with name = " + channel);
                        this.socket.on(channel, function (o) {
                            _this.iqueue.push(o);
                        });
                    }
                };
                // broadcast usable by external services
                Mediator.prototype.emit = function (channel, msg) {
                    // guard
                    if (this.config.channels.indexOf(channel) !== -1) {
                        this.socket.emit(channel, msg);
                    }
                    else {
                        return false;
                    }
                };
                // quick method for emit('actions', action)
                // record to server - used to record interactive camera shots to stream
                Mediator.prototype.record = function (action) {
                    this.socket.emit('actions', action);
                };
                // set queue.ready = true, and check queue for action
                Mediator.prototype.iqueue_ready_next = function () {
                    this.iqueue.ready = true;
                    this.next();
                };
                // fetch next action from iqueue - removes action from queue
                // if queue is empty returns undefined
                Mediator.prototype.next = function () {
                    if (this.iqueue.peek()) {
                        this.narrative.exec(this.iqueue.pop()); // final version
                    }
                };
                // queue score actions and start Clock to time sends to narrative.exec
                Mediator.prototype.perform = function (score) {
                    console.log("mediator.perform: score = " + score);
                };
                Mediator = __decorate([
                    core_1.Injectable(),
                    __param(0, core_1.Inject(_config_1.CONFIG)), 
                    __metadata('design:paramtypes', [Object, queue_1.Queue])
                ], Mediator);
                return Mediator;
            }());
            exports_1("Mediator", Mediator); //class Mediator
        }
    }
});
