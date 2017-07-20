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
      del = require('del');

const options = {
  src: "src",
  dist: "dist"
}

//gulp scripts--> concatenate, minify into dist/scripts/all.min.js + source maps

//gulp styles--> compile, concatenate, minify into dist/styles/all.min.css + source maps

//gulp images--> optimize the size --> dist/content

//gulp clean--> delete all of the files and folders in the dist folder

//gulp build--> run the clean, scripts, styles, and images tasks

//gulp--> run the build task and serve my project using a local web server

gulp.task("concatScripts", () => {
  return gulp.src([
        'src/js/circle/jquery.js',
        'src/js/circle/autogrow.js',
        'src/js/circle.js'
        ])
      .pipe(maps.init())
      .pipe(concat('global.js'))
      .pipe(maps.write('./'))
      .pipe(gulp.dest(options.src + '/js'))
});

gulp.task("scripts", ["concatScripts"], function() {
  gulp.src(options.src + "/js/global.js")
    .pipe(uglify())
    .pipe(iff('global.js', rename('all.min.js')))
    .pipe(gulp.dest(options.src + '/js'))
    .pipe(gulp.dest(options.dist + '/scripts'))
});

//Compiling sass, making sass maps
gulp.task("styles", () => {
  gulp.src(options.src + "/sass/global.scss")
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('./'))
      .pipe(iff('*.css', csso()))
      .pipe(iff('global.css', rename('all.min.css')))
      .pipe(gulp.dest(options.src + '/css'))
      .pipe(gulp.dest(options.dist + '/styles'))
});
