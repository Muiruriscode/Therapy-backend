const Conversation = require('../models/conversation')
const { NotFoundError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

//get all conversations
const getAllConversations = async (req, res) => {
  const conversations = await Conversation.find()

  if (!conversations) {
    throw new NotFoundError('No conversations')
  }

  res.status(StatusCodes.OK).json({ conversations })
}

// getSingleConversation
const getSingleConversation = async (req, res) => {
  const { id } = req.params

  const singleConversation = await Conversation.findOne({ roomId: id })

  if (!singleConversation) {
    throw new NotFoundError(`No conversation with id ${roomId}`)
  }
  res.status(StatusCodes.OK).json(singleConversation)
}

// update conversation
const updateConversation = async (req, res) => {
  const { id } = req.params
  const newConversation = await Conversation.findOne({
    roomId: id,
  })

  const updatedConversation = await Conversation.findByIdAndUpdate(
    newConversation._id,
    { $set: req.body },
    { new: true, runValidators: true }
  )
  if (!updatedConversation) {
    throw new NotFoundError(`No conversation with id ${id}`)
  }
  res.status(StatusCodes.OK).json(updatedConversation)
}

// delete conversation
const deleteConversation = async (req, res) => {
  const { id } = req.params
  const newConversation = await Conversation.findOne({
    roomId: id,
  })

  await Conversation.findByIdAndDelete(newConversation._id)
  res.status(StatusCodes.OK).json('Conversation Deleted')
}

// create conversation
const createConversation = async (req, res) => {
  const newConversation = new Conversation(req.body)
  const createdConversation = await newConversation.save()
  res.status(StatusCodes.CREATED).json(createdConversation)
}

module.exports = {
  getAllConversations,
  getSingleConversation,
  updateConversation,
  createConversation,
  deleteConversation,
}
