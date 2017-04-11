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
            'node_modules/wowjs/dist/wow.min.js',
            '!src/libs/modernizr-custom.js'
        ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src/js'));
});

gulp.task('concatCssTaskLibs', function() {
    return gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/animate.css/animate.min.css'
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
// -----------------------------------------------------------------------------------------------------------

// Watch! ----------------------------------------------------------------------------------------------------
gulp.task('watch', ['browser-sync', 'minCss', 'minCssLibs', 'scripts'], function() {
    gulp.watch('src/sass/**/*.sass', ['minCss']);
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);
});
// -----------------------------------------------------------------------------------------------------------

// Bulid! ----------------------------------------------------------------------------------------------------
gulp.task('build', ['clean', 'scripts', 'minCss', 'minCssLibs'], function() {

    var buildCss = gulp.src([
            'src/css/main.min.css',
            'src/css/bundle.libs.min.css'
        ])
        .pipe(gulp.dest('dist/css'));

    var buildJs = gulp.src([
            'src/js/libs.min.js',
            'src/js/my_main_scripts.js'
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
                optimizationLevel: 10
            }),
            imagemin.svgo({
                plugins: [{
                    removeViewBox: true
                }]
            })
        ]))
        .pipe(gulp.dest('dist/img'));

    var buildHtmlPhp = gulp.src('src/*')
        .pipe(gulp.dest('dist/'));

});
// -----------------------------------------------------------------------------------------------------------
