const User = require('../models/user')
const crypto = require('crypto')
const { StatusCodes } = require('http-status-codes')
const bcrypt = require('bcryptjs')
const origin = require('../config')

const sendVerificationEmail = require('../utils/sendVerificationEmail')
const sendResetPasswordEmail = require('../utils/sendResetPasswordEmail')
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

const register = async (req, res) => {
  const { email, username, password } = req.body

  const emailAlreadyExists = await User.findOne({ email })
  if (emailAlreadyExists) {
    throw new BadRequestError('Email already exists')
  }

  const verificationToken = crypto.randomBytes(40).toString('hex')

  const salt = await bcrypt.genSalt(10)
  hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    email,
    username,
    password: hashedPassword,
    verificationToken,
  })

  await sendVerificationEmail({
    username: user.username,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  })

  res
    .status(StatusCodes.CREATED)
    .json({ msg: 'Success! Please check your email to verify account' })
}

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    throw new UnauthenticatedError('Verification Failed')
  }

  if (user.verificationToken !== verificationToken) {
    throw new UnauthenticatedError('Verification Failed')
  }

  user.isVerified = true
  user.verified = Date.now()
  user.verificationToken = ''

  const newUser = await user.save()

  res.status(StatusCodes.OK).json({ msg: 'Email Verified', newUser })
}

const forgotPassword = async (req, res) => {
  const { email } = req.body

  if (!email) {
    throw new BadRequestError('Please provide valid email')
  }
  const user = await User.findOne({ email })

  if (user) {
    const passwordToken = crypto.randomBytes(70).toString('hex')

    await sendResetPasswordEmail({
      username: user.username,
      email: user.email,
      token: passwordToken,
      origin,
    })

    const tenMinutes = 1000 * 60 * 10
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes)

    user.passwordToken = crypto
      .createHash('md5')
      .update(passwordToken)
      .digest('hex')
    user.passwordTokenExpirationDate = passwordTokenExpirationDate
    await user.save()
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: 'Please check your email for reset password link' })
}
const resetPassword = async (req, res) => {
  const { token, email, password } = req.body
  if (!token || !email || !password) {
    throw new BadRequestError('Please provide all values')
  }

  const user = await User.findOne({ email })

  if (user) {
    const currentDate = new Date()

    if (
      user.passwordToken ===
        crypto.createHash('md5').update(token).digest('hex') &&
      user.passwordTokenExpirationDate > currentDate
    ) {
      user.password = password
      user.passwordToken = null
      user.passwordTokenExpirationDate = null
      await user.save()
    }
  }
  res.send('reset password')
}

module.exports = { verifyEmail, forgotPassword, resetPassword, login, register }
