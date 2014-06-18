var gulp = require('gulp');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var rimraf = require('rimraf');

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

gulp.task('scripts', ['clean'], function() {
  // Minify and copy all JavaScript (except vendor scripts)
  return gulp.src(paths.scripts)
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

// Copy all static images
gulp.task('images', ['clean'], function() {
 return gulp.src(paths.images)
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('build/img'));
});

gulp.task('templates', ['clean'], function() {
  return gulp.src(paths.templates)
    .pipe(gulp.dest('build/templates'));
})

gulp.task('manifest', ['clean'], function() {
  return 
})

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['manifest', 'scripts']);
  gulp.watch(paths.images, ['manifest', 'images']);
  gulp.watch(paths.templates, ['manifest', 'templates']);
});

gulp.task('default', ['manifest', 'scripts', 'images', 'templates']);
