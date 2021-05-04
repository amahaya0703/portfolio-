var autoprefixer = require('gulp-autoprefixer');
var browserSync  = require('browser-sync').create();
var concat       = require('gulp-concat');
var gcmq         = require('gulp-group-css-media-queries');
var gulp         = require('gulp');
var notify       = require('gulp-notify');
var plumber      = require('gulp-plumber');
var rename       = require('gulp-rename');
var sass         = require('gulp-sass');
var sassGlob     = require("gulp-sass-glob");
var sourcemaps   = require('gulp-sourcemaps');
var uglify       = require('gulp-uglify');
var ejs          = require('gulp-ejs');
var fs           = require('fs');
var htmlSrc = './src/ejs/**/*.ejs';
var sassSrc = './src/css/**/*.scss';
// var sassSrc = './src/css/*.scss';
var jsSrc = './src/js/**/*.js';


// ejs template
gulp.task('ejs', function() {
  var json = JSON.parse(fs.readFileSync('src/ejs/meta/meta.json'));
  gulp.src(
     [htmlSrc,'!' + "./src/ejs/**/_*.ejs"]
  )
  .pipe(ejs({json}, {}))
  .pipe(rename({extname: ".html"}))
  .pipe(gulp.dest('./public'))
  .pipe(browserSync.stream());
});

// sass
gulp.task('styles', function() {
  return gulp.src(sassSrc)
    .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
    .pipe(sassGlob())
    // .pipe(sourcemaps.init())
    .pipe(sass({
      Style : 'compressed'
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 version', 'iOS >= 8.0', 'Android >= 5.0'],
      cascade: false
    }))
    .pipe(gcmq())
    // .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  return gulp.src(jsSrc)
    .pipe(concat('script.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify({
      comments: /^!/
    }))
    .pipe(gulp.dest('./public/js'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function() {
  browserSync.init({
    server: "./public",
    open: true
  });

  // gulp.watch("./public/*.html", ['bs-reload']);
  gulp.watch(htmlSrc,['ejs']);
  gulp.watch(sassSrc, ['styles']);
  gulp.watch(jsSrc, ['scripts']);
  gulp.watch("./public/images/**/*.+(jpg|jpeg|png|gif|svg)").on('change', browserSync.reload);
});


gulp.task('default', ['watch']);

gulp.task('build', [ 'styles', 'scripts']);
