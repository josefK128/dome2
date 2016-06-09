// gulpfile.js - automated tasks
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
var tsFiles = [
  './app/modules-ts/*.ts', 
  './app/modules-ts/**/*.ts'
];
var jsFiles = [
  './app/modules/*.js', 
  './app/modules/**/*.js'
];
var tsTestFiles = [
  './test/modules-ts/*.spec.ts', 
  './test/modules-ts/**/*.spec.ts' 
];
var jsTestFiles = [
  './test/modules/*.js', 
  './test/modules/**/*.js'
];
var tsTestMocks = [
  './test/modules-ts/mocks/*.ts' 
];
// only for use by gulp docco - see README-docs-ts.md
var tsjsFiles = [
  './app/modules-ts/*.ts.js', 
  './app/modules-ts/**/*.ts.js'
];
var tsjsTestFiles = [
  './test/modules-ts/*.spec.ts.js', 
  './test/modules-ts/**/*.spec.ts.js', 
  './test/modules-ts/**/*.ts.js' 
];
var testFiles = [
  './test/modules/*.spec.js', 
  './test/modules/**/*.spec.js' 
];
var devFiles = [
  './gulpfile.js', 
];
var templateFiles = [
  './app/views/templates/*.html', 
  './app/views/templates/**/*.html' 
];
var svgDefsFiles = [
  './app/views/svg/*.svg', 
  './app/views/svg/**/*.svg' 
];
var webglDefsFiles = [
  './app/views/webgl/*.html', 
  './app/views/webgl/**/*.html' 
];
var styleFiles = [
  './app/styles/scss/*.scss'
];


// write destinations
var appDest = './app/modules/',
    appDest_es6 = './app/modules_es6/',
    testDest = './test/modules/',
    testDest_es6 = './test/modules_es6/',
    mockDest = './test/modules/mocks/',
    mockDest_es6 = './test/modules_es6/mocks',
    docDest = './docs/app',
    docTestDest = './docs/test',
    docDevDest = './docs/dev';
    transpiledDest = './docs/transpiled/app';
    transpiledTestDest = './docs/transpiled/test';
    templatesDest = './app/views/';



// tasks

// test - all
gulp.task('test', () => {
  exec('bash test.sh');
});

// test - unit tests only - doesn't require server startup
gulp.task('test-unit', () => {
  exec('bash test-unit.sh');
});



// task - ts2js: modules_ts/x.ts -> modules/x.js
// NOTE: default task!
gulp.task('default', ['ts2js']);
gulp.task('ts2js', () => {
    var tsResult = gulp
        .src(tsFiles)
        .pipe(tslint())
        .pipe(tslint.report("verbose"))
        .pipe(typescript(tsconfig.compilerOptions));

    if(tsconfig.compilerOptions.target === 'es5'){
        return tsResult.js.pipe(gulp.dest(appDest));
    }
    return tsResult.js.pipe(gulp.dest(appDest_es6));
});


// task - ts2js-test: 
gulp.task('ts2js-test', ['ts2js-mock', 'ts2js-spec']);

// task - ts2js-spec: test/modules_ts/x.spec.ts -> 
// test/modules/x.spec.js
gulp.task('ts2js-spec', () => {
    var tsResult = gulp
        .src(tsTestFiles)
        .pipe(tslint())
        .pipe(tslint.report("verbose"))
        .pipe(typescript(tsconfig.compilerOptions));

    if(tsconfig.compilerOptions.target === 'es5'){
        return tsResult.js.pipe(gulp.dest(testDest));
    }
    return tsResult.js.pipe(gulp.dest(testDest_es6));
});
// task - ts2js-spec: test/modules_ts/x.spec.ts -> 
// test/modules/x.spec.js
gulp.task('ts2js-spec-no-tslint', () => {
    var tsResult = gulp
        .src(tsTestFiles)
        .pipe(typescript(tsconfig.compilerOptions));

    if(tsconfig.compilerOptions.target === 'es5'){
        return tsResult.js.pipe(gulp.dest(testDest));
    }
    return tsResult.js.pipe(gulp.dest(testDest_es6));
});

// task - ts2js-mock: test/modules_ts/mocks/x.ts -> 
// test/modules/mocks/x.js
gulp.task('ts2js-mock', () => {
    var tsResult = gulp
        .src(tsTestMocks)
        .pipe(tslint())
        .pipe(tslint.report("verbose"))
        .pipe(typescript(tsconfig.compilerOptions));

    if(tsconfig.compilerOptions.target === 'es5'){
        return tsResult.js.pipe(gulp.dest(mockDest));
    }
    return tsResult.js.pipe(gulp.dest(mockDest_es6));
});


// task - template-cache:<br>
// concatenates individual html/svg/i3d templates into views/templates.html
gulp.task('templates', ['svg-defs', 'webgl-defs'], () => {
  gulp.src(templateFiles)
    .pipe(concat('templates.html'))
    .pipe(gulp.dest(templatesDest));
});

// task - svg-defs:<br>
// concatenates individual symbols, groups etc. into views/svg-defs.svg
gulp.task('svg-defs', () => {
  gulp.src(svgDefsFiles)
    .pipe(concat('svg-defs.svg'))
    .pipe(gulp.dest(templatesDest));
});

// task - webgl-defs:<br>
// concatenates individual shaders, etc. into views/webgl-defs.js
gulp.task('webgl-defs', () => {
  gulp.src(webglDefsFiles)
    .pipe(concat('webgl-defs.html'))
    .pipe(gulp.dest(templatesDest));
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
  gulp.src(jsFiles)
    .pipe(docco())
    .pipe(gulp.dest(transpiledDest));
  gulp.src(jsTestFiles)
    .pipe(docco())
    .pipe(gulp.dest(transpiledTestDest));
  gulp.src(tsFiles)
    .pipe(docco())
    .pipe(gulp.dest(docDest));
  gulp.src(tsTestFiles)
    .pipe(docco())
    .pipe(gulp.dest(docTestDest));
  gulp.src(tsjsFiles)
    .pipe(docco())
    .pipe(gulp.dest(docDest));
  gulp.src(tsjsTestFiles)
    .pipe(docco())
    .pipe(gulp.dest(docTestDest));
  gulp.src(devFiles)
    .pipe(docco())
    .pipe(gulp.dest(docDevDest));
});


// npm convenience tasks
// task - npm-install
gulp.task('npm-install', () =>{
  //exec('npm outdated --dev --depth 0 --color', (err, stdout, stderr) => {
  exec('npm install', (err, stdout, stderr) => {
    if(err){console.log(err);}
  });
});

// task - npm-outdated:<br>
// check for more recent dev-versions for node_modules
// * NOTE: npm version > 1.6 default depth=0 and --dev=true no-color
// * NOTE: --dev checks dev-dependencies also
// * NOTE: --depth 0 ignores dependencies of loaded packages
// * NOTE: --color displays non-breaking changes in red, breaking in yellow
gulp.task('npm-outdated', () =>{
  //exec('npm outdated --dev --depth 0 --color', (err, stdout, stderr) => {
  exec('npm outdated', (err, stdout, stderr) => {
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



gulp.task('clean', (done) => {
    del(['./app/modules/*.js'], done);
    del(['./app/modules/**/*.js'], done);
    del(['./app/build/*.js'], done);
});


