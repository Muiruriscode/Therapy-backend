const mongoose = require('mongoose')

const ConsultSchema = new mongoose.Schema({
  service: {
    type: String,
    default: 'individual',
  },
  client: {
    type: String,
    required: true,
  },
  help: {
    type: Array,
    default: [],
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'unanswered'],
    default: 'unanswered',
  },
  date: {
    type: String,
    required: [true, 'please enter consultation date'],
  },
})

module.exports = mongoose.model('Consult', ConsultSchema)
