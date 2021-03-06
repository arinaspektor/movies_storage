const Movie = require("../models/Movie");

module.exports = {

    getAllMovies: async (req, res, next) => {
        try {
            const offset = +req.query.offset || 0;
            const limit = +req.query.limit || 10;
            const searchTitle = req.query.title;
            const searchName = req.query.name;

            const toFind =    searchTitle ? { title: { $regex: new RegExp(searchTitle , "i") }} :
                            searchName ? { actors: { "$in": [new RegExp(searchName , "i")] }} : {};

            const count = await Movie.countDocuments(toFind);
            const movies = await Movie.find(toFind).collation({ locale: "en" }).sort({ title: 1 }).skip(offset).limit(limit);
           
            if (!movies) {
                return next(err);
            }
    
            res.json({
                message: "Movies fetched.",
                movies,
                count
            });
        } catch(err) {
            res.status(400).json({message: "Invalid data"});
        }
    },

    addOne: async (req, res, next) => {
        try {
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
           
            if (typeof movies === "undefined" || ! movies.length) {
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