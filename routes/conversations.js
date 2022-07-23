const express = require('express')
const router = express.Router()

const {
  getAllConversations,
  getSingleConversation,
  updateConversation,
  deleteConversation,
  createConversation,
} = require('../controllers/conversation')

const { verifyUser, verifyTokenandAdmin } = require('../middleware/auth')

router.post('/:id', verifyUser, createConversation)
router.get('/', verifyTokenandAdmin, getAllConversations)
router.get('/:id', verifyUser, getSingleConversation)
router.patch('/:id', verifyTokenandAdmin, updateConversation)
router.delete('/:id', verifyTokenandAdmin, deleteConversation)

module.exports = router
