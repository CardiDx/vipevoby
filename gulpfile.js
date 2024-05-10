let { src, dest } = require("gulp"),
  gulp = require("gulp"),
  browsersync = require("browser-sync").create(),
  fileinclude = require("gulp-file-include"),
  del = require("del"),
  scss = require("gulp-sass")(require("sass")),
  autoprefixer = require("gulp-autoprefixer"),
  group_media = require("gulp-group-css-media-queries"),
  clean_css = require("gulp-clean-css"),
  rename = require("gulp-rename"),
  uglify = require("gulp-uglify-es").default,
  imagemin = require("gulp-imagemin");

// CSS
function css() {
  // return src('./scss/**/*.scss')
  return src("./scss/main.scss")
    .pipe(
      scss({
        outputStyle: "expanded",
      })
    )
    .pipe(group_media())
    .pipe(
      autoprefixer({
        cascade: true,
        overrideBrowserslist: ["last 5 versions"],
      })
    )
    .pipe(dest("./css/"))
    .pipe(clean_css())
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(dest("./css/"));
}

// Serve
function serve(params) {
  browsersync.init({
    server: {
      baseDir: "./",
    },
    port: 3000,
    notify: false,
  });

  browsersync.watch("./**/*.html").on("change", browsersync.reload);
  // browsersync.watch('./**/*.php').on('change', browsersync.reload);
  browsersync
    .watch("./scss/**/*.scss")
    .on("change", gulp.parallel(css, browsersync.reload));
  browsersync.watch("./scss/**/*.scss").on("change", gulp.parallel(css));
}

exports.css = css;
exports.serve = serve;
exports.default = serve;
