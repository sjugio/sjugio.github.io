var gulp        = require('gulp')
var frontmatter = require('gulp-front-matter')
var markdown    = require('gulp-markdown')
var concat      = require('gulp-concat')
var es          = require('event-stream')
var fs          = require('fs')
var mustache    = require('mustache')

gulp.task('build-blog-index',function () {
    var bloglist = []
    return gulp.src('src/*.md')
        .pipe(frontmatter({
            property: 'meta'
        }))
        .pipe(markdown())
        .pipe(es.map(function(file, cb) {
            if (!file.meta.draft) {
                bloglist.push({
                    title   : file.meta.title,
                    preview : file.contents
                })
            }
            cb(null, file);
        }))
        .pipe(concat('index.html'))
        .pipe(es.map(function(file, cb) {
            var template  = String(fs.readFileSync('templates/blogindex.html'));
            var html = mustache.render(template, {
                blogs : bloglist
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
            });
            file.contents = new Buffer(html);
            cb(null, file);
        }))
        .pipe(gulp.dest('blog'));
});

gulp.task('build', ['build-blog','build-blog-index'])
gulp.task('default', ['build'])

module.exports = gulp
