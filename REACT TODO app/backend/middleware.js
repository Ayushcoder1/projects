const zod = require('zod');
const jwt = require('jsonwebtoken');
const passKey = require('./config.js').JWT_SECRET_KEY;

function validator(req, res, next){
    const schema = zod.object({
        username : zod.string().email(),
        name : zod.string(),
        password : zod.string().min(6)
    })
    const check = schema.safeParse(req.body);
    if(!check.success){
        return res.status(403).json({msg : "Invalid Username or Password!"});
    }
    next();
}

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
    validator,
    authMiddleware
};