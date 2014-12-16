var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var jsdoc = require('gulp-jsdoc');
var rename = require('gulp-rename');
var insert = require('gulp-insert');
var rimraf = require('gulp-rimraf');
var through2 = require('through2');


var pkg = require('./package.json');
var sources = pkg.sources.files.map(function(file){
    return pkg.sources.src + "/" + file;
});

var config = {
    src:sources,
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

var modify = function() {
    return through2.obj(function(file, encoding, done) {
        var findMetadata = function(code){
            var matches = [], result;
            var module, moduleName, requireModules = [], requireClasses = [];
            var moduleRegExp = /(\*[\s]?@module[\s]+)([\S]+)\s/;
            var requireRegExp = /(\*[\s]?@requires[\s]+)([\S]+)\s/ig;
            var classRegExp = /\/?(\w+)$/;

            //module info
            if((result = moduleRegExp.exec(code)) != null){
                matches.push(result[0]);
                module = result[2];
                moduleName = module.match(classRegExp)[1];
            }

            //require module info
            while((result = requireRegExp.exec(code)) != null){
                matches.push(result[0]);
                var mod = result[2];
                var clazz = mod.match(classRegExp)[1];
                requireModules.push(mod);
                requireClasses.push(clazz);
            }

            return {
                matches: matches,
                module: module,
                moduleName: moduleName,
                requireModules: requireModules,
                requireClasses: requireClasses
            };
        };


        var getModule = function(module){
            if(module.indexOf("/") > -1){
                return module.replace(/\//g, ".");
            }
            else{
                return "window." + module;
            }
        };

        var content = String(file.contents);
        var meta = findMetadata(content);

        var start = "";
        meta.requireModules.forEach(function(module, i){
            start += "\nvar " + meta.requireClasses[i] + " = " + getModule(module) + ";\n";
        });

        var end = "\n" + getModule(meta.module) + " = " + meta.moduleName + ";\n";

        file.contents = new Buffer(start + content + end);
        this.push(file);
        done();
    });
};

var pack = function (type) {
    var data = config[type];
    return gulp.src(config.src)
        .pipe(modify())
        .pipe(insert.wrap(data.start, data.end))
        .pipe(concat(data.filename))
        .pipe(gulp.dest(data.dir))
        .pipe(uglify())
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
    gulp.watch(config.src, ['default']);
});

gulp.task('build', ['standalone']);
gulp.task('default', ['build', 'doc']);