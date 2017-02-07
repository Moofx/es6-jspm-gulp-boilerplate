'use strict';

var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  connect = require('gulp-connect'),
  sass = require('gulp-sass'),
  gutil = require('gulp-util'),
  notify = require('gulp-notify'),    
  sourcemaps = require('gulp-sourcemaps');

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

// Compile SASS with sourcemaps + livereload.
gulp.task('sass', function () {
  gulp.src(global.paths.sass)
    .pipe(sourcemaps.init())    
    .pipe(sass(sassOptions)
      .on('error', function (err) {
        var lineNumber = (err.line) ? 'Line: ' + err.line + ',' : '';
        var columnNumber = (err.column) ? ' Column: ' + err.column + '   \n' : '';
        var pluginName = (err.plugin) ? err.plugin : '';
        var bugMessage = (err.messageFormatted) ? err.messageFormatted : '';
        var buggedFilePath = (err.relativePath) ? err.relativePath : '';
        var buggedFile = err.file.replace(/^.*[\\\/]/, '');
        var bugLocation = 'in ' + buggedFile + ' on ' +
          lineNumber + columnNumber + 'Location: ' + buggedFilePath + '\t\t';
        notify.onError({
          title: 'ERROR when running ' + '[' + pluginName + ']',
          message: bugLocation,
          sound: 'Beep'
        })(err);
        gutil.log(gutil.colors.bgRed('ERROR: ', bugMessage));
        this.emit('end');
      })
     )
    .pipe(concat('app.css'))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(global.paths.css))
    .pipe(connect.reload());
});
