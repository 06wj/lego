var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var jsdoc = require('gulp-jsdoc');
var rename = require('gulp-rename');
var insert = require('gulp-insert');
var rimraf = require('gulp-rimraf');

var config = {
    src: [
        "src/Lego.js",
        "src/View.js",
        "src/Stage.js"
    ],
    standalone: {
        dir: 'build/',
        filename: 'lego.js',
        start: '(function(window, undefined){\n',
        end: '\n})(this);\n'
    },
    jsdoc: {
        infos: {
            name: 'lego',
            description: 'render 3d object',
            version: '0.0.1',
        },
        template: {
            path: './doc/tmpl/'
        },
        options: {
            'private': false,
            'monospaceLinks': false,
            'cleverLinks': true,
            'outputSourceFiles': true
        },
        dest: './doc/'
    }
};

var pack = function (type) {
    var data = config[type];
    return gulp.src(config.src)
        .pipe(insert.wrap(data.start, data.end))
        .pipe(concat(data.filename))
        .pipe(gulp.dest(data.dir))
        .pipe(gulp.dest(data.dir))
        // .pipe(uglify())
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest(data.dir));
};

gulp.task('clean', function () {
    return gulp.src(['doc/*.html', 'build'])
        .pipe(rimraf({ force: true }));
});

// 让 lint 依赖 clean 是为了，在所有执行前先删除一下目录，因为 gulp 是异步的，所以放在依赖里面更好处理
gulp.task('lint', ['clean'], function() {
    var lintFiles = config.src;
    return gulp.src(lintFiles)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});


gulp.task('standalone', ['lint'], function() {
    return pack('standalone');
});


gulp.task('doc', ['lint', 'build'], function() {
    var opt = config.jsdoc;
    return gulp.src(config.src.concat('README.md'))
        .pipe(jsdoc(opt.dest, opt.template, opt.options));
});

gulp.task('watch', function() {
    gulp.watch(config.src, ['build']);
});

gulp.task('build', ['standalone']);
gulp.task('default', ['build', 'doc']);