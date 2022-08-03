const mongoose = require('mongoose')

const ConsultSchema = new mongoose.Schema({
  service: {
    type: String,
    default: 'individual',
  },
  help: {
    type: Array,
    default: [],
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    default: 'male',
  },
  date: {
    type: String,
    required: [true, 'please enter consultation date'],
  },
})

module.exports = mongoose.model('Consult', ConsultSchema)
