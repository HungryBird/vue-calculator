const browserSync = require('browser-sync').create()
	,gulp = require('gulp')
	,sass = require('gulp-sass')
	,plumber = require('gulp-plumber')
	,reload = browserSync.reload
	,fileInclude = require('gulp-file-include')
	,autoprefixer = require('gulp-autoprefixer')
	,cssnano = require('gulp-cssnano')
	,uglify = require('gulp-uglify')
	,rename = require('gulp-rename')
	babel = require('gulp-babel');

//sass
gulp.task('sass',function() {
	return gulp.src('./src/sass/**/*.scss')
	.pipe(plumber())
	.pipe(autoprefixer('last 6 version'))
	.pipe(sass().on('error',function(err) {
		console.log(err);
	}))
	.pipe(gulp.dest('./dist/css'))
	.pipe(cssnano())
	.pipe(rename(function(path) {
		path.basename += ".min"
	}))
	.pipe(gulp.dest('./dist/css'))
	.pipe(browserSync.stream())
});

//index html
gulp.task('html',function() {
	return gulp.src('./src/*.html')
	.pipe(plumber())
	.pipe(fileInclude({
		prefix: '@@',
		basepath: '@file'
	}))
	.pipe(gulp.dest('./dist'))
	.pipe(browserSync.stream())
});

//script
gulp.task('script',function(path) {
	return gulp.src('./src/js/**/*.js')
	.pipe(plumber())
	.pipe(babel({
		presets: ['env']
	}))
	.pipe(gulp.dest('./dist/js'))
	.pipe(uglify())
	.pipe(rename(function(path) {
		path.basename += ".min"
	}))
	.pipe(gulp.dest('./dist/js'))
	.pipe(browserSync.stream())
});

//server
gulp.task('serve',['sass','script','html'],function() {
	browserSync.init({
		server: {
			baseDir: './dist'
		}
	});
	gulp.watch('./src/sass/**/*.scss', ['sass']);
	gulp.watch('./src/js/**/*.js', ['script']);
	gulp.watch(['./src/*.html', './src/build/**/*.html'], ['html']);
	gulp.watch(['./dist/*.html','./dist/**/*']).on('change', reload);  //这是重新注入
})

//default
gulp.task('default',['serve']);