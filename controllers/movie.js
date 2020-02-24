const { validationResult } = require('express-validator');

const Movie = require("../models/Movie");

module.exports = {

    getAllMovies: (req, res, next) => {
        const offset = +req.query.offset || 0;
        const limit = +req.query.limit || 20;
        const searchTitle = req.query.title;
        const searchName = req.query.name;

        let toFind =    searchTitle ? { title: searchTitle } :
                        searchName ? { actors: { "$in": [searchName] }} : {};

        Movie
            .find(toFind)
            .sort({
                title: 1
            })
            .skip(offset)
            .limit(limit)
            .exec((err, movies) => {
                if (err) {
                    return next(err);
                }
                res.json({
                    message: "Movies fetched.",
                    movies
                });
            });
    },

    addOne: async (req, res, next) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Invalid data."
                });
            }
            const data = req.body;

            const movie = new Movie(data);
            await movie.save();

            res.status(201).json({
                message: "Movie added successfully."
            });
        } catch (err) {
            next(err);
        }
    },

    addMany: async (req, res, next) => {
        try {
            const { movies } = req.body;

            if (typeof movies === "undefined" || !movies.length) {
                return res.status(400).json({
                    message: "Invalid file."
                });
            }

            await Movie.insertMany(movies);
            res.status(201).json({ message: "Movies added successfully.", movies });
        } catch(err) {
            next(err);
        }
    },

    deleteMovie: async (req, res, next) => {
        try {
            await Movie.findByIdAndDelete({_id: req.params.movieId});
            res.json({ message: "Movie deleted successfully." });
        } catch (err) {
            res.status(404).json({ message: "Could not find movie." });
        }
    }
}