const fs = require("fs");
const path = require("path");

const { getMoviesFromBuffer } = require("../../middleware/helpers/functions");

const data = fs.readFileSync(path.dirname(__dirname) + "/files/valid_sample.txt");
const buffer = Buffer.from(data);

const movies = getMoviesFromBuffer(buffer);

module.exports = movies;