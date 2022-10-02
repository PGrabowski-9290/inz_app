const bcrpyt = require('bcrypt');
const { decode } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/user')

module.exports = {
  async register(req, res) {
    try {
      const { email, password, role, name } = req.body;
      if (!email || !password || !role || !name) return res.status(400).json({ message: 'Wypełnij wszystkie pola' });

      const newUser = new User({
        email: email.toLowerCase(),
        name: name,
        role: role.toLowerCase()
      });

      const user = await User.findOne({ email: email.toLowerCase() });
      if (user) return res.status(400).json({ message: 'Istnieje konto o podanym adresie email' });

      bcrpyt.genSalt(10, (err, salt) => {
        if (err) throw err;

        bcrpyt.hash(password, salt, async (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          const user = await newUser.save();
          if (!user) res.status(403).json({ message: "Nie powiodło się stworrzenie nowego użytkownika"});
          res.status(200).json({ message: "Stworzono użytkownika"});
        });
      });
    } catch (err) {
      throw err;
    }
  },
  async login (req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) return res.status(401).json({ message: "Email i hasło jest wymagane"});

      const foundUser = await User.findOne({ email: email.toLowerCase() });
      if (!foundUser) return res.status(401).json({ message: "Brak użytkownika z takim adresem mailowym" });
      
      const match = await bcrpyt.compare(password, foundUser.password);
      if (match) {
        const accessToken = jwt.sign(
          { "User": {
              "email": foundUser.email,
              "name": foundUser.name,
              "role": foundUser.role
            }
          },
          config.secret,
          { expiresIn: 60*30 }
        );

        const refreshToken = jwt.sign(
          { "email": foundUser.email },
          config.refreshSecret,
          { expiresIn: 60*60*12 }
        );

        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();

        res.cookie('jwt', refreshToken, {httpOnly: true, secure: true, sameSite: 'None', maxAge: 12 * 60 * 60 * 1000 });

        res.json({ message: "Zalogowano", accessToken: accessToken, role: foundUser.role})
      } else { 
        res.status(401).json({ message: "Błędne dane logowania"})
      }
    }catch (err) {
      throw err;
    }
  },
  async refreshToken (req,res) {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      config.refreshSecret,
      (err, decoded) => {
        if (err || foundUser.email !== decode.email) return res.sendStatus(403);
        const accessToken = jwt.sign(
          {
            "User": {
              "email": decoded.email,
              "role": foundUser.role
            }
          },
          config.secret,
          { expiresIn: 60*60*12 }
        );
        
        res.json({ role, accessToken })
      }
    )
  }
};