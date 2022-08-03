const { BadRequestError, UnauthenticatedError } = require('../errors')
const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('No token provided')
  }

  const token = authHeader.split(' ')[1]

  const payload = jwt.verify(token, process.env.JWT_TOKEN)
  if (!payload) throw new UnauthenticatedError('Invalid token')
  req.user = {
    id: payload.id,
    username: payload.username,
    email: payload.email,
    isAdmin: payload.isAdmin,
  }
  next()
}

const verifyUser = (req, res, next) => {
  authMiddleware(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next()
    }
    throw new UnauthenticatedError('Unauthenticated')
  })
}

const verifyTokenandAdmin = (req, res, next) => {
  authMiddleware(req, res, () => {
    if (req.user.isAdmin) {
      next()
    } else {
      throw new UnauthenticatedError('You are not authorized')
    }
  })
}

module.exports = { authMiddleware, verifyUser, verifyTokenandAdmin }
