var gulp        = require('gulp')
var frontmatter = require('gulp-front-matter')
var markdown    = require('gulp-markdown')
var concat      = require('gulp-concat')
var es          = require('event-stream')
var fs          = require('fs')
var mustache    = require('mustache')

var header      = String(fs.readFileSync('templates/header.html'))
var footer      = String(fs.readFileSync('templates/footer.html'))

gulp.task('build-blog-index',function () {
    var bloglist = []
    return gulp.src('src/*.md')
        .pipe(frontmatter({
            property: 'meta'
        }))
        .pipe(markdown())
        .pipe(es.map(function(file, cb) {
            var path = file.path.split('/')
            var link = path[path.length-1]
            if (!file.meta.draft) {
                bloglist.push({
                    title   : file.meta.title,
                    preview : file.contents,
                    link    : 'blog/'+link
                })
            }
            cb(null, file);
        }))
        .pipe(concat('index.html'))
        .pipe(es.map(function(file, cb) {
            var template  = String(fs.readFileSync('templates/blogindex.html'));
            var html = mustache.render(template, {
                blogs : bloglist
            },{
                header : header,
                footer : footer
            });
            file.contents = new Buffer(html);
            cb(null, file);
        }))
        .pipe(gulp.dest('blog'))
})

gulp.task('build-blog', function () {
    return gulp.src('src/*.md')
        .pipe(frontmatter({
            property: 'meta'
        }))
        .pipe(markdown())
        .pipe(es.map(function(file, cb) {
            var template  = String(fs.readFileSync('templates/'+file.meta.template+'.html'));
            var html = mustache.render(template, {
                page: file.meta,
                content: String(file.contents)
            },{
                header : header,
                footer : footer
            });
            file.contents = new Buffer(html);
            cb(null, file);
        }))
        .pipe(gulp.dest('blog'));
});

gulp.task('build', ['build-blog','build-blog-index'])
gulp.task('default', ['build'])

module.exports = gulp
