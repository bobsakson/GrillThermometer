var gulp = require('gulp');
var exec = require('child_process').exec;

gulp.task('default', function() {
  exec('node index.js');
});