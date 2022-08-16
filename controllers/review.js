const { StatusCodes } = require('http-status-codes')
const { NotFoundError } = require('../errors')
const Review = require('../models/review')

//get first five review
const getLatestReview = async (req, res) => {
  const reviews = await Review.find().sort({ _id: -1 }).limit(5)

  if (!reviews) {
    throw new NotFoundError('No reviews')
  }
  res.status(StatusCodes.OK).json(reviews)
}

//get single review
const getSingleReview = async (req, res) => {
  const { id } = req.params

  const review = await Review.findById(id)
  if (!review) {
    throw new NotFoundError(`No review with id ${id}`)
  }
  res.status(StatusCodes.OK).json(review)
}

// update review
const updateReview = async (req, res) => {
  const { id } = req.params

  const updatedUser = await Review.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true, runValidators: true }
  )

  if (!updatedUser) {
    throw new NotFoundError(`No message with id ${id}`)
  }
  res.status(StatusCodes.OK).json(updatedUser)
}

// delete review
const deleteReview = async (req, res) => {
  const { id } = req.params

  await Review.findByIdAndDelete(id)
  res.status(StatusCodes.OK).json('Review deleted')
}

// create review
const createReview = async (req, res) => {
  const newReview = new Review({ ...req.body })
  await newReview.save()
  res.status(StatusCodes.CREATED).json({ msg: 'Review sent' })
}

module.exports = {
  getLatestReview,
  getSingleReview,
  createReview,
  updateReview,
  deleteReview,
}
