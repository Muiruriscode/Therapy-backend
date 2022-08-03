const express = require('express')
const router = express.Router()

const {
  getLatestReview,
  getSingleReview,
  updateReview,
  deleteReview,
  createReview,
} = require('../controllers/review')

const { verifyUser, verifyTokenandAdmin } = require('../middleware/auth')

router.post('/:id', verifyUser, createReview)
router.get('/:id', verifyUser, getSingleReview)
router.get('/', getLatestReview)
router.delete('/:id', verifyUser, deleteReview)
router.patch('/:id', verifyUser, updateReview)

module.exports = router
