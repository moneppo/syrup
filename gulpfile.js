var gulp = require('gulp');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cached');
var bower = require('gulp-bower-files');
var rimraf = require('rimraf');
var acmg = require('./manifest-generator');

var paths = {
  scripts: 'app/js/**/*.js',
  images: 'app/img/**/*',
  partials: 'app/partials/**/*',
  css: 'app/css/**/*.css'
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use all packages available on npm
gulp.task('clean', function(cb){
  rimraf('build/', cb);
});

gulp.task('bower', function() {
  return bower({bowerJson: 'bower.json'})
    .pipe(cache('bowering'))
    .pipe(gulp.dest('build/js/lib/'))
});

gulp.task('cleanmanifest', function(cb) {
  rimraf('build/app.manifest', cb);
});

gulp.task('scripts', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  return gulp.src(paths.scripts)
    .pipe(cache('scripting'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

gulp.task('css', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  return gulp.src(paths.scripts)
    .pipe(cache('cssing'))
    .pipe(gulp.dest('build/css'));
});

// Copy all static images
gulp.task('images', function() {
 return gulp.src(paths.images)
    .pipe(cache('imaging'))
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('build/img'));
});

gulp.task('partials',  function() {
  return gulp.src(paths.partials)
    .pipe(cache('partialing'))
    .pipe(gulp.dest('build/partials'));
})

gulp.task('index', function() {
  return gulp.src('app/index.html')
    .pipe(gulp.dest('build/'));
})


gulp.task('manifest', ['cleanmanifest', 'index', 'scripts', 'images', 'partials', 'bower'], 
  function(cb) {
    var gen = acmg('build', 'build/app.manifest');
    var err = function (){}
    gen.generate(err, cb);
})

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch('app', ['manifest']);
  gulp.watch('bower_components', ['manifest']);
});

gulp.task('default', ['manifest']);

