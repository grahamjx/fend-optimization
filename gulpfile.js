var gulp = require('gulp'),
    ngrok = require('ngrok'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    csso = require('gulp-csso'),
    htmlmin = require('gulp-htmlmin')
    replace = require('gulp-html-replace')
    rename = require('gulp-rename');
    site = '';

gulp.task('build', ['images','scripts', 'styles','html']);
gulp.task('serve',['build','connect','ngrok-url']);

gulp.task('images',function(){
  gulp.src('src/img/*')
    .pipe(gulp.dest('./dist/img'));

  gulp.src('src/views/images/*')
    .pipe(gulp.dest('./dist/views/images'));
});

gulp.task('scripts', function(){
  gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(rename(function(path) {
      path.dirname += "/js";
      path.basename += ".min";
      path.extname = ".js"
    }))
    .pipe(gulp.dest('./dist'));

  gulp.src('src/views/js/*.js')
    .pipe(uglify())
    .pipe(rename(function(path) {
      path.dirname += "/views/js";
      path.basename += ".min";
      path.extname = ".js"
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('styles', function(){
  gulp.src('src/css/*.css')
    .pipe(csso())
    .pipe(rename(function(path) {
      path.dirname += "/css";
      path.basename += ".min";
      path.extname = ".css";
    }))
    .pipe(gulp.dest('./dist'));

  gulp.src('src/views/css/*.css')
    .pipe(csso())
    .pipe(rename(function(path) {
      path.dirname += "/views/css";
      path.basename += ".min";
      path.extname = ".css"
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('html', function(){
  gulp.src('src/*.html')
    .pipe(replace({
      'css': '<link rel="stylesheet" href="css/print.min.css"media="print">',
      'js': {
        src: 'js/perfmatters.min.js',
        tpl: '<script async src="%s"></script>'
      }
    }))
    .pipe(htmlmin())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'));

  gulp.src('src/views/*.html')
    .pipe(replace({
      'css': ['css/style.min.css', 'css/bootstrap-grid.min.css'],
      'js': 'js/main.min.js'
    }))
    .pipe(htmlmin())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist/views/'));
});

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    port: 8000,
  });
});

gulp.task('ngrok-url', function() {
  return ngrok.connect(8000, function (err, url) {
    site = url;
    console.log('serving your tunnel from: ' + site);
  });
});
