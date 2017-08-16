const gulp = require('gulp')
    ,imageMin = require('gulp-imagemin')
    ,uglify = require('gulp-uglify')
    ,gulpSass = require('gulp-sass')
    ,concat = require('gulp-concat');

/*
    -- TOP LEVEL FUNCTIONS --
    gulp.task - define tasks
    gulp.src - point to the files to use
    gulp.dest - points to output folder
    gulp.watch - watch files/folders for changes
*/

/*
    'default' gulp task is run when just using 'gulp' at cmd line
    the following runs all tasks in the array given.
*/
gulp.task('default',['message','copyHtml','optimizeImages','generateScript','compileSass'])


gulp.task('message',function(){
    return console.log('Gulp is running...')
});

//Copy all html files
gulp.task('copyHtml',function(){
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

//optimize images
gulp.task('optimizeImages',function(){
    gulp.src('src/images/*')
    .pipe(imageMin())
    .pipe(gulp.dest('dist/images'));
});

//Minify js
gulp.task('minifyJS',function(){
    gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

//generate master script from smaller js files
gulp.task('generateScript',function(){
    gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
});

//compile sass
gulp.task('compileSass',function(){
    gulp.src('src/sass/*.scss')
    .pipe(gulpSass().on('error',gulpSass.logError))
    .pipe(gulp.dest('dist/css'));
});


//master watch task, fist param is the folder/file to watch
//second param is an array of tasks to be ran after changes
gulp.task('watch',function(){
    gulp.watch('src/js/*.js',['generateScript']);
    gulp.watch('src/images/*',['optimizeImages']);
    gulp.watch('src/sass/*.scss',['compileSass']);
    gulp.watch('src/*.html',['copyHtml']);
});