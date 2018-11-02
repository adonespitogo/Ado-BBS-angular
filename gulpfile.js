'use strict'

const gulp = require('gulp')
const inject = require('gulp-inject')
const concat = require('gulp-concat')
const sass = require('gulp-sass')
const jshint = require('gulp-jshint')
const uglify = require('gulp-uglify')
const stripDebug = require('gulp-strip-debug')
const templateCache = require('gulp-angular-templatecache')
const randomstring = require('randomstring')
const sourcemaps = require('gulp-sourcemaps')
const clean = require('gulp-clean')
const serve = require('gulp-serve')

const VENDOR_JS = [
  //'./node_modules/file-saver/FileSaver.js',
  './node_modules/moment/moment.js',
  './node_modules/angular/angular.js',
  './node_modules/angular-cookies/angular-cookies.js',
  './node_modules/angular-cookie/angular-cookie.js',
  './node_modules/angular-messages/angular-messages.js',
  './node_modules/angular-animate/angular-animate.js',
  './node_modules/@uirouter/angularjs/release/angular-ui-router.js',
  './node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
  './node_modules/ng-token-auth/dist/ng-token-auth.js',
  './node_modules/angular-animate/angular-animate.js',
  './node_modules/angular-toastr/dist/angular-toastr.tpls.js',
  './src/js/libs/ladda/spin.min.js',
  './src/js/libs/ladda/ladda.min.js',
  './node_modules/angular-ladda/dist/angular-ladda.js',
  './node_modules/angular-environment/dist/angular-environment.js',
  './node_modules/angular-xeditable/dist/js/xeditable.js',
  './node_modules/angular-loading-bar/build/loading-bar.js',
  './node_modules/angular-recaptcha/release/angular-recaptcha.js',
  './node_modules/ado-ng-auth/dist/ado-ng-auth.js',
]

const APP_JS = [
  './src/js/init.js',
  './src/js/app.js',
  './src/js/routes.js',
  './src/js/config/**/*.js',
  './src/js/controllers/**/*.js',
  './src/js/services/**/*.js',
  './src/js/filters/**/*.js',
  './src/js/directives/**/*.js',
]

const VENDOR_CSS = [
  './node_modules/bootstrap/dist/css/bootstrap.css',
  './node_modules/bootstrap/dist/css/bootstrap-theme.css',
  './node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css',
  './node_modules/angular-toastr/dist/angular-toastr.css',
  './node_modules/angular-xeditable/dist/css/xeditable.css',
  './node_modules/angular-loading-bar/build/loading-bar.css'
]

const APP_SCSS = [
  './node_modules/ladda/css/ladda.scss',
  './src/**/*.scss'
]

const PHP_FILES = [
  './src/**/*.php'
]

gulp.task('clean:dist', () => {
  return gulp.src('./dist', {read: false}).pipe(clean())
})

gulp.task('copy:php', ['clean:dist'], () => {
  return gulp.src(PHP_FILES)
    .pipe(gulp.dest('./dist'))
})

gulp.task('js:hint', () => {
  return gulp.src(APP_JS)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
})

gulp.task('js:build', ['clean:dist', 'js:hint'], () => {
  let hash = randomstring.generate()
  let stream = gulp.src(VENDOR_JS.concat(APP_JS))
    .pipe(sourcemaps.init())
    .pipe(concat(`app-${hash}.js`))

  if (process.env.NODE_ENV == 'production')
    stream = stream.pipe(uglify()).pipe(stripDebug())

  return stream
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js'))
})

gulp.task('templates', ['clean:dist'], () => {
  let hash = randomstring.generate()
  return gulp.src(['./src/views/**/*.html'])
    .pipe(templateCache({
      filename: `templates-${hash}.js`,
      module: 'AdoPisoWiFi.CommunityForum'
    }))
    .pipe(gulp.dest('./dist/js/'))
})

// start css

gulp.task('vendor:css', ['clean:dist'], () => {
  return gulp.src(VENDOR_CSS)
    .pipe(concat(`0-vendor-${randomstring.generate()}.css`))
    .pipe(gulp.dest('./dist/css'))
})

gulp.task('app:sass', ['clean:dist'], () => {
  return gulp.src(APP_SCSS)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(concat(`app-${randomstring.generate()}.css`))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'))
})

// end css

// copy images
gulp.task('copy:images', ['clean:dist'], () => {
  return gulp.src('./src/img/**/*.{png,gif,jpg,jpeg}')
    .pipe(gulp.dest('./dist/img'))
})

gulp.task('copy:fonts', ['clean:dist'], () => {
  return gulp.src([
    './node_modules/bootstrap/dist/fonts/**/*'
  ])
    .pipe(gulp.dest('./dist/fonts'))
})

gulp.task('build', ['copy:php', 'copy:images', 'copy:fonts', 'js:build', 'templates', 'vendor:css', 'app:sass'], () => {
  let target = gulp.src('./dist/**/*.{html,php}')
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  let sources = gulp.src(['./dist/**/*.js', './dist/**/*.css'], {read: false})

  return target.pipe(inject(sources, {relative: true}))
    .pipe(gulp.dest('./dist'))

})

gulp.task('watch', function() {
  gulp.watch('./src/**/*', ['build']);
})

gulp.task('serve', ['build'], serve({
  root: ['./dist'],
  port: 1234
}))


