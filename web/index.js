var express = require('express');
var path = require('path');
var app = express();
var server = require("http").Server(app);
var io = require("socket.io").listen(server);
var dnode = require('dnode');

var socketIO = function (req, res, next) {
  req.io = io;
  next();
};
app.use(socketIO);



var indexRoutes = require('./routes/index.js')
app.use('/', indexRoutes);

app.use('/client', express.static(path.resolve(__dirname, 'client')))
app.use('/node_modules', express.static(path.resolve(__dirname, 'node_modules')))

app.set('views', './web/views')
app.set('view engine', 'pug');

io.on("connection", function(socket){
    socket.on('startPollingProbe', function(msg){
        var client = dnode({    
          poll : function (cb) {
                  console.log('Poll');
                  cb();
              }
          });

          client.connect(6060, function (remote, conn) {    
              remote.startProbe(function (curTemp) {
                  //console.log('Current Temperature', curTemp);
                  io.emit('temperatureReading');
              });
          });
    });
});

app.listen(3000, function () {
  console.log('App running on port 3000.');
});