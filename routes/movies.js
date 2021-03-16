const router = require('express').Router();
let Movie = require('../models/movie.model');
var authJwtController = require('./auth_jwt.js');

router.route('/').get(authJwtController.isAuthenticated, (req, res) => {
    Movie.find()
        .then(movies => res.json(movies))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post(authJwtController.isAuthenticated, (req, res) => {
    const title = req.body.title;
    const yearReleased = req.body.yearReleased;
    const genre = req.body.genre;
    const actors =  req.body.actors;

    const newMovie = new Movie({
        title,
        yearReleased,
        genre,
        actors
    });
    newMovie.save()
        .then(() => res.json('Movie added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:title').get(authJwtController.isAuthenticated, (req, res) => {
    Movie.find({title: req.params.title})
        .then(movie => res.json(movie))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').delete(authJwtController.isAuthenticated, (req, res) => {
    Movie.deleteOne({title: req.body.title})
        .then(() => res.json('Movie deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').put(authJwtController.isAuthenticated, (req, res) => {
    Movie.find({title: req.body.title})
        .then(movie => {
            newMovie = new Movie({
                title: req.body.title,
                yearReleased: req.body.yearReleased,
                genre: req.body.genre,
                actors: req.body.actors
            });
            newMovie.save()
                .then(() => res.json('Movie updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
            Movie.deleteOne({title: req.body.title})
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;