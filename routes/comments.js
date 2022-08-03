const express = require('express')
const router = express.Router()

const { verifyTokenandAdmin } = require('../middleware/auth')

const {
  getAllComments,
  getSingleComment,
  deleteComment,
  createComment,
} = require('../controllers/comment')

router.get('/:id', getAllComments)
router.get('/', verifyTokenandAdmin, getSingleComment)
router.delete('/:id', verifyTokenandAdmin, deleteComment)
router.post('/', createComment)

module.exports = router
