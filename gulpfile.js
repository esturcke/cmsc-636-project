const gulp  = require("gulp")
const shell = require("gulp-shell")

const MONGO_DATA = "./rest-api/data/"

gulp.task("mongo-start", shell.task([
  `mkdir -p ${MONGO_DATA}`,
  `mongod --bind_ip localhost --dbpath ${MONGO_DATA} --quiet`,
]))
