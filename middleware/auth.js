const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = {
  verifyJWT(req,res,next) {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split('Bearer ')[1];

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) return res.sendStatus(403);
      console.log(req)
      req.email = decoded.User.email;
      req.role = decoded.User.role;
      next();
    });
  },
  verifyRole (...allowedRoles) {
    return (req,res,next) => {
      const roles = [...allowedRoles];
      console.log("AUTH MIDDLEWARE: ")
      console.log(roles)
      
      if (!req?.role) return res.status(401).json({ message: "Brak dostępu"});
      if( !(roles.includes(req.role)) ) return res.status(401).json({ message: "Brak dostępu"});
      next();
    }
  }
}