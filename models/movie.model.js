const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: { type: String, required: true },
  yearReleased: { type: Date, required: true },
  genre: { type: String, required: true },
  actors: [{actorName: {type: String, required: true}, characterName: {type: String, required: true}}]
}, {
  timestamps: true,
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;