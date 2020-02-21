const { validationResult } = require('express-validator/check');

const Movie = require("../models/Movie");

module.exports = {

    fetchAll: (req, res, next) => {
        Movie.find({}, (err, movies) => {
            //add pagination
            if (err) {
                return next(err);
            }
            res.json({ message: 'Fetched posts successfully.', movies });
        })
    },

    addNew: (req, res, next) => {
        const { name, year, format, actors } = req.body;

        
    }

}