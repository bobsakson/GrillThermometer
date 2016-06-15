var express = require('express');
var app = express();

var indexRoutes = require('./routes/index.js')
app.use('/', indexRoutes);

app.set('views', './web/views')
app.set('view engine', 'pug');

app.listen(3000, function () {
  console.log('App running on port 3000.');
});