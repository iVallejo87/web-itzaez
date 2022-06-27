import gulp, { src, dest, task, watch, series, parallel } from 'gulp'
// PLUMBER
import plumber from 'gulp-plumber'
// HTML
import htmlmin from 'gulp-htmlmin'
// SASS
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import postcss from 'gulp-postcss'
import cleancss from 'gulp-clean-css';
import rename from 'gulp-rename'
import autoprefixer from 'autoprefixer'
import sourcemaps from 'gulp-sourcemaps'
const sass = gulpSass(dartSass);
// JS
import babel from 'gulp-babel';
import terser from 'gulp-terser';
import concat from 'gulp-concat';
// BROWSERSYNC
import {init as server, stream, reload} from 'browser-sync'
// IMGAGES
import imagemin from 'gulp-imagemin'
// PRODUCTION
import gulpif from 'gulp-if';
import del from 'del';
import yargs from 'yargs'

const PRODUCTION = yargs.argv.prod;

const source = 'sources/'
const output = 'app/'

const paths = {
  html: {
    htmlFile: `${source}html/*.html`,
    dest: `${output}`
  },
  styles: {
    cssSources: `${source}css/*.css`,
    scss: `${source}scss/*.scss`,
    scssWatch: `${source}scss/**/*.scss`,
    dest: `${output}css`
  },
  js: {
    jsSources: `${source}js/src/*`,
    jsMain: `${source}js/main.js`,
    jsValidate: `${source}js/validate-form.js`,
    dest: `${output}js`
  },
  images: {
    files: `${source}images/*`,
    dest: `${output}img`
  },
  favicon: {
    files: `${source}favicon/*`,
    dest: `${output}favicon`
  },
  fonts: {
    files: `${source}webfonts/*`,
    dest: `${output}webfonts`
  },
  audio: {
    files: `${source}audio/*`,
    dest: `${output}audio`
  },
  video: {
    files: `${source}video/*`,
    dest: `${output}video`
  },
  mail: {
    files: `${source}mail-form/**`,
    dest: `${output}mail`
  },
  package: {
    src: 'app/**/*',
    dest: 'public/'
  }
}

task('cleanApp', () => del(['app']))

task('clean', () => del(['public']))

task('html', () => {
  return src(paths.html.htmlFile)
  .pipe(plumber())
  .pipe(htmlmin({
    collapseWhitespace: true,
    removeComments: true
  }))
  .pipe(rename('index.html'))
  .pipe(dest(paths.html.dest))
})

task('styles', () => {
  return src(paths.styles.scss)
  // .pipe(plumber())
  .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
  .pipe(gulpif(PRODUCTION, sass({outputStyle: "compressed"}), sass({outputStyle: "expanded"}).on('error', sass.logError)))
  // .pipe(sass({outputStyle: "compressed"}).on('error', sass.logError))
  .pipe(postcss([autoprefixer()]))
  .pipe(rename('styles.min.css'))
  // .pipe(gulpif(PRODUCTION, rename('styles.min.css', rename('styles.css'))))
  .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
  .pipe(dest(paths.styles.dest))
  .pipe(stream())
})

task('mainJs', () => {
  return(src(paths.js.jsMain))
  // .pipe(plumber())
  .pipe(babel())
  .pipe(terser())
  .pipe(rename('main.min.js'))
  .pipe(dest(paths.js.dest))

})

task('validateForm', () => {
  return(src(paths.js.jsValidate))
  .pipe(babel())
  .pipe(terser())
  .pipe(rename('validate-form.min.js'))
  .pipe(dest(paths.js.dest))

})

task('compileCss', () => {
  return src(paths.styles.cssSources)
  .pipe(concat('resources.min.css'))
  .pipe(cleancss({compatibility: 'ie8'}))
  .pipe(dest(paths.styles.dest))
})

task('compileJs', () => {
  return(src(paths.js.jsSources))
  .pipe(concat('resources.min.js'))
  .pipe(terser())
  .pipe(dest(paths.js.dest))
})

task('compileFonts', () => {
  return(src(paths.fonts.files))
  .pipe(dest(paths.fonts.dest))
})

task('compileAudio', () => {
  return(src(paths.audio.files))
  .pipe(dest(paths.audio.dest))
})

task('compileVideo', () => {
  return(src(paths.video.files))
  .pipe(dest(paths.video.dest))
})

task('img-minify', () => {
  return src(paths.images.files)
  // .pipe(gulpif(PRODUCTION, imagemin([imagemin.mozjpeg({quality: 75, progressive: true})],{verbose: true})))
  // .pipe(imagemin([
  //   imagemin.mozjpeg({quality: 75, progressive: true})
  // ], {
  //   verbose: true
  // }))
  .pipe(dest(paths.images.dest))
})

task('compileFavicon', () => {
  return(src(paths.favicon.files))
  .pipe(dest(paths.favicon.dest))
})

task('compileMail', () => {
  return(src(paths.mail.files))
  .pipe(dest(paths.mail.dest))
})

task('startServer', (done) => {
  server({
    server: 'app/',
    injectChanges: true,
    open: false
  })
  done();
})

task('watch', () => {
  watch(paths.html.htmlFile, series('html')).on('change', reload)
  watch(paths.styles.scssWatch, series('styles'))
  watch(paths.styles.cssSources, series('compileCss'))
  watch(paths.js.jsSources, series('compileJs'))
  watch(paths.js.jsMain, series('mainJs')).on('change', reload)
  watch(paths.images.files, series('img-minify'))
})

task('packaged', () => {
  return(src(paths.package.src))
  .pipe(dest(paths.package.dest))
})

task('default', series('cleanApp', parallel('html', 'styles', 'img-minify', 'mainJs', 'validateForm', 'compileCss', 'compileJs', 'compileFonts', 'compileAudio', 'compileVideo', 'compileFavicon', 'compileMail'), 'clean', 'startServer', 'watch'))

task('build', series('cleanApp', parallel('html', 'styles', 'img-minify', 'mainJs', 'validateForm', 'compileCss', 'compileJs', 'compileFonts', 'compileAudio', 'compileVideo', 'compileFavicon', 'compileMail')))

task('production', series('build', 'packaged'))