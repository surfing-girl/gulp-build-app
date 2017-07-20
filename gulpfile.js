'use strict';

const gulp = require('gulp'),
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
