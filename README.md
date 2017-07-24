## About

Gulp build process for preparing a front end website.
Run the app by typing `npm start` to the console.

## Usage

- `gulp scripts` - concatenates, minifies, and copies all of the project’s JavaScript files into an all.min.js file, copies the all.min.js file into the dist/scripts folder, generates JavaScript source maps
- `gulp styles` - compiles the project’s SCSS files into CSS, and concatenates and minifies into an all.min.css file, copies the all.min.css file into the dist/styles folder, generates CSS source maps
- `gulp images` - copies the optimized images to the dist/content folder.
- `gulp clean` - deletes all of the files and folders in the dist folder.
- `gulp build` - runs the clean, scripts, styles, and images tasks.
- `gulp` - runs the build task as a dependency, serves the project using a local webserver, listens for changes to any .scss file.
