
const gulp = require('gulp');
const sass = require('gulp-sass');

function style() {
  return gulp.src('source/sass/style.scss')
  .pipe(sass())
  .pipe(gulp.dest('source/css'));
}

function watch() {
  gulp.watch('./source/sass/**/*.scss', style);
}

gulp.task('style', style);
gulp.task('watch', watch);

