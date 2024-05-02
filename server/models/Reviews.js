const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
    name: String,
    datePosted: Date,
    tradesmanId: { type: mongoose.Schema.Types.ObjectId, ref: "Trademan" },
    overallRating: Number,
    featureRatings: {
      valueForMoney: Number,
      qualityOfWork: Number,
      communication: Number,
      timeliness: Number,
    },
    textReview: String,
    images: [String],
    postAnonymous: Boolean,
  });
  
  const Review = mongoose.model('Review', reviewSchema);
  module.exports = Review;
  