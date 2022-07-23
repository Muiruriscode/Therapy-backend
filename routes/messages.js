const express = require('express')
const router = express.Router()

const {
  getAllMessages,
  updateMessage,
  deleteMessage,
  createMessage,
} = require('../controllers/messages')

const { verifyUser, verifyTokenandAdmin } = require('../middleware/auth')

router.post('/:id', verifyUser, createMessage)
router.get('/:id', verifyTokenandAdmin, getAllMessages)
router.patch('/:id', verifyTokenandAdmin, updateMessage)
router.delete('/:id', verifyTokenandAdmin, deleteMessage)

module.exports = router
