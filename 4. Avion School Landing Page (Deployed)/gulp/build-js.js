const gulp = require('gulp');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const terser = require('gulp-terser');
const del = require('del');
const { dest } = require('gulp');

// instantiate an object of variables
const paths = {
    js: {
        src: '../assets/js/*.js',
        dest: '../assets/js',
        output: 'main.js'
    }
};



/**
 * GULP TASK: clean
 * FUNCTION: delete the old file before creating a new one or running the 
 * other gulp tasks
 */
const clean = () => del(
    [`${paths.js.dest}/${paths.js.output}`],
    { force: true } // to delete outside the cwd
);



/**
 * GULP TASK: js
 * FUNCTION: Minify all javascript files and concat them into a single main.js
 */
const js = () =>
    gulp
        .src(paths.js.src)
        .pipe(plumber())
        .pipe(terser())
        .pipe(concat(paths.js.output))
        .pipe(gulp.dest(paths.js.dest));



/**
 * instantiate a series of tasks needed to accomplished by gulp
 */
const build = gulp.series(
    clean,
    gulp.parallel(js)
);


exports.build = build;
exports.default = build;