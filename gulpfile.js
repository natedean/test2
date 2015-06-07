var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var del = require('del');
var run = require('gulp-run');

var paths = {
  scripts: ['source/js/**/*.js', '!source/js/vendor/**/*.js'],
  sharedScripts: ['node_modules/jquery/dist/jquery.min.js',
                  'node_modules/bootstrap/dist/js/bootstrap.min.js',
                  'node_modules/underscore/underscore-min.js',
                  'source/js/vendor/fastclick.js'],
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

gulp.task('concatSharedScripts', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.sharedScripts)
    .pipe(uglify())
    .pipe(concat('sharedScripts.min.js'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('concatMainFile', function(){
  return gulp.src('source/js/scripts.js')
    .pipe(uglify())
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest('public/js'))
});


// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch('./index.html', ['copyDevPage']);
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
});

gulp.task('test', function(){
  run('node sayHi.js').exec();
  run('node sayHi.js').exec();
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'scripts', 'copyDevPage', 'test']);