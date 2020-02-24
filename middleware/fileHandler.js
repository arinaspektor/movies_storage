const { getMoviesFromBuffer } = require("./helpers/functions");

module.exports = {
  fileIsProvided: (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ message: 'Choose some txt file to upload.'});
    }
    next();
  },

  getDataFromFile: (req, res, next) => {
    const { buffer } = req.file;

    if (!req.body) {
      req.body = {};
    }
    req.body.movies = getMoviesFromBuffer(buffer);

    next();
  }
}