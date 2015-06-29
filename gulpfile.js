var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var uncss = require('gulp-uncss');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();


////////////////////////////////////////
   // Development
////////////////////////////////////////

// SCSS -> CSS Tasks

gulp.task('sass', function () {
   gulp.src('public/sass/**/*.scss')
      .pipe(sass())
      //.pipe(uncss({
         //html: ['public/**/*.html']
      //}))
      .pipe(gulp.dest('public/style'))
      //.pipe(livereload({ start: true }))
      //.pipe(notify({ message: 'SCSS to css task complete' }))
      //.pipe(plumber());
      .pipe(browserSync.stream())
      .browserSync.notify("SCSS compiled", 1000);
});


// HTML tasks

gulp.task('html', function() {
   gulp.src('public/**/*.html')
      //.pipe(gulp.dest(''))
      //.pipe(livereload({ start: true }))
      //.pipe(notify({ message: 'HTML task complete' }))
      //.pipe(plumber());
      .pipe(browserSync.stream());
});


// JS tasks

gulp.task('js', function() {
   gulp.src('public/scripts/**/*.js')
      //.pipe(livereload({ start: true }))
      //.pipe(notify({ message: 'JS task complete' }))
      //.pipe(plumber());
      .pipe(browserSync.stream());

});


////////////////////////////////////////
   // Production
////////////////////////////////////////

// concat & minify JS files

gulp.task('compress', function() {
   return gulp.src('public/js/**/*.js')
      .pipe(concat('allScript.js'))
      .pipe(uglify())
      .pipe(gulp.dest('public/dist/js/'));
});



////////////////////////////////////////
   // ACTIONS
////////////////////////////////////////

// Development

gulp.task('run', function() {
   //livereload.listen();
   browserSync.init({
        server: "./public"
    });
   gulp.watch('public/sass/**/*.scss', ['sass']);
   gulp.watch('public/partials/**/*.html', ['html']);
   gulp.watch('public/scripts/**/*.js', ['js']);
   //livereload.reload();
});


// Production

gulp.task('prod', ['compress']);
