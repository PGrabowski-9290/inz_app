const User = require("../models/user");

module.exports = {
  async getUser(req,res) {
    try{
      const email = req.query?.email || req.email;
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
} 