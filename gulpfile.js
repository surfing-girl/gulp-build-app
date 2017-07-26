'use strict';

const gulp = require('gulp'),
      concat = require('gulp-concat'),
      sass = require('gulp-sass'),
      uglify = require('gulp-uglify'),
      rename = require('gulp-rename'),
      maps = require('gulp-sourcemaps'),
      useref = require('gulp-useref'),
      iff = require('gulp-if'),
      csso = require('gulp-csso'),
      del = require('del'),
      imagemin = require('gulp-imagemin'),
      webserver = require('gulp-webserver');

const options = {
  src: "src",
  dist: "dist"
}

//Concatenating scripts and making sorce map
gulp.task('concatScripts', () => {
  return gulp.src([
        options.src + '/js/circle/jquery.js',
        options.src + '/js/circle/autogrow.js',
        options.src + '/js/circle.js'
        ])
      .pipe(maps.init())
      .pipe(concat('global.js'))
      .pipe(maps.write('./'))
      .pipe(gulp.dest(options.src + '/js'))
      .pipe(gulp.dest(options.dist + '/scripts'))
});

//Minifying scripts
gulp.task('scripts', ["concatScripts"], function() {
  return gulp.src(options.src + "/js/global.js")
    .pipe(uglify())
    .pipe(iff('global.js', rename('all.min.js')))
    .pipe(gulp.dest(options.src + '/js'))
    .pipe(gulp.dest(options.dist + '/scripts'))
});

//Compiling sass, making sass maps
gulp.task('styles', () => {
  return gulp.src(options.src + "/sass/global.scss")
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('./'))
      .pipe(iff('*.css', csso()))
      .pipe(iff('global.css', rename('all.min.css')))
      .pipe(gulp.dest(options.src + '/css'))
      .pipe(gulp.dest(options.dist + '/styles'))
});

//Optimize the size of images
gulp.task('images', () => {
  return gulp.src(options.src + "/images/*.+(png|jpg|gif)")
      .pipe(imagemin())
      .pipe(gulp.dest(options.dist + "/content"));
});

gulp.task('watchFiles', function() {
  gulp.watch(options.src + '/sass/**/*.scss', ['styles']);
})

//serve my project using a local web server
gulp.task('webserver', function() {
  return gulp.src( './dist' )
    .pipe(webserver({
      host:             'localhost',
      port:             '3000',
      livereload:       true,
      directoryListing: false
    }));
});

//Delete all of the files and folders in the dist folder
gulp.task('clean', () => {
  return del([options.dist , '/styles/*.css*', '/scripts/*.js*', 'content/**']);
});

//Run the clean, scripts, styles, and images tasks
gulp.task('build', ["clean", "scripts", "styles", "images"], () => {
  return gulp.src([options.src + "/icons/**", options.src + "/*.html"], { base: options.src})
             .pipe(gulp.dest(options.dist));
});

gulp.task('serve', ['watchFiles']);

gulp.task('default', ["webserver", "clean", "serve"], () => {
  return gulp.start('build');
});
