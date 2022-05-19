import gulp, { src, dest, task, watch, series, parallel } from 'gulp'
// PLUMBER
import plumber from 'gulp-plumber'
// HTML
import htmlmin from 'gulp-htmlmin'
// SASS
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import postcss from 'gulp-postcss'
import rename from 'gulp-rename'
import autoprefixer from 'autoprefixer'
import sourcemaps from 'gulp-sourcemaps'
const sass = gulpSass(dartSass);
// BROWSERSYNC
import {init as server, stream, reload} from 'browser-sync'
// IMGAGES
import imagemin from 'gulp-imagemin'

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
  // js: {
    //   jsSources: ['src/assets/js/src/*.js'],
    //   jsMain: 'src/assets/js/main.js',
    //   dest: `${output}js`
    // },
    images: {
      files: `${source}images/*`,
      dest: `${output}img`
    },
    // fonts: {
  //   files: 'src/assets/fonts/**',
  //   dest: `${output}fonts`
  // },
  // package: {
  //   src: ['**/*', '!node_modules{,/**}', '!public{,/**}', '!src{,/**}', '!.babelrc', '!.browserslistrc', '!.gitignore', '!gulpfile.babel.js', '!package-lock.json', '!package.json'],
  //   dest: 'public/'
  // }
}

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
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: "compressed"}).on('error', sass.logError))
  .pipe(postcss([autoprefixer()]))
  .pipe(rename('styles.min.css'))
  .pipe(sourcemaps.write())
  .pipe(dest(paths.styles.dest))
  .pipe(stream())
})

task('img-minify', () => {
  return src(paths.images.files)
  .pipe(imagemin([
    imagemin.mozjpeg({quality: 75, progressive: true})
  ], {
    verbose: true
  }))
  .pipe(dest(paths.images.dest))
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
  // watch(paths.styles.cssSources, series('compileCss'))
  // watch(paths.js.jsSources, series('compileJs'))
  // watch(paths.js.jsMain, series('mainJs')).on('change', reload)
  watch(paths.images.files, series('img-minify'))
  // watch(paths.fonts.files, series('compileFonts'))
})

// task('packaged', () => {
//   return(src(paths.package.src))
//   .pipe(zip('playas-nicaragua.zip'))
//   .pipe(dest(paths.package.dest))
// })

task('default', series('startServer', parallel('html', 'styles', 'img-minify'), 'watch'))

// task('package', series('packaged'))