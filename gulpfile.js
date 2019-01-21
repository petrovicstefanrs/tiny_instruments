// Utils

const gulp = require('gulp');
const browserSync = require('browser-sync');
const gutil = require('gulp-util');
const useref = require('gulp-useref');
const cache = require('gulp-cache');
const del = require('del');
const runSequence = require('run-sequence');

// Css

const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

// Babel + Browserify

const babel = require('gulp-babel');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');

// Other

const imagemin = require('gulp-imagemin');

// Development Tasks
// -----------------

// Start browserSync server

gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: 'app',
		},
	});
});

gulp.task('sass', () => {
	const plugins = [
		autoprefixer({ browsers: ['last 2 versions'] }),
		cssnano(),
	];
	return gulp
		.src('app/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss(plugins))
		.pipe(gulp.dest('app/styles'))
		.pipe(browserSync.stream());
});

gulp.task('babel', () => {
	const entries = [
		'app/js/main.js',
		'app/js/splash.js',
		'app/js/contact.js',
		'app/js/subscribe.js',
	];

	browserify({
		entries: entries,
		debug: true,
	})
		.transform(babelify, { presets: ['@babel/preset-env'] })
		.on('error', gutil.log)
		.bundle()
		.on('error', gutil.log)
		.pipe(source('main.js'))
		.pipe(gulp.dest('app/scripts'))
		.pipe(browserSync.reload({ stream: true }));
});

// Watchers
gulp.task('watch', () => {
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/js/**/*.js', ['babel']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/scripts/**/*.js', browserSync.reload);
});

// Optimization Tasks
// ------------------

// Optimizing CSS and JavaScript
gulp.task('useref', function() {
	return gulp
		.src('app/*.html')
		.pipe(useref())
		.pipe(gulp.dest('dist'));
});

// Optimizing Images
gulp.task('images', function() {
	return (
		gulp
			.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
			// Caching images that ran through imagemin
			.pipe(
				cache(
					imagemin({
						interlaced: true,
					})
				)
			)
			.pipe(gulp.dest('dist/images'))
	);
});

// Copying fonts
gulp.task('fonts', function() {
	return gulp.src('app/fonts/**/*').pipe(gulp.dest('dist/fonts'));
});

// Copying sounds
gulp.task('sounds', function() {
	return gulp.src('app/music/**/*').pipe(gulp.dest('dist/music'));
});

// Cleaning
gulp.task('clean', function() {
	return del.sync('dist').then(function(cb) {
		return cache.clearAll(cb);
	});
});

gulp.task('clean:dist', function() {
	return del.sync(
		['dist/**/*', '!dist/images', '!dist/images/**/*'],
		'!dist/music',
		'!dist/music/**/*'
	);
});

// Build Sequences
// ---------------

gulp.task('default', function(callback) {
	runSequence(['sass', 'babel', 'browserSync'], 'watch', callback);
});

gulp.task('build', function(callback) {
	runSequence(
		'clean:dist',
		'babel',
		'sass',
		['useref', 'images', 'fonts', 'sounds'],
		callback
	);
});
