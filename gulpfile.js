const path = require('path');
const gulp = require('gulp');
const babel = require('gulp-babel');
const postcss = require('gulp-postcss');

const paths = {
  js: {
    src: [
      './components/**/*.js',
      '!./components/**/*.spec.js',
      '!./components/**/__test__',
      '!./components/__mocks__/**/*.js'
    ],
  },
  css: {
    src: [
      './components/*.css',
      './components/**/*.css'
    ],
  },
  tsd: {
    src: './components/**/*.d.ts',
  },
  dest: './lib',
}


function js(cb) {
  gulp.src(paths.js.src)
    .pipe(babel())
    .pipe(gulp.dest(paths.dest));

  cb()
};

function css(cb) {
  // Copied from webpack/postcss.config.js
  const plugins = [
    require('postcss-import')({
      root: __dirname,
      path: [path.join(__dirname, './components')]
    }),
    require('postcss-mixins'),
    require('postcss-each'),
    require('postcss-apply'),
    require('postcss-preset-env')({
      stage: 0, // required to get all features that were from cssnext
      features: {
        'custom-properties': false,
        'color-mod-function': false,
      }
    }),
    require('postcss-calc'), // required as postcss-preset-env doesn't have a reduce calc() funtion
    require('postcss-normalize'),
    require('postcss-reporter')({
      clearReportedMessages: true
    })
  ]

  gulp.src(paths.css.src)
    .pipe(postcss(plugins))
    .pipe(gulp.dest(paths.dest));

  cb()
};

function tsd(cb) {
  gulp.src(paths.tsd.src)
    .pipe(gulp.dest(paths.dest));

  cb()
};

const build = gulp.series(js, css, tsd)

gulp.task('default', build)
