const gulp = require("gulp"),
    babel = require("gulp-babel"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    browserSync = require("browser-sync").create(),
    lintCheck = require("gulp-eslint"),
    sass = require("gulp-sass")(require("sass")),
    autoprefixer = require("gulp-autoprefixer"),
    prettyError = require("gulp-prettyerror"),
    minify = require("gulp-clean-css"),
    changed = require("gulp-changed"),
    changedIP = require("gulp-changed-in-place");

const input = "./js/src/*.js",
    output = "./build/js",
    css_input = "./styles/*.css",
    sass_input = "./styles/sass/*.scss",
    css_output = "./build/css",
    sass_output = "./styles",
    fcc_styles = "./fcc/**/*",
    fcc_scripts = "./fcc/**/*.js",
    fcc_output = "./"

gulp.task("babel", async () => {
    return gulp
        .src(input)
        .pipe(babel())
        .pipe(gulp.dest(output))
})

gulp.task("fcc_babel", async () => {
    return gulp
        .src(input)
        .pipe(babel())
        .pipe(gulp.dest(fcc_scripts))
})

gulp.task("lint", async () => {
    return gulp
        .src(input)
        .pipe(lintCheck())
        .pipe(lintCheck.format())
        .pipe(lintCheck.failAfterError())
        .on('error', function(err) {
            console.error(err)

            this.emit('end')
        })
})

gulp.task("fcc_lint", async () => {
    return gulp
        .src([fcc_scripts, "!fcc/**/*.min.js"])
        .pipe(lintCheck())
        .pipe(lintCheck.format())
        .pipe(lintCheck.failAfterError())
        .on('error', function(err) {
            console.error(err)

            this.emit('end')
        })
})

gulp.task("scripts", gulp.series("lint", async () => {
    return gulp
        .src(input)
        .pipe(changed(output))
        .pipe(
            babel({
                presets: ["@babel/preset-env"]
            })
        )
        .on("error", function(err) {
            console.log(err)

            this.emit('end')
        })
        .pipe(uglify())
        .on("error", function(err) {
            console.log(err)

            this.emit('end')
        })
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(gulp.dest(output))
}))

gulp.task("fcc_scripts", gulp.series("fcc_lint", async () => {
    return gulp
        .src([fcc_scripts, "!fcc/**/*.min.js"], {base: "./"})
        .pipe(
            babel({
                presets: ["@babel/preset-env"]
            })
        )
        .on("error", function(err) {
            console.log(err)

            this.emit('end')
        })
        .pipe(uglify())
        .on("error", function(err) {
            console.log(err)

            this.emit('end')
        })
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(gulp.dest(fcc_output))
}))

gulp.task("hi", () => {
    console.log("Hello World!")
})

gulp.task("watch", async () => {
    gulp.watch("./js/src/*.js", gulp.parallel("scripts"))
    gulp.watch(["./fcc/**/*.js", "!./fcc/**/*.min.js"], gulp.parallel("fcc_scripts"))
    gulp.watch("./styles/sass/*.scss", gulp.parallel("sass"))
    gulp.watch(["./fcc/**/*.scss", "!./fcc/**/*.min.css"], gulp.parallel("fcc_scss"))
    gulp.watch("./styles/*.css", gulp.parallel("css"))
    gulp.watch(["./fcc/**/*.css", "!./fcc/**/*.min.css"], gulp.parallel("fcc_css"))
})

gulp.task("css", async () => {
    return gulp
        .src(css_input)
        .pipe(changed(css_output))
        .pipe(prettyError())
        .pipe(sass())
        .pipe(
            autoprefixer()
        )
        .pipe(gulp.dest(css_output))
        .pipe(minify())
        .pipe(rename({
                extname: ".min.css"
            })
        )
        .pipe(gulp.dest(css_output))
})

gulp.task("fcc_css", async () => {
    return gulp
        .src([fcc_styles + ".css", `!fcc/**/styles/*.min.css`], {base: "./"})
        .pipe(prettyError())
        .pipe(sass())
        .pipe(
            autoprefixer()
        )
        .pipe(minify())
        .on("error", err=>console.log(err))
        .pipe(rename({
                extname: ".min.css"
            })
        )
        .pipe(gulp.dest(fcc_output))
})

gulp.task("sass", async () => {
    return gulp
        .src(sass_input)
        .pipe(changed(sass_output))
        .pipe(prettyError())
        .pipe(sass())
        .pipe(
            autoprefixer()
        )
        .pipe(gulp.dest(sass_output))
})

gulp.task("fcc_scss", async () => {
    return gulp
        .src(fcc_styles + ".scss", {base: "./"})
        .pipe(prettyError())
        .pipe(sass())
        .pipe(
            autoprefixer()
        )
        .pipe(gulp.dest(fcc_output))
})

gulp.task("sass_test", async () => {
    return gulp
        .src(css_input)
        .pipe(
            autoprefixer()
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

gulp.task("browser-sync", async () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
    return gulp
        .watch(["build/js/*.js", "build/css/*.min.css", "*.html", "fcc/**/*.min.css", "fcc/**/*.min.js"])
        .on("change", browserSync.reload)
    //gulp.watch('./styles/*.css').on('change', browserSync.reload)
})

gulp.task("default", gulp.parallel("watch", "browser-sync"))
