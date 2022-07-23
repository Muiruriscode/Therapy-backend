const mongoose = require('mongoose')

const Reviewschema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: [true, 'please send a review'],
    },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Review', Reviewschema)
