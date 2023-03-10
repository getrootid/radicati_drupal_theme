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


// In the child theme, change the default localServerUrl to match the current project!
if (fs.existsSync("./gulpfile.local.json")) {
  config = Object.assign(config, require("./gulpfile.local.json"));
} else {
  config.localServerUrl = "https://example-site.lndo.site/";
}

/**
 * Browsersync reload function that announces it's done
 * so the sync function doesn't hang
 */
function browserSyncReload(done) {
  browserSync.reload();
  done();
}

/**
 * Clear Drupal cache
 */
function clearcache() {
  return spawn("drush", ["cache-rebuild"], { stdio: "inherit" });
}

/**
 * Clear Lando Drupal cache
 */
function clearLandoCache() {
  return exec("lando drush cr", function cb(err, stdout, stderr) {
    console.log(stdout); // outputs the normal messages
    console.log(stderr); // outputs the error messages
  });
}


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


/**
 * Initialize browser sync with lando drupal site, compile
 * scss on change, clear drush cache on change, reload
 * browser sync
 */
function landoDrupalServe() {
  browserSync.init({
    open: false,
    proxy: config.localServerUrl,
  });
  gulp.watch("./patterns/**/*.scss", css);
  gulp.watch(
    [
      "./patterns/**/*.twig",
      "./templates/**/*.twig",
      "./*.theme",
      "./*.libraries.yml",
      "./*.info.yml",
      "../../../modules/custom/**/*.twig",
      "../../../modules/custom/**/*.yml",
      "../../../modules/custom/**/*.module",
    ],
    gulp.series(clearLandoCache, browserSyncReload)
  );
}

exports.css = css;
exports.styles = css;
exports.watch = watch;
// exports.serve = landoDrupalServe;

exports.default = watch;
