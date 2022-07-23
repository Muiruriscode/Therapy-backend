const mongoose = require('mongoose')

const Messageschema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: [true, 'please send a text'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Message', Messageschema)
