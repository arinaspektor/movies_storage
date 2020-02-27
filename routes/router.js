const { Router } = require("express");
const { check } = require("express-validator");

const MovieController = require("../controllers/movie");
const upload = require("../middleware/multer");
const { fileIsProvided, getDataFromFile } = require("../middleware/fileHandler");

const router = Router();

router.get('/movies', MovieController.getAllMovies);

router.post(
    '/movie',
    [
        check('title', 'Enter movie title')
            .isString()
            .trim()
            .not().isEmpty(),
        check('year', 'Enter valid release year').isInt({ min: 1896, max: new Date().getYear() + 1900}),
        check('format', 'Choose a valid format: only VHS, DVD and Blu-Ray are allowed)')
            .isString()
            .trim()
            .isIn(['VHS', 'DVD', 'Blu-Ray']),
        check('actors', 'Invalid list of actors: must consist of first and lastnames)')
            .isArray()
            .custom(arr => arr.every(el => typeof el === "string" && el.split(' ').length > 1))
    ],
    MovieController.addOne
);


router.post('/upload', upload, fileIsProvided, getDataFromFile, MovieController.addMany);

router.delete('/movie/:movieId', MovieController.deleteMovie);

module.exports = router;