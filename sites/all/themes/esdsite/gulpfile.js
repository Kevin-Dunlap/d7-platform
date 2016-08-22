var gulp = require('gulp'),
	minify = require('gulp-minify'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	cssmin = require('gulp-cssmin'),
	rename = require('gulp-rename'),
    babel = require('gulp-babel')
	;
	
gulp.task('sass', function () {
	gulp.src('assets/scss/*.scss')
	 .pipe(sass().on('error', sass.logError))
     .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
     }))
     .pipe(gulp.dest('css'))
     .pipe(cssmin())
     .pipe(rename({suffix: '.min'}))
     .pipe(gulp.dest('css'))
     ;
});

gulp.task('compress', function() {
  gulp.src(['assets/js/*.js', 'node_modules/foundation-sites/js/foundation.core.js', 'node_modules/foundation-sites/js/foundation.util.mediaQuery.js', 'node_modules/foundation-sites/vendor/modernizr/modernizr.js', 'node_modules/foundation-sites/vendor/jquery/dist/jquery.js'])
    .pipe(babel({
            presets: ['es2015'],
            plugins: ['transform-remove-strict-mode'],
            only: ['node_modules/foundation-sites/js/*.js'],
            compact: true
        }))
    .pipe(minify({
        ext:{
            src:'.js',
            min:'.min.js'
        }
    }))
    .pipe(gulp.dest('js'))
    ;
});

gulp.task('watch', function () {
	gulp.watch('assets/scss/**/*.scss', ['sass']);
	gulp.watch('assets/js/**/*.js', ['compress']);
});
