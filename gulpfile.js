var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    notify = require('gulp-notify'),
    bower = require('gulp-bower');

var config = {
     sassPath: './resources/sass',
     bowerDir: './bower_components' 
}

gulp.task('bower', function() {
    return bower()
      .pipe(gulp.dest(config.bowerDir))
});

gulp.task('js', function() {
    return gulp.src([config.bowerDir + '/bootstrap-sass-official/assets/javascripts/bootstrap.min.js',
                    config.bowerDir + '/jquery/dist/jquery.min.js'
            ])
        .pipe(gulp.dest('./public/js')); 
});

gulp.task('icons', function() {
    return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*') 
        .pipe(gulp.dest('./public/fonts')); 
});

gulp.task('css', function() {
    return sass(config.sassPath + '/style.scss', {
      style: 'compressed',
      loadPath: [
        './resources/sass',
        config.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
        config.bowerDir + '/fontawesome/scss'
      ]
    })
        .on('error', notify.onError(function(error) {
            return 'Error: ' + error.message;
        }))
      .pipe(gulp.dest('./public/css'));
});

// Rerun the task when a file changes
 gulp.task('watch', function() {
     gulp.watch(config.sassPath + '/**/*.scss', ['css']); 
});

  gulp.task('default', ['bower', 'icons', 'css','js']);
