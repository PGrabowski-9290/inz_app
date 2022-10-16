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
  }
};