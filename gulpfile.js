// Copyright (c) 2017 Copyright Holder All Rights Reserved.
// Author: Alexandr Valsenko

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    concatCss = require('gulp-concat-css'),
    imagemin = require('gulp-imagemin'),
    del = require('del');

// npm i gulp-sass browser-sync gulp-concat gulp-uglifyjs gulp-cssnano gulp-rename gulp-concat-css del --save-dev
// npm i jquery bootstrap@4.0.0-alpha.6 tether wow.js --save

// Tasks! ----------------------------------------------------------------------------------------------------
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });
});

gulp.task('sass', function() {
    return gulp.src('src/sass/**/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('src/css'));
});

gulp.task('scripts', function() {
    return gulp.src(['src/libs/**/*.js',
            'node_modules/jquery/dist/jquery.js',
            'node_modules/tether/dist/js/tether.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/wow.js/dist/wow.min.js',
            'node_modules/particles.js/particles.js',
            'node_modules/waypoints/lib/jquery.waypoints.min.js',
            'node_modules/jquery-circle-progress/dist/circle-progress.min.js',
            'node_modules/countup.js/dist/countUp.min.js',
            'node_modules/nprogress/nprogress.js',
            'src/js/navbar.js',
            '!src/libs/modernizr-custom.js'
        ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src/js'));
});

gulp.task('concatCssTaskLibs', function() {
    return gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/wow.js/css/libs/animate.css',
            'node_modules/nprogress/nprogress.css',
            'src/css/navbar.css',
            'src/css/buttons.css'
        ])
        .pipe(concatCss('bundle.libs.css'))
        .pipe(gulp.dest('src/css'));
});

gulp.task('minCss', ['sass'], function() {
    return gulp.src(['src/css/main.css'])
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
});

gulp.task('minCssLibs', ['concatCssTaskLibs'], function() {
    return gulp.src(['src/css/bundle.libs.css'])
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('src/css'));
});

gulp.task('clean', function() {
    return del.sync('dist/**/*');
});

gulp.task('imgOpti', function () {
  return gulp.src('src/img/**/*')
          .pipe(imagemin())
          .pipe(gulp.dest('dist/img'))
});
// -----------------------------------------------------------------------------------------------------------

// Watch! ----------------------------------------------------------------------------------------------------
gulp.task('watch', ['browser-sync', 'minCss', 'minCssLibs', 'scripts'], function() {
    gulp.watch('src/sass/**/*.sass', ['minCss']);
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);
});
// -----------------------------------------------------------------------------------------------------------

// Bulid! ----------------------------------------------------------------------------------------------------
gulp.task('build', ['clean', 'scripts', 'minCss', 'minCssLibs', 'imgOpti'], function() {

    var buildCss = gulp.src([
            'src/css/main.min.css',
            'src/css/bundle.libs.min.css'
        ])
        .pipe(gulp.dest('dist/css'));

    var buildJs = gulp.src([
            'src/js/libs.min.js',
            'src/js/my_main_scripts.js',
            'src/js/particlesjs-config.json'
        ])
        .pipe(gulp.dest('dist/js'));

    var buildFonts = gulp.src([
            'src/fonts/**/*.*'
        ])
        .pipe(gulp.dest('dist/fonts'));

    var buildImg = gulp.src('src/img/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({
                interlaced: true
            }),
            imagemin.jpegtran({
                progressive: true
            }),
            imagemin.optipng({
                optimizationLevel: 6
            }),
            imagemin.svgo({
                plugins: [{
                    removeViewBox: true
                }]
            })
        ]))
        .pipe(gulp.dest('dist/img'));

    var buildHtmlPhp = gulp.src([
            'src/*.html',
            'src/*.php'
        ])
        .pipe(gulp.dest('dist/'));

});
// -----------------------------------------------------------------------------------------------------------
