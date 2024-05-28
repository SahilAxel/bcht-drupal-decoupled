// import typescript from 'gulp-typescript';
// const ts = typescript.createProject('tsconfig.json');
import sourcemaps from 'gulp-sourcemaps';

export default (gulp, config) => {
  gulp.task('js', () =>
    gulp
      .src(config.js.source)
      .pipe(sourcemaps.init())
      // .pipe(ts())
      .pipe(sourcemaps.write('../maps'))
      .pipe(gulp.dest(config.js.destination)),
  );
};
