require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const config = require("./config/config");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
const cookieParser = require("cookie-parser");
const app = express();
const logit = (req, res, next) => {
  console.log('\x1b[36m%s\x1b[0m', '\n\nLOG FROM LOGIT TO ME\n')
  console.log(req);
  next();
}

mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Połączono z bazą danych') )
  .catch(err => console.log(`Błąd połączenia z bazą danych:\n ${err}`));

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "./uploads")));

app.use('/auth', require("./routes/auth"));


app.listen(config.PORT, () => { console.log(`Server runing on http://localhost:${config.PORT}/`) });