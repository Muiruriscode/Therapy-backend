const mongoose = require('mongoose')

const Conversationschema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
    },
    conversation: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Conversation', Conversationschema)
