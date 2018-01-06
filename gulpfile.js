/* eslint-env 6 */
let gulp = require('gulp'),
    less = require('gulp-less'),
    minifyCSS = require('gulp-csso'),
    rename = require('gulp-rename'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    bs = require('browser-sync').create(),
    concat = require('gulp-concat'),
    gUtil = require('gulp-util'),
    path = require('path');

let LessAutoprefix = require('less-plugin-autoprefix'),
    autoprefix = new LessAutoprefix({
        browsers: ['last 2 Firefox versions', "last 2 Chrome versions"]
    });

const reload = bs.reload;
const zip = require('gulp-zip');

const DIST = 'dist';
const SRC = {
    default: 'src/**',
    assets: 'src/assets/**',
    less: 'src/styles/**',
    scripts: 'src/js/**',
    jsLibs: 'src/js/libs/**',
    styles: 'src/styles/styles.less'
};

gulp.task('styles', () => {
    return gulp.src(SRC.styles)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifyCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(DIST + '/css'));
});

gulp.task('scripts', () => {
    return gulp.src(SRC.scripts)
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(DIST, 'js')));
});

gulp.task('html', () => {
    return gulp.src('src/*.html')
        .pipe(gulp.dest(DIST));
});

gulp.task('assets', () => {
    return gulp.src(SRC.assets)
        .pipe(gulp.dest(path.join(DIST, 'assets')));
});

gulp.task('jsLibs', () => {
    return gulp.src(SRC.jsLibs)
        .pipe(gulp.dest(path.join(DIST, 'js')));

});

gulp.task('clean', () => {
    return del([DIST + '/css', DIST + '/css']);
});


gulp.task('serve', ['jsLibs', 'assets', 'scripts', 'styles', 'html'], () => {
    gulp.watch('src/*.html', ['html', reload]);
    gulp.watch(path.join(SRC.less, '/*.less'), ['styles', reload]);
    gulp.watch(path.join(SRC.scripts, '/*.js'), ['scripts', 'doc', reload]);
});

gulp.task('default', ['serve'], () => {
    bs.init({
        server: {
            baseDir: './dist/'
        },
        // browser: ["chrome", "firefox"]
        browser: ['chrome']
    });
});