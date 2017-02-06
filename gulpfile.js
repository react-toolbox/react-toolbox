const path = require('path');
const gulp = require('gulp');
const babel = require('gulp-babel');
const postcss = require('gulp-postcss');

gulp.task('js', function () {
  return gulp.src([
    './components/**/*.js',
    '!./components/**/__test__/*.js',
    '!./components/__mocks__/**/*.js'
  ])
    .pipe(babel())
    .pipe(gulp.dest('./lib'));
});

gulp.task('css', function () {
  const plugins = [
    require('postcss-import')({
      root: __dirname,
      path: [path.join(__dirname, './components')]
    }),
    require('postcss-mixins')(),
    require('postcss-each')(),
    require('postcss-reporter')({ clearMessages: true })
  ];

  return gulp.src([
      './components/*.css',
      './components/**/*.css'
    ])
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./lib'));
});

gulp.task('default', ['js', 'css']);
