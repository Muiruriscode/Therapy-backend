const express = require('express')
const router = express.Router()

const {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} = require('../controllers/users')

const { verifyUser, verifyTokenandAdmin } = require('../middleware/auth')

router.get('/:id', verifyUser, getSingleUser)
router.get('/', verifyTokenandAdmin, getAllUsers)
router.patch('/:id', verifyUser, updateUser)
router.delete('/:id', verifyUser, deleteUser)

module.exports = router
