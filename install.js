const mongoose = require("mongoose");
require("dotenv").config();
const register = require("./controllers/authController").register;
const config = require("./config/config");
const Settings = require('./models/settings');
const ModelsList = require('./models/model_list')
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

  console.log(req)
  return await register(req,res)
}
const restoreDB = async () => {
  try {
    const modelsData = require('./install/models.js')
    const settings = require('./install/settings.js')

    await Settings.createCollection()
    await Settings.insertMany(settings,{limit: null, lean: true}, () => {
      console.log("*** settings imported ***")
    })
    await ModelsList.createCollection()

    for (const obj of modelsData ) {
      const newModel = new ModelsList(obj)
      await newModel.save()
    }

    console.log("   * Koniec importu")
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}
const install = async () => {
  try {
    //restore DB
    const db = await restoreDB()
    if (db) {
      console.log("* DB DONE *")
    }
    //create user
    const user = await createUser();
    if (user) {
      console.log("* USER DONE *")
    }

    return true
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
    const fin = await install()
    if (fin) {
      console.log(" - Zakończono")
    }
    process.exit()
  })
  .catch(err => console.log(` !!! Błąd połączenia z bazą danych:\n ${err}`));

