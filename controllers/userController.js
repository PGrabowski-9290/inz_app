const bcrypt = require("bcrypt")
const User = require("../models/user");

module.exports = {
  async getUser(req,res) {
    try{
      const email = req.query?.email;
      const result = await User.findOne({email: email}).select("-password -refreshToken").exec()
      if (!result) return res.status(404).json({message: "Brak konta z podanym adresem email"})
      console.log(result)
      return res.status(200).json({user: result, message: "Pobrano"})
    }catch(err){
      throw err
    }
  },
  async getLoggedUser(req,res) {
    try{
      const email = req.email;
      const result = await User.findOne({email: email}).select("-password -refreshToken").exec()
      if (!result) return res.status(404).json({message: "Brak konta z podanym adresem email"})
      console.log(result)
      return res.status(200).json({user: result, message: "Pobrano"})
    }catch(err){
      throw err
    }
  },
  async getUsersList (req,res) {
    try {
      const result = await User.find().select("-password -refreshToken").exec()
      console.log(result)
      res.status(200).json({list: result,message: "ok"})
    }catch(err) {
      throw err
    }
  },
  async updateLoggedUser (req,res) {
    try {
      const userData = req.body?.user;
      console.log(userData)
      const foundUser = await User.findOne({email: req.email})
      if(!foundUser) return res.status(404).json({message: "User Not Found"})
      foundUser.name = userData.name
      if( userData.changePass ) {
        foundUser.password = bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;

          bcrypt.hash( userData.password, salt, async (err, hash) => {
            if (err) throw err;

            foundUser.password = hash;
            await foundUser.save()
          });
        });
      }else{
        await foundUser.save()
      }      

      res.status(200).json({message: "Zakutalizowano"})
    }catch(err) {
      throw err
    }
  },
  async updateUser (req,res) {
    try {
      const {user, passwordChange} = req.body;
      console.log(user)
      const foundUser = await User.findOne({_id: user._id})
      if(!foundUser) return res.status(404).json({message: "User Not Found"})
      foundUser.name = user.name
      foundUser.role = user.role
      if( passwordChange ) {
        foundUser.password = bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;

          bcrypt.hash( user.password, salt, async (err, hash) => {
            if (err) throw err;

            foundUser.password = hash;
            await foundUser.save()
          });
        });
      }else{
        await foundUser.save()
      }

      res.status(200).json({message: "Zakutalizowano"})
    }catch(err) {
      throw err
    }
  }
} 