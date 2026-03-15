import gulp from 'gulp';
import path from 'path';
import pug from 'gulp-pug';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import concat from 'gulp-concat';
import insert from 'gulp-insert';
import browserSyncPkg from 'browser-sync';
import {deleteAsync} from 'del';
import { exec } from 'child_process';
import through from 'through2';

const sass = gulpSass(dartSass);
const browserSync = browserSyncPkg.create();

/* ================= helpers ================= */

const run = cmd =>
  new Promise((res, rej) =>
    exec(cmd, (err, stdout, stderr) => {
      if (err) return rej(stderr || err);
      res(stdout);
    })
  );

const reload = done => {
  browserSync.reload();
  done();
};

/**
 * Извлекает имя страницы из пути файла
 */
const getPageName = (filePath) => {
  const match = filePath.match(/src\/pages\/([^/]+)\/\1\.(scss|js)$/);
  if (match) {
    return match[1];
  }
  return null;
};

/**
 * Плагин для разделения файлов по страницам
 */
const splitByPages = (destBase) => {
  return through.obj(function (file, enc, cb) {
    const pageName = getPageName(file.path);
    if (pageName) {
      file.path = path.join(file.base, destBase, pageName, path.basename(file.path));
    }
    this.push(file);
    cb();
  });
};

/* ================= clean ================= */

export const cleanDist = () => {
  return deleteAsync(['dist']);
};

/* ================= public ================= */

export const copy = () =>
  gulp.src('src/public/**/*', {encoding: false})
    .pipe(gulp.dest('dist'));

/* ================= pug ================= */

export const html = () =>
  gulp.src('src/pages/**/*.pug')
    .pipe(
      pug({
        pretty: true,
        basedir: path.join(process.cwd(), 'src'),
      })
    )
    .pipe(rename({dirname: '', extname: '.html'}))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());

/* ================= styles ================= */

// Базовые стили приложения (переменные, шрифты, типографика)
export const stylesApp = () =>
  gulp.src('src/app/scss/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('app.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());

// Стили страниц (каждая страница в отдельный файл)
export const stylesPages = () =>
  gulp.src('src/pages/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(splitByPages(''))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());

export const styles = gulp.parallel(stylesApp, stylesPages);

/* ================= scripts ================= */

// Базовые скрипты приложения
export const scriptsApp = () =>
  gulp.src([
    'src/app/js/*.js',
    'src/blocks/**/*.js',
    'src/components/**/*.js',
  ])
    .pipe(concat('app.js'))
    .pipe(insert.prepend(
      `document.addEventListener('DOMContentLoaded', function () {\n`
    ))
    .pipe(insert.append(
      `\n});`
    ))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());

// Скрипты страниц (каждая страница в отдельный файл)
export const scriptsPages = () =>
  gulp.src('src/pages/**/*.js')
    .pipe(splitByPages(''))
    .pipe(insert.prepend(
      `document.addEventListener('DOMContentLoaded', function () {\n`
    ))
    .pipe(insert.append(
      `\n});`
    ))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());

export const scripts = gulp.parallel(scriptsApp, scriptsPages);

/* ================= serve ================= */

export const serve = () => {
  browserSync.init({
    server: {
      baseDir: 'dist',
      serveStatic: ['dist']
    },
    notify: false,
    open: false
  });

  gulp.watch([
    'src/app/**/*.pug',
    'src/components/**/*.pug',
    'src/blocks/**/*.pug',
    'src/pages/**/*.pug'
  ], html);
  gulp.watch([
    'src/app/**/*.scss',
    'src/components/**/*.scss',
    'src/blocks/**/*.scss',
    'src/pages/**/*.scss'
  ], styles);
  gulp.watch([
    'src/app/**/*.js',
    'src/components/**/*.js',
    'src/blocks/**/*.js',
    'src/pages/**/*.js'
  ], scripts);
  gulp.watch('src/public/**/*', copy);

  gulp.watch(
    ['src/sprite/sprite.svg', 'src/data/**/*'],
    gulp.series(html, reload)
  );
};


/* ================= build ================= */

export const build = gulp.series(
  cleanDist,
  copy,
  gulp.parallel(html, styles, scripts)
);

export default gulp.series(build, serve);
