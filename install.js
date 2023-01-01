const mongoose = require("mongoose");
require("dotenv").config();
const register = require("./controllers/authController").register;
const config = require("./config/config");
const Settings = require('/models/settings');

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

const install = async () => {
  try {
    //create user
    const a = await createUser();
    if (a) { 
      console.log(a)
      process.exit()
    }
    console.log(a)

    
  } catch(err) {
    throw err
  }
}


mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(async () => {
    console.log('Połączono z bazą danych')
    
  })
  .catch(err => console.log(`Błąd połączenia z bazą danych:\n ${err}`));

