require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const config = require("./config/config");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
const app = express();


app.use(credentials);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, "./uploads")));

mongoose.connect(config.MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true
})
  .then(() => console.log('Połączono z bazą danych') )
  .catch(err => console.log(`Błąd połączenia z bazą danych:\n ${err}`));

app.listen(config.PORT, () => { console.log(`Server runing on http://localhost:${config.PORT}/`) });