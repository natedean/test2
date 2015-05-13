var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var del = require('del');

var paths = {
  scripts: ['source/js/**/*.js', '!source/js/vendor/**/*.js'],
  images: 'client/img/**/*'
};

var currDevPage = 'test';

 //Not all tasks need to use streams
 //A gulpfile is just another node program and you can use all packages available on npm
gulp.task('cleanDevPage', function(cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`
  del(['cloud/views/' + currDevPage + '.ejs'], cb);
});

gulp.task('copyDevPage', ['cleanDevPage'], function(){
  return gulp.src('./index.html')
    .pipe(rename(currDevPage + '.ejs'))
    .pipe(gulp.dest('cloud/views/'));
});

gulp.task('scripts', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/js'));
});

// Copy all static images
gulp.task('images', ['clean'], function() {
  return gulp.src(paths.images)
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('build/img'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch('./index.html', ['copyDevPage']);
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'scripts', 'copyDevPage']);