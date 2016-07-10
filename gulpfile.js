// gulpfile.js - automated tasks - default ('gulp') is ts->js compile
// run: $>gulp <taskname>
//
// * NOTE: There is no explicit task 'task-list'. 
//         However 'gulp task-list' will produce a complete list 
//         of tasks and dependencies to stdout
//         pipe to 'gulpfile.tasks' for exp:
//         $ gulp task-list >gulpfile.tasks

// dependencies
var gulp = require('gulp');
var tslint = require("gulp-tslint");
var typescript = require('gulp-typescript');
var tsconfig = require('./tsconfig.json');
var docco = require('gulp-docco');
var del = require('del');
var exec = require('child_process').exec;
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var annotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
require('gulp-task-list')(gulp);





// directory/file glob-patterns
// app - includes spec.ts unit-test files
var tsFiles = [
  './app/modules-ts/*.ts', 
  './app/modules-ts/**/*.ts'
];

// only for use by gulp docco - see README-docs-ts.md
var tsjsFiles = [
  './app/modules-ts/*.ts.js', 
  './app/modules-ts/**/*.ts.js'
];
var tsjsTestFiles = [
  './test/*.spec.ts.js', 
  './test/**/*.spec.ts.js' 
];
var devFiles = [
  './gulpfile.js', 
];

// defs
var svgDefsFiles = [
  './app/svg/defs/*.svg', 
  './app/svg/defs/**/*.svg' 
];
var webglDefsFiles = [
  './app/webgl/*.ts', 
  './app/webgl/**/*.ts' 
];

// styles
var styleFiles = [
  './app/styles/scss/*.scss'
];


// write destinations
var appDest_es5 = './app/modules_es5/',
    appDest_es6 = './app/modules/',
    unitDest_es5 = './test/modules_es5/',
    unitDest_es6 = './test/modules/',
    e2eDest_es5 = './e2e/modules_es5/',
    e2eDest_es6 = './e2e/modules/',
    mockDest_es5 = './test/modules_es5/mocks',
    mockDest_es6 = './test/modules/mocks',
    docDest = './docs/app',
    docTestDest = './docs/test',
    docDevDest = './docs/dev';
    defsDest = './app/modules-ts/views';



// tasks
// task - ts2js: modules_ts/x.ts -> modules/x.js
// NOTE: includes spec.ts unit-test files
// NOTE: default task!
gulp.task('default', ['ts2js']);
gulp.task('ts2js', () => {
    var tsResult = gulp
        .src(tsFiles)
        .pipe(tslint())
        .pipe(tslint.report("verbose"))
        .pipe(typescript(tsconfig.compilerOptions));

    if(tsconfig.compilerOptions.target === 'es5'){
        return tsResult.js.pipe(gulp.dest(appDest_es5));
    }
    return tsResult.js.pipe(gulp.dest(appDest_es6));
});



// test - unit and e2e - starts server for e2e 
gulp.task('test', () => {
  exec('bash test-unit.sh');
  exec('bash test.sh');
});

// test - unit tests only - no server start 
gulp.task('test-unit', () => {
  exec('bash test-unit.sh');
});



// task - defs for webgl-textures and svg defs-files
// concatenates individual i3d/svg defs into app/views/
gulp.task('defs', ['svg-defs', 'webgl-defs']);

// task - svg-defs:<br>
// concatenates individual symbols, groups etc. into views/svg-defs.svg
gulp.task('svg-defs', () => {
  gulp.src(svgDefsFiles)
    .pipe(concat('svg-defs.svg'))
    .pipe(gulp.dest(defsDest));
});

// task - webgl-defs:<br>
// concatenates individual shaders, etc. into views/webgl-defs.js
gulp.task('webgl-defs', () => {
  gulp.src(webglDefsFiles)
    .pipe(concat('webgl-defs.ts'))
    .pipe(gulp.dest(defsDest));
});



// task - sass:<br>
// translates .scss-files to .css-files
gulp.task('sass', () => {
  gulp.src(styleFiles)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./app/styles/css'));
});



// task - docco:<br>
// generate side-by-side: L comments with R source (configurable)
// NOTE: docco does not process ts-files, so a temporary
// ts.js-file is provided for docco-only processing usage
// These files are in 'tsjsFiles' and 'tsjsTestFiles'
gulp.task('docco', () =>{
  gulp.src(tsFiles)
    .pipe(docco())
    .pipe(gulp.dest(docDest));
  gulp.src(tsjsFiles)
    .pipe(docco())
    .pipe(gulp.dest(docDest));
  gulp.src(devFiles)
    .pipe(docco())
    .pipe(gulp.dest(docDevDest));
});


// npm convenience tasks
// task - npm-install
// install all the packages listed in package.json
gulp.task('npm-install', () =>{
  exec('npm install', (err, stdout, stderr) => {
    if(err){console.log(err);}
  });
});

// task - npm-update:<br>
// check for more recent versions for node_modules.
// update all the packages listed to the latest version 
// specified by the tag config, and respecting semver.
gulp.task('npm-update', () =>{
  exec('npm update', (err, stdout, stderr) => {
    if(err){console.log(err);}
  });
});


// task - build:<br>
// archive of previous automated build
gulp.task('build', () => {
   return gulp.src(appFiles)
      .pipe(annotate())
      .pipe(concat('app.js'))
      .pipe(gulp.dest(buildDest));
});

// task - build-min:<br>
// automated build and minification (uglify)
gulp.task('build-min', () => {
   return gulp.src(appFiles)
      .pipe(annotate())
      .pipe(uglify())
      .pipe(concat('app.min.js'))
      .pipe(gulp.dest(buildDest));
});


// task - generate:<br>
// update versions, automated build, build-min, and document
gulp.task('generate', ['sass', 'templates', 'ts2js', 'build', 'build-min', 'docco']);


// clean
gulp.task('clean', (done) => {
    del(['./app/modules/*.js'], done);
    del(['./app/modules/**/*.js'], done);
    del(['./app/build/*.js'], done);
});


