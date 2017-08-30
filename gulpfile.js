var gulp = require('gulp');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');
var ngAnnotate = require('browserify-ngannotate');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var templateCache = require('gulp-angular-templatecache');
var merge = require('merge-stream');

gulp.task('browserify', function () {
    'use strict';
    return browserify('./app/app.js')
        .transform(babelify, {presets: "es2015"})
        .transform(ngAnnotate)
        .bundle()
        .pipe(source('app.js')) // gives streaming vinyl file object
        .pipe(buffer()) // convert from streaming to buffered vinyl file object
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('merge', function () {
    'use strict';
    return gulp.src(['app/*.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('inject', function () {
    'use strict';
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');

    var injectSrc = gulp.src(['./dist/css/*.css', './contents/*.js', './dist/*.js'], {read: false});
    var options = {
        bowerJson: require('./bower.json'), // for getting json from file
        directory: './dist/lib'
    };

    return gulp.src('./app/index.html')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, {relative: true}))
        .pipe(gulp.dest('./app'));
});

gulp.task('sass', function () {
    return gulp.src('./contents/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(concat('styles.scss'))
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(cleanCSS({compatibility: '*'}))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('cache', function () {
    var a = gulp.src('app/**/*.html')
        .pipe(templateCache('templates.js', {module: 'myApp', standalone: false}))
        .pipe(buffer());
    return merge(a, gulp.src('app/app.js'))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('app'));
});

gulp.task('default', ['browserify', 'inject']);