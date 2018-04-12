const gulp = require("gulp"),
    babel = require("gulp-babel"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    browserSync = require("browser-sync").create(),
    lintCheck = require("gulp-eslint"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    prettyError = require("gulp-prettyerror"),
    cssnano = require("gulp-cssnano")

const input = "./js/src/*.js",
    output = "./build/js"

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

gulp.task("scripts", ["lint"], () => {
    gulp
        .src(input)
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
        .pipe(gulp.dest("./build/js"))
})

gulp.task("hi", () => {
    console.log("Hello World!")
})

gulp.task("watch", () => {
    gulp.watch("./js/src/*.js", ["scripts"])
    gulp.watch("./styles/*.css", ["sass"])
})

gulp.task("sass", () => {
    gulp
        .src("./styles/style.css")
        .pipe(prettyError())
        .pipe(sass())
        .pipe(
            autoprefixer({
                browsers: ["last 2 versions"]
            })
        )
        .pipe(gulp.dest("./build/css"))
        .pipe(cssnano())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("./build/css"))
})

gulp.task("browser-sync", () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
    gulp
        .watch(["build/js/*.js", "build/css/*.min.css", "index.html"])
        .on("change", browserSync.reload)
    //gulp.watch('./styles/*.css').on('change', browserSync.reload)
})

gulp.task("default", ["watch", "browser-sync"])
