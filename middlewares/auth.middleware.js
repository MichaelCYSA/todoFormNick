const jwt = require('jsonwebtoken')
const config = require('config')

const authMiddleware = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {

    const token = req.headers.authorization
    if (!token) {
      return res.status(401).json({ message: "You don't have access!" })
    }
    const decoded = jwt.verify(token, config.get('SECRET_KEY'))
    req.body.authorization = decoded
    next()

  } catch (e) {

    res.status(401).json({ message: "You don't have access!" })
  }
}

module.exports = authMiddleware 