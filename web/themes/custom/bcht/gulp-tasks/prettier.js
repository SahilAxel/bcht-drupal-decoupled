import prettier from 'gulp-prettier';

export default (gulp, config) => {
  gulp.task('prettier', () =>
    gulp
      .src([...config.scss.source, ...config.js.source])
      .pipe(prettier())
      .pipe(gulp.dest((file) => file.base)),
  );
};
