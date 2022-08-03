const { StatusCodes } = require('http-status-codes')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
  CustomAPIError,
} = require('../errors')
const crypto = require('crypto')
const sendVerificationEmail = require('../utils/sendVerificationEmail')

const register = async (req, res) => {
  const { email, username, password } = req.body

  const emailAlreadyExists = await User.findOne({ email })
  if (emailAlreadyExists) {
    throw new BadRequestError('Email already exists')
  }

  const salt = await bcrypt.genSalt(10)
  hashedPassword = await bcrypt.hash(password, salt)
  console.log(hashedPassword)

  const verificationToken = crypto.randomBytes(40).toString('hex')

  const user = await User.create({
    email,
    username,
    password: hashedPassword,
    verificationToken,
  })

  // console.log(user)
  // const origin = 'http://localhost:3000'

  // await sendVerificationEmail({
  //   username: user.name,
  //   email: user.email,
  //   verificationToken: user.verificationToken,
  //   origin,
  // })

  res.status(StatusCodes.CREATED).json(user)
  // .json({ msg: 'Success! Please check your email to verify account' })
}

module.exports = register
