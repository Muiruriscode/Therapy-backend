const { StatusCodes } = require('http-status-codes')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
  CustomAPIError,
} = require('../errors')

const login = async (req, res) => {
  const { password, email } = req.body
  console.log(password)
  if (!email || !password) {
    return BadRequestError('Please provide email and password')
  }

  const user = await User.findOne({ email })
  console.log(user.password)

  if (!user) {
    return UnauthenticatedError('Invalid credentials')
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password)

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid credentials')
  }
  if (!user.isVerified) {
    throw new UnauthenticatedError('Please verify your email')
  }
  const token = user.createJWT()

  return res.status(StatusCodes.OK).json({
    username: user.username,
    id: user._id,
    token,
    email: user.email,
    isAdmin: user.isAdmin,
  })
}

module.exports = login
