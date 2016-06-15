var express = require('express');
var router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log('Index Router: ', Date.now());
  next();
});

router.get('/', function(req, res) {
  res.render('index');
});

module.exports = router;