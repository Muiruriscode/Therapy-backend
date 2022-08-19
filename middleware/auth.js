const { BadRequestError, UnauthenticatedError } = require('../errors')
const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Invalid Token' })
  }

  const token = authHeader.split(' ')[1]

  const payload = jwt.verify(token, process.env.JWT_TOKEN)
  if (!payload) {
    return res.status(401).json({ msg: 'Invalid Token' })
  }
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
    res.status(401).json({ msg: 'Unauthenticated' })
  })
}

const verifyTokenandAdmin = (req, res, next) => {
  authMiddleware(req, res, () => {
    if (req.user.isAdmin) {
      next()
    } else {
      res.status(401).json({ msg: 'Unauthenticated' })
    }
  })
}

module.exports = { authMiddleware, verifyUser, verifyTokenandAdmin }
