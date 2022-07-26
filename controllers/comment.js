const { StatusCodes } = require('http-status-codes')
const Comment = require('../models/comment')
const { UnauthenticatedError } = require('../errors')

//get all comments
const getAllComments = async (req, res) => {
  const queryNew = req.query.new

  const comments = queryNew
    ? await Comment.find().sort({ _id: -1 }).limit(5)
    : await Comment.find()
  if (!comments) {
    throw new UnauthenticatedError('This is an error')
  }
  res.status(StatusCodes.OK).json(comments)
}

// get single comment
const getSingleComment = async (req, res) => {
  const { id } = req.params
  const comment = await Comment.findById(id)
  if (!comment) {
    throw new UnauthenticatedError('This is an error')
  }
  res.status(StatusCodes.OK).json(comment)
}

// create commnet
const createComment = async (req, res) => {
  const { author, comment, email } = req.body
  await Comment.create({
    author,
    comment,
    email,
  })
  res.status(StatusCodes.CREATED).json({ msg: 'Your comment has been saved' })
}

// delete comment
const deleteComment = async (req, res) => {
  const { id } = req.body
  await Comment.findByIdAndDelete(id)
  res.status(StatusCodes.OK).json({ msg: 'comment has been deleted' })
}

module.exports = {
  getAllComments,
  getSingleComment,
  createComment,
  deleteComment,
}
