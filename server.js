var gulp        = require('./gulpfile')
var express     = require('express')
var gaze        = require('gaze')
var path        = require('path')
var tinylr      = require('tiny-lr-fork')()

var conf = {
    port      : 4050
}

/** Livereload */

tinylr.listen(35729)
var livereload = function (evt, filepath) {
    tinylr.changed({
        body: {
            files: path.relative(__dirname, filepath)
        }
    })
}

/** Initial webpack */

gulp.tasks.build.fn()

/** Server */

var app = express()
    .use(express.static(__dirname))
    .listen(conf.port, function(){
        console.log('Server running at http://localhost:'+conf.port)
    })

/** Gaze */

gaze(['src/*.md', 'templates/*.html'], function(err, watcher) {
    this.on('all', function(event, filepath) {
        gulp.tasks.build.fn()
    })
})

gaze(['index.html','blog/*.html','styles/*.css','scripts/*.js'], function(err, watcher) {
    watcher.on('all', function(event, filepath) {
        livereload(event, filepath)
    })
})
