const gulp = require("gulp");
require("./build");

gulp.task("default", gulp.series("build"));
