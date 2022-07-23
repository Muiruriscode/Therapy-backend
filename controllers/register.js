const { StatusCodes } = require('http-status-codes')
const User = require('../models/user')

const register = async (req, res) => {
  const user = await User.create({ ...req.body })
  const token = user.createJWT()
  res
    .status(StatusCodes.CREATED)
    .json({ user: { username: user.username }, token })
}

module.exports = register
