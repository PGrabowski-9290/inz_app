const allowedOrigins = require('../config/allowedOrigins');

module.exports = (req,res,next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', true);
  }
  
  next();
};

//W tym module funkcje weryfikujące token logowania oraz rolę użytkownika zostały wykorzystane z poniższego repozytorium
//https://github.com/gitdagray/express_user_roles