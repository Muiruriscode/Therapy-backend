const express = require('express')
const router = express.Router()

const login = require('../controllers/login')
// const register = require('../controllers/register')
const {
  forgotPassword,
  resetPassword,
  verifyEmail,
  register,
} = require('../controllers/auth')

router.post('/login', login)
router.post('/register', register)
router.post('/verify-email', verifyEmail)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

module.exports = router
