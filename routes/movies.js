const router = require('express').Router();
let Movie = require('../models/movie.model');

router.route('/').get((req, res) => {
    Movie.find()
        .then(movies => res.json(movies))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
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

router.route('/:id').get((req, res) => {
    Movie.findById(req.params.id)
        .then(movie => res.json(movie))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Movie.findByIdAndDelete(req.params.id)
        .then(() => res.json('Movie deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Movie.findById(req.params.id)
        .then(movie => {
            movie.title = req.body.title;
            movie.yearReleased = req.body.yearReleased;
            movie.genre = req.body.genre;
            movie.actors = req.body.actors;

            movie.save()
                .then(() => res.json('Movie updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;