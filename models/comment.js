const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  author: {
    type: String,
    required: [true, 'No author'],
  },
  comment: {
    type: String,
    required: [true, 'please add a comment'],
  },
  email: {
    type: String,
    required: [true, 'please add you email'],
  },
})

module.exports = mongoose.model('Comment', CommentSchema)
