import autoprefixer from 'autoprefixer';
import postcss from 'gulp-postcss';
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
const sass = gulpSass(dartSass);
import sassGlob from 'gulp-sass-glob';
import sourcemaps from 'gulp-sourcemaps';
import gulpIf from 'gulp-if';

const isLocal = typeof process.env.CI === 'undefined';
const postCSSOptions = [autoprefixer()];


export default (gulp, config) => {
  gulp.task('scss', () =>
    gulp
      .src(...config.scss.source)
      .pipe(gulpIf(isLocal, sourcemaps.init()))
      .pipe(sassGlob())
      .pipe(sass(config.scss.options).on('error', sass.logError))
      .pipe(postcss(postCSSOptions))
      .pipe(gulpIf(isLocal, sourcemaps.write('../maps')))
      .pipe(gulp.dest(config.scss.destination)),
  );
};
