const origin = process.env.NODE_ENV !== 'production'

module.exports = origin
  ? 'http://localhost:3000'
  : 'https://vercel.com/muiruriscode/therapy'
