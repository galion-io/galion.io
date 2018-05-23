'use strict';
var exec = require('child_process').exec;
var gulp = require('gulp');
var merge = require('merge-stream');
var minify = require('gulp-minify');
var htmlmin = require('gulp-htmlmin');
var minifyCSS = require('gulp-minify-css');
var flatten = require('gulp-flatten');
var plugins = require('gulp-load-plugins')({
  lazy: false
});
var connect = require('gulp-connect');
var replace = require('gulp-replace');
var version = require('./package.json').version;

// Remove files and folders
gulp.task('clean', function() {
  return gulp.src([
    './dist'
  ], {
    read: false
  })
    .pipe(plugins.rimraf());
});

// Copy the static files
gulp.task('copy', function() {
  var images = gulp.src([
    './src/**/*.{svg,png,jpg,gif}'
  ])
    .pipe(flatten())
    .pipe(gulp.dest('./dist/img'));

  var fonts = gulp.src([
    './src/font/*'
  ])
    .pipe(gulp.dest('./dist/font'));

  var favicon = gulp.src('./src/favicon.ico')
    .pipe(gulp.dest('./dist'));

  return merge(images, fonts, favicon);
});

// Replaces the usemin blocks by concatenation files
gulp.task('usemin', function() {
  return gulp.src('./src/index.html')
    .pipe(plugins.usemin())
    .pipe(gulp.dest('./dist'));
});

// minify/uglify js, html and css files
gulp.task('uglify', ['usemin'], function() {
  var js = gulp.src('./dist/script.js')
    .pipe(minify({
      ext: {
        src: '-debug.js',
        min: '.js'
      },
      ignoreFiles: ['.min.js']
    }))
    .pipe(gulp.dest('./dist'));

  var html = gulp.src('./dist/index.html')
    .pipe(htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    }))
    .pipe(gulp.dest('./dist'));

  var css = gulp.src('./dist/app.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist'));

  return merge(js, html, css);
});

// Get a clean dist folder
gulp.task('build', ['uglify', 'copy'], function() {
  return gulp.src([
    './dist/app-debug.js'
  ], {
    read: false
  })
    .pipe(plugins.rimraf());
});

// Watch for changes in order to re-run the build
gulp.task('watch', function() {
  gulp.watch(['./src/**/*'], ['build']);
});

// Serve the built project in a web server
gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    port: 14613,
    livereload: false
  });
});

gulp.task('serve', [
  'build',
  'connect',
  'watch'
]);

gulp.task('default', ['serve'], function() {
  console.log('Go to http://localhost:14613 to view your app !');
});

gulp.task('deploy', ['build'], function(cb) {
  var cmd = 'scp -r dist/* galionwebsite:/data/www/galion-landing/wip/';
  exec(cmd, function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);

    cb(err);
  });
});
