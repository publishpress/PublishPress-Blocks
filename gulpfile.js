const gulp  = require("gulp");
const zip   = require("gulp-zip");

function bundle() {
    return gulp.src([
        "**",
        "!.git/**",
        "!.idea/**",
        "!bundled/**",
        "!node_modules/**",
        "!vendor/**",
        "!.babelrc",
        "!.DS_Store",
        "!.gitignore",
        "!gulpfile.js",
        "!package-lock.json",
        "!package.json",
        "!README.md",
        "!report.csv",
        "!webpack.config.js",
        "!composer.json",
        "!composer.lock",
        "!assets/**/*.jsx",
        "!assets/scss/**",
        "!assets/js/main.js",
        "!assets/js/settings.js",
        "!json_translations.sh",
        "!json_translations.sh.dist"
    ])
    .pipe(zip('advanced-gutenberg.zip'))
    .pipe(gulp.dest("bundled"));
}

exports.bundle = bundle;
