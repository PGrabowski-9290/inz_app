const Settings = require('../models/settings');

const getSettings = async (req,res) => {
  try{
    const result = await Settings.findOne().sort({_id: 1}, (err, data) => {
      res.status(404).json({message: "Błąd odczytu danych"})
    });

    if (!result) res.status(404).json({message: "Brak ustawień w bazie danych do pobrania"})

    console.log(result);
    res.status(200).json({settings: result, message: "Pobrano"});
  }catch(err) {
    throw err
  }
}


module.exports = {getSettings}