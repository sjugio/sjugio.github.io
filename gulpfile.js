var gulp        = require('gulp')
var frontmatter = require('gulp-front-matter')
var markdown    = require('gulp-markdown')
var es          = require('event-stream')
var fs          = require('fs')
var mustache    = require('mustache')

gulp.task('build', function () {
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

gulp.task('default', ['build'])

module.exports = gulp
