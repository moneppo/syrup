var gulp = require('gulp');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cached');
var rimraf = require('rimraf');
var acmg = require('./manifest-generator');

var paths = {
  scripts: 'js/**/*.js',
  images: 'img/**/*',
  templates: 'templates/**/*'
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use all packages available on npm
gulp.task('clean', function(cb){
  rimraf('build/', cb);
});

gulp.task('scripts', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  return gulp.src(paths.scripts)
    .pipe(cache('scripting'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

// Copy all static images
gulp.task('images', function() {
 return gulp.src(paths.images)
    .pipe(cache('imaging'))
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('build/img'));
});

gulp.task('templates',  function() {
  return gulp.src(paths.templates)
    .pipe(cache('templating'))
    .pipe(gulp.dest('build/templates'));
})

gulp.task('cleanmanifest', function(cb) {
  rimraf('build/app.manifest', cb);
});

gulp.task('manifest', ['cleanmanifest', 'scripts', 'images', 'templates'], function(cb) {
  var gen = acmg('build', 'build/app.manifest');
  var err = function (){}
  gen.generate(err, cb);
})

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['manifest', 'scripts']);
  gulp.watch(paths.images, ['manifest', 'images']);
  gulp.watch(paths.templates, ['manifest', 'templates']);
});

gulp.task('default', ['manifest', 'scripts', 'images', 'templates']);
