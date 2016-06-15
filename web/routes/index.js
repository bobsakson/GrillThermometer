var express = require('express');
var router = express.Router();
var dnode = require('dnode');

router.use(function timeLog(req, res, next) {
  console.log('Index Router: ', Date.now());
  next();
});



router.get('/', function(req, res) {
  var client = dnode({    
      poll : function (cb) {
          console.log('Poll method');
          cb();
      }
  });

  client.connect(6060, function (remote, conn) {    
      remote.startProbe(function (curTemp) {
          console.log('Current ', curTemp);
      });
  });
  
  res.render('index');
});

module.exports = router;