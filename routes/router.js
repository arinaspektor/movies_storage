const { Router } = require("express");
const { check } = require('express-validator');

const router = Router();
const MovieController = require("../controllers/movie");

router.get(
    '/movies',
    [
        body('name')
            .trim()
            .isLength({ min: 3 }),
    ],
    MovieController.fetchAll
);

router.post('/movie', MovieController.addNew);

module.exports = router;