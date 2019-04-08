const Review = require('../models/Review.js');
const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema({
  name: String,
  rating: Number,
  review: String,
  movie_id : { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }
});

module.exports = mongoose.model('Review', ReviewSchema);
