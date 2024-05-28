export default (gulp, config) => {
  gulp.task('watch:scss', () => {
    gulp.watch(
      ...config.scss.all,
      gulp.series('lint:scss', 'scss'),
    );
  });

  gulp.task('watch:js', () => {
    gulp.watch(
      ...config.js.source,
      gulp.series('lint:js', 'js'),
    );
  });

  gulp.task('watch', gulp.series('default', gulp.parallel('watch:scss', 'watch:js')));
};
