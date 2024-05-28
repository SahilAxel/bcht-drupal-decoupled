import gulp from 'gulp';
import config from './gulp-tasks/config.js';

import clean from './gulp-tasks/clean.js';
import scss from './gulp-tasks/scss.js';
import js from './gulp-tasks/js.js'
import svg from './gulp-tasks/svg.js';
import pretty from './gulp-tasks/prettier.js';
import lint from './gulp-tasks/lint.js';
import defaulttask from './gulp-tasks/default.js';
import images from './gulp-tasks/images.js';
import watch from './gulp-tasks/watch.js';

scss(gulp, config);
js(gulp, config);
svg(gulp, config);
pretty(gulp, config);
images(gulp, config);
clean(gulp, config);
lint(gulp, config);
defaulttask(gulp, config);
watch(gulp, config);
