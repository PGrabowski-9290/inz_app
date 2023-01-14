const multer = require('multer')


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    console.log(file)
    const fileType = file.originalname.split('.')
    cb(null, Date.now()+"-"+Math.floor(Math.random() * 100000000)+'.'+fileType[fileType.length-1]);
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(png|PNG|jpg|JPG)$/gm)){
      req.fileValidationError = 'Tylko zdjęcia są dozwolone';
      return cb(null, false);
    }
  }
})

module.exports = {
  PORT: process.env.PORT,
  secret: process.env.SECRET,
  refreshSecret: process.env.REFRESH_SECRET,
  mongoUri: process.env.MONGO_URI,
  roles: {
    Admin: "admin",
    User: "user"
  },
  adminUser:{
    email: process.env.EMAIL,
    password: process.env.PASSWD
  },
  expires:{
    refToken: process.env.EXPIRE_REF_TOKEN || 7200,
    token: process.env.EXPIRE_TOKEN || 900
  },
  storage
};