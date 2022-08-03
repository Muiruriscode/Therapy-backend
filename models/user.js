const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'please enter your username'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'please enter your email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'please enter your password'],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    verified: Date,
    passwordToken: {
      type: String,
    },
    passwordTokenExpirationDate: {
      type: Date,
    },
  },
  { timestamps: true }
)

// UserSchema.pre('save', async function () {
//   const salt = await bcrypt.genSalt(10)
//   this.password = await bcrypt.hash(this.password, salt)
// })

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    process.env.JWT_TOKEN,
    { expiresIn: process.env.EXPIRES_IN }
  )
}

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password)
  return isMatch
}

module.exports = mongoose.model('User', UserSchema)
