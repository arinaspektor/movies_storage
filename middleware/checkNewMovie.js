const { validationResult } = require('express-validator');

const Movie = require('../models/Movie');

module.exports = {
  checkValidationResults: (req, res, next) => {
    const errors = validationResult(req);
           
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            message: "Invalid data."
        });
    }

    next();
  },

  checkOneIfUnique: async (req, res, next) => {
    try {
      const { title, year, format, actors } = req.body;

      const movie = await Movie.findOne({ title, year, format, actors: {$all: actors} });

      if(movie) {
        return res.status(400).json({ message: "Movie already exists. Add another one." })
      }
      next();
    } catch (err) {
      res.status(500).json({message: "Database connection failed."})
    }
  },

  checkManyIfUnique: async (req, res, next) => {
    try {
      const { movies } = req.body;
      const checked = [];

      for (let i = 0; i < movies.length; i++) {
        const { title, year, format, actors } = movies[i];

        const found = await Movie.findOne({ title, year, format, actors: { $all: actors } });
        if (!found) {
          checked.push(movies[i]);
        }
      }

      if (movies.length && !checked.length) {
        return res.status(400).json({ message: 'All movies from the file already exist.'} );
      }

      req.body.movies = checked;

      next();
    } catch (err) {

    }
  }
}