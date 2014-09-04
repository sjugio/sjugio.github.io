var gulp        = require('gulp')
var frontmatter = require('gulp-front-matter')
var markdown    = require('gulp-markdown')
var concat      = require('gulp-concat')
var es          = require('event-stream')
var fs          = require('fs')
var mustache    = require('mustache')
var _           = require('lodash')

var header      = String(fs.readFileSync('templates/header.html'))
var footer      = String(fs.readFileSync('templates/footer.html'))

var collectChildrenToPublish = function (collection) {
    return es.map(function (file, cb) {
        var path = file.path.split('/')
        var link = path[path.length-1]
        if (!file.meta.draft) {
            collection.push({
                title   : file.meta.title,
                preview : file.contents,
                link    : link
            })
        }
        cb(null, file);
    })
}

var template = function (template, data) {
    return es.map(function(file, cb) {
        var _template  = String(fs.readFileSync(template));
        var _data = _.mapValues(data, function (value) {
            if (typeof value == 'object') return value
            if (typeof value == 'string' && value.indexOf('file.') == 0) {
                if (value == 'file.contents') return String(file.contents)
                return file[value.split('file.')[1]]
            }
        })
        var html = mustache.render(_template, _data, {
            header : header,
            footer : footer
        });
        file.contents = new Buffer(html);
        cb(null, file);
    })
}

// BLOG

gulp.task('build-blog-index',function () {
    var bloglist = []
    return gulp.src('src/blog/*.md')
        .pipe(frontmatter({
            property: 'meta'
        }))
        .pipe(markdown())
        .pipe(collectChildrenToPublish(bloglist))
        .pipe(concat('index.html'))
        .pipe(template('templates/blog_index.html', { blogs : bloglist }))
        .pipe(gulp.dest('blog'))
})

gulp.task('build-blog', function () {
    return gulp.src('src/blog/*.md')
        .pipe(frontmatter({
            property: 'meta'
        }))
        .pipe(markdown())
        .pipe(template('templates/blog.html', { page : 'file.meta', content : 'file.contents' }))
        .pipe(gulp.dest('blog'));
});

// EVENTS

gulp.task('build-events-index',function () {
    var bloglist = []
    return gulp.src('src/events/*.md')
        .pipe(frontmatter({
            property: 'meta'
        }))
        .pipe(markdown())
        .pipe(collectChildrenToPublish(bloglist))
        .pipe(concat('index.html'))
        .pipe(template('templates/event_index.html', { blogs : bloglist }))
        .pipe(gulp.dest('events'))
})

gulp.task('build-events', function () {
    return gulp.src('src/events/*.md')
        .pipe(frontmatter({
            property: 'meta'
        }))
        .pipe(markdown())
        .pipe(template('templates/event.html', { page : 'file.meta', content : 'file.contents' }))
        .pipe(gulp.dest('events'));
});

gulp.task('build', ['build-blog','build-blog-index','build-events', 'build-events-index'])
gulp.task('default', ['build'])

module.exports = gulp
