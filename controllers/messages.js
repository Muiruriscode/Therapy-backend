const Message = require('../models/message')
const { NotFoundError, BadRequestError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

//get all messages
const getAllMessages = async (req, res) => {
  const { id } = req.params
  const queryNew = req.query.new
  const messages = queryNew ?  await Message.find({ roomId: id }).sort({ _id: -1 }).limit(5) : await Message.find({ roomId: id })
  if (!messages) {
    throw new NotFoundError('No Messages')
  }
  res.status(StatusCodes.OK).json({ messages })
}

// create message
const createMessage = async (req, res) => {
  const newMessage = new Message(req.body)
  const message = await newMessage.save()
  res.status(StatusCodes.CREATED).json(message)
}

// get message
const getSingleMessage = async (req, res) => {
  const { id } = req.params
  const message = await Message.findById(id)
  if (!message) {
    throw new NotFoundError(`No message with id ${id}`)
  }
  res.status(StatusCodes.OK).json(message)
}

// deleteMessage
const deleteMessage = async (req, res) => {
  const { id } = req.params
  await Message.findByIdAndDelete(id)
  res.status(StatusCodes.OK).json('Message deleted')
}

// update essage
const updateMessage = async (req, res) => {
  const { id } = req.params

  const updatedMessage = await Message.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true, runValidators: true }
  )
  if (!updatedMessage) {
    throw new NotFoundError('No such message')
  }
  res.status(StatusCodes.OK).json('message updated')
}

module.exports = {
  getAllMessages,
  getSingleMessage,
  createMessage,
  updateMessage,
  deleteMessage,
}
