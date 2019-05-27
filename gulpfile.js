
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const minifyCSS = require('gulp-csso');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const svgstore = require('gulp-svgstore');
const posthtml = require('gulp-posthtml');
const include = require('posthtml-include');
const uglify = require('gulp-uglify');
const clean = require('gulp-clean');
const server = require('browser-sync').create();

function style() {
  return gulp.src('source/sass/style.scss')
  .pipe(plumber())
  .pipe(sass())
  .pipe(postcss([autoprefixer()]))
  .pipe(gulp.dest('source/css'))
  .pipe(minifyCSS())
  .pipe(rename('style.min.css'))
  .pipe(gulp.dest('source/css'))
  .pipe(server.stream());
}

function minifyNormalize() {
  return gulp.src('source/css/normalize.css')
  .pipe(minifyCSS())
  .pipe(rename('normalize.min.css'))
  .pipe(gulp.dest('build/css'));
}

function images() {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest('build/img'));
}

function makeWebp() {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest('build/img'));
}

function sprite() {
  return gulp.src('source/img/icon-*.svg')
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('build/img'));
}

function html() {
  return gulp.src('source/*.html')
  .pipe(posthtml([
    include()
  ]))
  .pipe(gulp.dest('build'));
}

function minifyJS() {
  return gulp.src('source/js/**/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('build/js'));
}

function serve() {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
}

function watchSass() {
  gulp.watch('./source/sass/**/*.scss', {ignoreInitial: false}, style);
}

function watchHtml() {
  gulp.watch('source/*.html', html);
}

function del() {
  return gulp.src('build')
  .pipe(clean());
}

function copy() {
  return gulp.src([
    'source/fonts/**/*.{woff, woff2}',
    'source/img/**'
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'));
}

exports.style = style;
exports.minifyNormalize = minifyNormalize;
exports.images = images;
exports.webp = makeWebp;
exports.sprite = sprite;
exports.html = html;
exports.minifyJS = minifyJS;
exports.del = del;
exports.serve = gulp.series(style, serve);
exports.watch = watchSass;
exports.watchHtml = watchHtml;

exports.build = gulp.series(del, copy, minifyNormalize, style, images, makeWebp, sprite, html);


