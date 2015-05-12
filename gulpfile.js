var gulp = require('gulp'),
  gutil = require('gulp-util'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  jshint = require('gulp-jshint');


gulp.task('default', ['watch']);

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src(['source/js/**/*.js','!source/js/vendor/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// uglify task
gulp.task('js', function() {
  // main app js file
  gulp.src(['source/js/**/*.js','!source/js/vendor/**/*.js'])
    .pipe(uglify())
    .pipe(concat("app.min.js"))
    .pipe(gulp.dest('./public/js/'));

  // create 1 vendor.js file from all vendor plugin code
  gulp.src('./source/js/vendor/**/*.js')
    .pipe(uglify())
    .pipe(concat("vendor.min.js"))
    .pipe(gulp.dest('./public/js'))
    .pipe( notify({ message: "Javascript is now ugly!"}) );
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch('source/js/**/*.js', ['jshint','js']);
});