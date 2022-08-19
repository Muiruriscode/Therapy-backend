const { StatusCodes } = require('http-status-codes')
const User = require('../models/user')
const { NotFoundError } = require('../errors')

//get single user
const getAllUsers = async (req, res) => {
  const query = req.query.new

  const users = query
    ? await User.find().sort({ _id: -1 }).limit(5)
    : await User.find()
  if (!users) {
    throw new NotFoundError('No such Users')
  }
  res.status(StatusCodes.OK).json(users)
}

//get all users
const getSingleUser = async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    throw new NotFoundError('No such User')
  }
  const { password, ...userDetails } = user._doc
  res.status(StatusCodes.OK).json(userDetails)
}

//update user
const updateUser = async (req, res) => {
  //password update
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true, runValidators: true }
  )
  if (!updatedUser) {
    throw new NotFoundError('User not found')
  }
  return res.status(StatusCodes.OK).json(updatedUser)
}

// delete user
const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id)

  if (!user) {
    throw new NotFoundError('No such User')
  }

  res.status(200).json({ msg: `User ${user.username} has been deleted` })
}

module.exports = {
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
}
