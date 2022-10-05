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
  }
};