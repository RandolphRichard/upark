const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
    username: {
        type: String
    },
    overallRating: {
        type: String,
      },
      coordinates: {
        type: String,
      },
      handicapAccessible: {
          type: String
      },
      parkingSpot: {
          type: String,
      },
      keys: {
          type: String,
      },
      comment: {
          type: String,
      }
})

const Review = new model('Review', reviewSchema)

module.exports = Review;