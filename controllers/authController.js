const bcrpyt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/user')

const toEpochDate = (maxAge) => {
  let now = new Date().getTime();
  return now + (maxAge * 1000)
}


module.exports = {
  async register(req, res) {
    try {
      const { email, password, role, name, isSuperAdmin } = req.body;
      if (!email || !password || !role || !name ) return res.status(400).json({ message: 'Wypełnij wszystkie pola' });

      const newUser = new User({
        email: email.toLowerCase(),
        name: name,
        role: role.toLowerCase(),
        isSuperAdmin: isSuperAdmin || false
      });

      const user = await User.findOne({ email: email.toLowerCase() });
      if (user) return res.status(400).json({ message: 'Istnieje konto o podanym adresie email' });

      bcrpyt.genSalt(10, (err, salt) => {
        if (err) throw err;

        bcrpyt.hash(password, salt, async (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          const user = await newUser.save();
          if (!user) return res.status(403).json({ message: "Nie powiodło się stworrzenie nowego użytkownika"});
          return res.status(200).json({ message: "Stworzono użytkownika"});
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
          { 
            exp: Math.floor(toEpochDate(config.expires.token) / 1000),
            data: { "User": {
              "email": foundUser.email,
              "name": foundUser.name,
              "role": foundUser.role
              }
            }
          },
          config.secret
        );

        const refreshToken = jwt.sign(
          {
            exp: Math.floor(toEpochDate(config.expires.refToken) / 1000), 
            data: { "email": foundUser.email }
          },
          config.refreshSecret
        );
        console.log("ref",refreshToken)
        console.log("acc",accessToken)

        jwt.verify(accessToken, config.secret, (err, decoded) => {
          console.log("errVerify: ", err)
          console.log("decoded: ", decoded)
        });


        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result)
        res.cookie('jwt', refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'None',
          maxAge: 43200000
        });

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
    console.log("COOKIES: ",cookies)
    if (!cookies?.jwt) return res.status(401).json({message: "NoCookie JWT"});
    const refreshToken = cookies.jwt;
   
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser?._id) return res.status(401).json({message: "User Error"});
    console.log("typeof reftoken: ",typeof(config.expires.refToken))
    jwt.verify(
      refreshToken,
      config.refreshSecret,
      (err, decoded) => { 
        if (err || foundUser.email !== decoded.data.email) {
          return res.status(401).json({message: "JWT error"})
        };
        const accessToken = jwt.sign(
          { 
            exp: Math.floor(toEpochDate(config.expires.token) / 1000),
            data: { "User": {
              "email": foundUser.email,
              "name": foundUser.name,
              "role": foundUser.role
              }
            }
          },
          config.secret
        );
        
        res.json({ role: foundUser.role, accessToken })
      }
    )
  },
  async logout (req, res) {
    try{
      const cookies = req.cookies;
      console.log("COOKIES: ",cookies)
      if (!cookies?.jwt) return res.status(401).json({message: "NoCookie JWT"});
      const refreshToken = cookies.jwt;
    
      const foundUser = await User.findOne({ refreshToken }).exec();
      console.log(foundUser)
      if (!foundUser?._id) return res.status(401).json({message: "User Error"});

      foundUser.refreshToken = "0";
      const result = await foundUser.save();
      console.log("res: ",result)
      res.clearCookie("jwt")
      res.status(200).json({message: "Wylogowano"})
    }catch (err) {
      console.log(err)
      throw err;
    }
  }
};