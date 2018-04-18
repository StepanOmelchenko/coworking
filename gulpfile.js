const gulp = require('gulp');
const del = require('del');
const removeHtmlComments = require('gulp-remove-html-comments');
const htmlMin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');

const paths = {
    root: './build',
    html: {
        src: './src/*.html',
        dest: './build'
    },
    css: {
        src: './src/css/main.css',
        dest: './build/css'
    },
    fonts: {
        src: './src/fonts/**/*.*',
        dest: './build/fonts'
    },
    img: {
        src: './src/img/**/*.*',
        dest: './build/img'
    }
};

function clear() {
    return del(paths.root);
}

function html() {
    return gulp.src(paths.html.src)
        .pipe(removeHtmlComments())
        .pipe(htmlMin({collapseWhitespace: true}))
        .pipe(gulp.dest(paths.html.dest))
}

function css() {
    return gulp.src(paths.css.src)
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(paths.css.dest))
}

function fonts() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest))
}

function imgs() {
    return gulp.src(paths.img.src)
        .pipe(gulp.dest(paths.img.dest))
}

function watch() {
    gulp.watch(paths.css.src, css);
    gulp.watch(paths.fonts.src, fonts);
    gulp.watch(paths.html.src, html);
    gulp.watch(paths.img.src, imgs);
}

exports.del = clear;
exports.html = html;
exports.css = css;
exports.fonts = fonts;
exports.img = imgs;

gulp.task('default', gulp.series(
    clear,
    gulp.parallel(html, css),
    gulp.parallel(fonts, imgs),
    watch
));