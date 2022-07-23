const { BadRequestError, UnauthenticatedError } = require('../errors')
const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new BadRequestError('Invalid token')
  }
  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_TOKEN)
    req.user = {
      id: payload.id,
      username: payload.username,
      email: payload.email,
      isAdmin: payload.isAdmin,
    }
    next()
  } catch (error) {
    throw new UnauthenticatedError(error)
  }
}

const verifyUser = (req, res, next) => {
  try {
    authMiddleware(req, res, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next()
      } else {
        throw new UnauthenticatedError('Unauthenticated')
      }
    })
  } catch (error) {
    console.log(error)
  }
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
