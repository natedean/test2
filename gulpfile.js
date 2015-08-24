var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var shell = require('gulp-shell');
var browserSync = require('browser-sync').create();

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch('./lib/sass/*.scss', ['sass']);
  gulp.watch(["./*.html","./dist/styles/index.css","./lib/**/**/*.js"]).on('change', browserSync.reload);
});

gulp.task('sass', function () {
  gulp.src('./lib/sass/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist/styles'));
});

gulp.task('dev-server', shell.task([
  'nvm use 0.12.7',
  'nodemon --harmony app.js'
]));

gulp.task('default', ['serve']);
