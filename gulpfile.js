'use strict';
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    notify = require('gulp-notify'),
    nodemon = require('gulp-nodemon'),
    mocha = require('gulp-mocha');


// Configuration Directories
var dir = {
    app: 'app',
};

gulp.task('watch', ['app'], function() {

    // Watch server scripts
    gulp.watch(dir.app + '/**/*.js', ['app-restart']);

});

gulp.task('mocha', function() {
    gulp.src('./test/**/*.js')
        .pipe(mocha({ reporter: 'list' }));
});

gulp.task('lint', function() {
    return gulp.src([
            'gulpfile.js',
            '<%= yeoman.app %>/**/*.js',
            '<%= yeoman.config %>/**/*.js',
            'test/**/*.js'
        ])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(notify({ message: 'Linting task complete' }));
});

gulp.task('test', ['lint', 'mocha']);

gulp.task('app', ['test'], function() {
    return nodemon({
            script: 'server.js',
            ignore: [
                'README.md', 
                'node_modules/**'
            ],
            watchedExtensions: ['js'],
            watchedFolders: [dir.app, 'config'],
            debug: true,
            delayTime: 1,
            env: {
                PORT: 3000
            },
        })
        .on('restart', ['test']);
});

gulp.task('app-restart', function() {
    nodemon.emit('restart');
});

/** Build it all up and serve it */
gulp.task('default', ['watch']);

// /** Build it all up and serve the production version */
// gulp.task('serve', ['connect:production', 'app']);
