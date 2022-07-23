const { StatusCodes } = require('http-status-codes')
const User = require('../models/user')
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require('../errors')

const login = async (req, res, next) => {
  const { password, email } = req.body
  if (!email || !password) {
    return BadRequestError('Please provide email and password')
  }

  const user = await User.findOne({ email })

  if (!user) {
    return UnauthenticatedError('Invalid credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid credentials')
  }
  const token = user.createJWT()
  return res
    .status(StatusCodes.OK)
    .json({ user: user.username, id: user._id, token })
}

module.exports = login
