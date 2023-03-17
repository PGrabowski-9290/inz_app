const mongoose = require("mongoose");
require("dotenv").config();
const register = require("./controllers/authController").register;
const config = require("./config/config");
const Settings = require('./models/settings');
const createUser = async () => {
  const req = {
    body: {
      email: config.adminUser.email,
      password: config.adminUser.password,
      role: "admin",
      name: "Admin",
      isSuperAdmin: true,
      isActive: true
    }
  };

  const res = {
    stat: 0,
    body: undefined,
    status(e) {
      this.stat = e
      return this
    },
    json(e) {
      this.body = e
      process.exit()
    }
  };


  return await register(req,res, (e) => console.log(e))
}

const restoreSettings = async () => {
  const settings = require('./install/settings.js')

  await Settings.createCollection()
  return Settings.insertMany(settings, {limit: null, lean: true}, () => {
    console.log("*** settings imported ***")
  });
}
const install = async () => {
  try {
    const settings = restoreSettings()
    //create user
    const user = createUser();


    console.log("DONE")
    if (settings) {
      console.log("* DB DONE *")
    }
    if (user) {
      console.log("* USER DONE *")
    }

    await Promise.all([user, settings]).then(values => console.log(values))
  } catch(err) {
    console.log(err)
    return false
  }
}

console.log("# Konfiguracja bazy danych")
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(async () => {
    console.log(' - Połączono z bazą danych')
    await install()
  })
  .catch(err => console.log(` !!! Błąd połączenia z bazą danych:\n ${err}`));

