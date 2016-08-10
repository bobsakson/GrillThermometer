var express = require('express');
var router = express.Router();
var dnode = require('dnode');

router.get('/', function(req, res) {
  res.render('index', { isProbeRunning: false });
});

router.get('/start', function(req, res) {
  var client = dnode({    
      poll : function (cb) {
          console.log('Poll');
          cb();
      }
  });

  client.connect(6060, function (remote, conn) {    
      remote.startProbe(function (curTemp) {
          console.log('Current Temperature', curTemp);
      });
  });

  res.render('index', { isProbeRunning: true });
});

router.get('/stop', function(req, res) {
  var client = dnode({    
      stopPoll : function (cb) {
          console.log('StopPoll');
          cb();
      }
  });

  client.connect(6060, function (remote, conn) {    
      remote.stopProbe(function () {
          console.log('Probe stopped');
      });
  });

  res.render('index', { isProbeRunning: false });
});

module.exports = router;