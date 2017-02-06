'use strict';

var gulp = require('gulp'),
  path = require('path'),
  util = require('gulp-util');

// Watch for changes.
gulp.task('watch', ['lintjs', 'js', 'lintsass', 'sass', 'html'], function () {
  gulp.watch([global.paths.js], {cwd: './'}, ['lintjs', 'js']).on('change', logChanges);
  gulp.watch([global.paths.sass], {cwd: './'}, ['lintsass', 'sass']).on('change', logChanges);
  gulp.watch([global.paths.html], {cwd: './'}, ['html']).on('change', logChanges);
});

function logChanges(event) {
  util.log(
    util.colors.green('File ' + event.type + ': ') +
    util.colors.magenta(path.basename(event.path))
  );
}
