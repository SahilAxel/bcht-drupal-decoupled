export default {
  scss: {
    source: ['src/scss/**/[^_]*.scss'],
    all: ['src/scss/**/*.scss'],
    destination: 'build/css',
    options: {
      outputStyle: 'expanded',
      includePaths: ['./node_modules'],
      errLogToConsole: true,
    },
  },
  js: {
    source: ['src/js/**/*.js'],
    destination: 'build/js',
  },
  svg: {
    source: ['svg/**/*.svg'],
    destination: 'build/svg',
  },
  images: {
    source: ['images/**/*'],
    destination: 'build/images',
  },
  stylelint: {
    options: {
      reporters: [
        {
          formatter: 'verbose',
          console: true,
        },
      ],
      failOnError: process.env.CI === 'true',
    },
  },
};
