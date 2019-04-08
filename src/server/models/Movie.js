const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
  movie: String,
  title: String,
  year: Number,
  cast: String,
  genres: String,
  image: String
});

module.exports = mongoose.model('Movie', MovieSchema);
