const allowedOrigins = require("./allowedOrigins");

module.exports = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else { 
      // callback(null, true)
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};