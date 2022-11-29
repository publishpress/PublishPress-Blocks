const gulp  = require("gulp");
const zip   = require("gulp-zip");

function bundle() {
    return gulp.src([
        "src/**",
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
        "!webpack.config.js",
        "!src/composer.json",
        "!src/composer.lock",
        "!src/assets/**/*.jsx",
        "!src/assets/scss/**",
        "!src/assets/js/main.js",
        "!src/assets/js/settings.js",
    ])
    .pipe(zip('advanced-gutenberg.zip'))
    .pipe(gulp.dest("bundled"));
}

exports.bundle = bundle;
