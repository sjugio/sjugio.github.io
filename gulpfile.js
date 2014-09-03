var gulp     = require('gulp')
var template = require('gulp-template')
var markdown = require('gulp-markdown')

var paths = {
    src       : 'src',
    templates : 'templates',
    styles    : 'styles'
}

gulp.task('default', function () {
    return gulp.src('src/*.md')
        .pipe(markdown())
        .pipe(gulp.dest('blog'));
});
