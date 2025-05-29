const jwt = require("jsonwebtoken");
const passKey = require('./config.js').JWT_SECRET_KEY;

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization?.split(' ')[1];
  if (!auth) return res.status(401).send('No token');
  try {
    const payload = jwt.verify(auth, passKey);
    req.user = payload.username;
    next();
  } catch (err) {
    res.status(401).send('Invalid token');
  }
}

module.exports = {
    authMiddleware
}