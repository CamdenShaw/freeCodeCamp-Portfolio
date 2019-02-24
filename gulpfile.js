const gulp = require("gulp"),
    babel = require("gulp-babel"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    browserSync = require("browser-sync").create(),
    lintCheck = require("gulp-eslint"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    prettyError = require("gulp-prettyerror"),
    cssnano = require("gulp-cssnano"),
    changed = require("gulp-changed");

const input = "./js/src/*.js",
    output = "./build/js",
    css_input = "./styles/*.css",
    sass_input = "./styles/sass/*.scss",
    css_output = "./build/css",
    sass_output = "./styles"

gulp.task("babel", () => {
    return gulp
        .src(input)
        .pipe(babel())
        .pipe(gulp.dest(output))
})

gulp.task("lint", () => {
    return gulp
        .src(input)
        .pipe(lintCheck())
        .pipe(lintCheck.format())
        .pipe(lintCheck.failAfterError())
})

gulp.task("scripts", gulp.series("lint", () => {
    return gulp
        .src(input)
        .pipe(changed(output))
        .pipe(
            babel({
                presets: ["es2017"]
            })
        )
        .pipe(uglify())
        .on("error", err => {
            console.log(err)
        })
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(gulp.dest(output))
}))

gulp.task("hi", () => {
    console.log("Hello World!")
})

gulp.task("watch", () => {
    gulp.watch("./js/src/*.js", gulp.parallel("scripts"))
    gulp.watch("./styles/sass/*.scss", gulp.parallel("sass"))
    gulp.watch("./styles/*.css", gulp.parallel("css"))
})

gulp.task("css", () => {
    return gulp
        .src(css_input)
        .pipe(changed(css_output))
        .pipe(prettyError())
        .pipe(sass())
        .pipe(
            autoprefixer({
                browsers: ["last 2 versions"]
            })
        )
        .pipe(gulp.dest(css_output))
        .pipe(cssnano())
        .pipe(rename({
                extname: ".min.css"
            })
        )
        .pipe(gulp.dest(css_output))
})

gulp.task("sass", () => {
    return gulp
        .src(sass_input)
        .pipe(changed(sass_output))
        .pipe(prettyError())
        .pipe(sass())
        .pipe(
            autoprefixer({
                browsers: ["last 2 versions"]
            })
        )
        .pipe(gulp.dest(sass_output))
})

gulp.task("sass_test", () => {
    return gulp
        .src(css_input)
        .pipe(
            autoprefixer({
                browsers: ["last 2 versions"]
            })
        )
        .pipe(sass())
        .on("error", err => {
            console.log(err)
        })
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(gulp.dest("./build/css"))
})

gulp.task("browser-sync", () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
    return gulp
        .watch(["build/js/*.js", "build/css/*.min.css", "*.html"])
        .on("change", browserSync.reload)
    //gulp.watch('./styles/*.css').on('change', browserSync.reload)
})

gulp.task("default", gulp.parallel("watch", "browser-sync"))
