const { StatusCodes } = require('http-status-codes')
const User = require('../models/user')
const { NotFoundError } = require('../errors')

//get single user
const getAllUsers = async (req, res) => {
  const query = req.query.new
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(2)
      : await User.find()
    res.status(StatusCodes.OK).json(users)
  } catch (error) {
    throw new NotFoundError('No such Users')
  }
}

//get all users
const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const { password, ...userDetails } = user._doc
    return res.status(StatusCodes.OK).json(userDetails)
  } catch (err) {
    throw new NotFoundError('No Users')
  }
}

//update user
const updateUser = async (req, res) => {
  //password update

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true, runValidators: true }
    )
    return res.status(StatusCodes.OK).json(updatedUser)
  } catch (error) {
    throw new NotFoundError(error)
  }
}

// delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    res.status(200).json({ msg: `User ${user.username} has been deleted` })
  } catch (error) {
    throw new NotFoundError(error)
  }
}

module.exports = {
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
}
