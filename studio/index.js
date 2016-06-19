// * index.js 
// * minimal Express Socket.io websocket server 
// * run basic receiving server:
// ```$ node index```
// * run basic receiving server and a trivial broadcast simulation:
// ```$ node index b``` <br>
// index cmdline arg can be any char or string
// * Express http server uses default port 8080
// * Socket.io websocket channels use default port 8081
// * present channels are [1] a bi-directional 'actions' channel 
//   and [2] an in-only 'log' channel
// * NOTE: @TODO - create a full node-webkit performance studio 
//   server implementation 


// Setup basic express server
var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var router = express.Router();


// Routing - serve static files from port 8080
app.use(express.static(path.join(__dirname, 'public_html')));

app.listen(8080);
console.log("Express serving static files on localhost:8080/public_html");



// socket.io websocket channels on port 8081<br>
var io = require('socket.io')(server),
    port = process.env.PORT || 8081,
    today = (new Date().toJSON()).replace(/T.*/, ''),
    p = function(){
      return (new Date().toJSON()).replace(/^.*T/, '').replace(/Z/,
      '').replace(/\..+$/, '').replace(/:/g,'-');
    },
    t = function(){
      return (new Date().toJSON()).replace(/^.*T/, '').replace(/Z/, '');
    },
    now,
    index = 0,
    argv = process.argv;



// write GMT-today directory (if needed)
try {
  fs.mkdirSync('./logs/' + today);
} catch(e) {
  if ( e.code != 'EEXIST' ) throw e;
}


// make connection - handle channel events<br>
// create timestamp-named actions-file and log-file per client
io.on('connection', function (socket) {
  var q,    
      now = p(), 
      logfile = './logs/' + today + '/' + now + '.log',
      actionsfile = './logs/' + today + '/' + now + '.actions',
      logfile0 = './logs/' + today + '/' + now + '.log0',
      actionsfile0 = './logs/' + today + '/' + now + '.actions0';

  console.log("\nclient makes connection index = " + index++);

  // diagnostics
  console.log("logfile = " + logfile);
  console.log("actionsfile = " + actionsfile);
  console.log("logfile0 = " + logfile0);          // no timestamp
  console.log("actionsfile0 = " + actionsfile0); // no timestamp
  console.log("today = " + today);
  console.log("p() = " + p());
  console.log("t() = " + t());
  argv.forEach(function(a, i){
    console.log("argv[" + i + "] = " + argv[i]);
  });

  // if third argument is given broadcast a trivial simulation of a studio action stream performance (out) 
  // * NOTE: mockserver-service.js broadcasts a much richer simulation
  if(argv[2]){
    console.log("server: start score");
    setInterval(function(){
      console.log("server sending action = {t:'camera2d', f:'zoomflyTo', a: {s:2.0, d:5}}");
      socket.emit("actions", {t:'camera2d', f:'zoomflyTo', a: {s:2.0, d:5}});
      setTimeout(function(){
        console.log("server sending action = {t:'camera2d', f:'zoomflyTo', a: {s:0.5, d:5}}");
        socket.emit("actions", {t:'camera2d', f:'zoomflyTo', a: {s:0.5, d:5}});
      }, 10000);
    }, 20000);
  }else{
    console.log("server: not sending score actions");
  }

  // handler to record actions (in)
  socket.on("actions", function(action){
    fs.appendFile(actionsfile0, JSON.stringify(action) + ",\n", function(err) {
      if(err) {
        return console.log(err);
      }
    });
    fs.appendFile(actionsfile, "[" + t() + "] " + JSON.stringify(action) + ",\n", function(err) {
      if(err) {
        return console.log(err);
      }
      console.log("appended action to csv actionsfile = " + actionsfile);
      if(action.t){
        console.log("t: " + action.t);
      }else{
        console.log("id: " + action.id);
      }
      console.log("f: " + action.f);
      for(q in action.a){
        console.log("a: a[" + q + "] = " + action.a[q]);
      }
    }); 
  });

  // handler to log diagnostics and errors (in)
  socket.on("log", function(o){
    fs.appendFile(logfile0, JSON.stringify(o) + ",\n", function(err) {
      if(err) {
        return console.log(err);
      }
    });
    fs.appendFile(logfile, "[" + t() + "] " + JSON.stringify(o) + ",\n", function(err) {
      if(err) {
        return console.log(err);
      }
      console.log("appended msg to csv logfile = " + logfile);
    }); 
  });

});


// start listening for client connection requests
io.listen(port);
console.log("Socket.io channels Server listening at port %d", port);
console.log("sio-server opens publishing channel 'actions'");
console.log("sio-server opens subscribing channels 'actions', 'log'");

