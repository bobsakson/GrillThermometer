var express = require('express');
var path = require('path');

var app = express();

var indexRoutes = require('./routes/index.js')
app.use('/', indexRoutes);

app.use('/client', express.static(path.resolve(__dirname, 'client')))
app.use('/node_modules', express.static(path.resolve(__dirname, 'node_modules')))

app.set('views', './web/views')
app.set('view engine', 'pug');

app.listen(3000, function () {
  console.log('App running on port 3000.');
});