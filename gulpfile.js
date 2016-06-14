var gulp = require('gulp');
var exec = require('child_process').exec;
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('scripts', function() {
    return gulp.src('./*.js', './routes/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('public'));
});

gulp.task('scripts-watch', ['scripts'], reload);

gulp.task('nodemon', function (cb) {
    var called = false;

    return nodemon({
            script: 'index.js',
            ext: 'js',
            ignore: ['public/*', 'views/*']
    })
        .on('start', function () {
            if (!called) {
                called = true;
                cb();
        }
    });
});

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        browser: ['google chrome'],
        port: 4000
    });
});

gulp.task('default', ['browser-sync'], function() {
  //exec('node index.js');
  gulp.watch(['./*.js', './routes/*.js'], ['scripts-watch']);
});