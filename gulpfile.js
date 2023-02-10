/*jshint esversion: 6 */

const { clearConfigCache } = require("prettier");

/**
 * Please note that this gulpfile and package.json are set up
 * for Node 16. If you're having problems, check your node version.
 */

const exec = require("child_process").exec,
  autoprefixer = require("gulp-autoprefixer"),
  fs = require("fs"),
  gulp = require("gulp"),
  $ = require("gulp-load-plugins"),
  minify = require("gulp-minify"),
  sass = require("gulp-sass")(require("sass")),
  sassGlob = require("gulp-sass-glob"),
  rename = require("gulp-rename"),
  sourcemaps = require("gulp-sourcemaps");

var config = {
  assetPath: "./assets",
  distPath: "./dist",
  drupalTemplates: "./templates",
  componentSrc: "../../modules/radicati/rexe/components/**/*.scss",
  componentDest: "../../modules/radicati/rexe/components",
};

/**
 * Compile pattern library scss
 */
function css() {
  return (
    gulp
      .src([
        "./assets/styles/styles.scss",
      ])
      .pipe(
        sassGlob({
          // ignorePaths: [
          //   "**/_!*",
          //   "**/_!*/**"
          // ]
        })
      )
      //.pipe(sourcemaps.init())
      .pipe(
        sass({
          includePaths: ["./assets/styles"],
          outputStyle: "compressed",
        }).on("error", sass.logError)
      )
      //.pipe(sourcemaps.write())
      .pipe(autoprefixer())
      .pipe(gulp.dest(config.distPath + "/css"))
  );
}

/**
 * Watch for changes in scss and js files and compile on
 * save, watch for changes in twig files and theme file and
 * drush cc.
 */
function watch() {
  gulp.watch("./assets/styles/**/*.scss", css);
}

exports.css = css;
exports.styles = css;
exports.watch = watch;

exports.default = watch;
