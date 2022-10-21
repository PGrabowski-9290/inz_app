const User = require("../models/user");

module.exports = {
  async getUser(req,res) {
    try{
      console.log(req.query)
      const email = req.query?.email || req.email;
      const result = await User.findOne({email: email}).select("-password -refreshToken").exec()
      if (!result) return res.status(404).json({message: "Brak konta z podanym adresem email"})
      console.log(result)
      return res.status(200).json({user: result, message: "Pobrano"})
    }catch(err){
      throw err
    }
  }
}