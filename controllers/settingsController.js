const { db } = require('../models/settings');
const Settings = require('../models/settings');

const getSettings = async (req,res, next) => {
  try{
    const result = await Settings.findOne({id: 0}).exec();

    if (!result) return res.status(200).json({data: {settings: {}}, message: "Brak ustawień w bazie danych do pobrania"})

    console.log(result);
    res.status(200).json({settings: result, message: "Pobrano"});
  }catch(err) {
    next(err)
  }
}

const updateSettings = async (req, res, next) => {
  try {

    const data = req.body?.settings;

    var dbSettings = await Settings.findOne({id: 0}).exec();

    if (!dbSettings) {
      dbSettings = new Settings({
        id: 0
      });
    }

    dbSettings.ownerDetails = {
      firstName: data.firstName,
      surName: data.surName
    }

    dbSettings.companyDetails = {
      name: data.companyName,
      nip: data.nip,
      city: data.city,
      zipCode: data.zipCode,
      street: data.street
    }

    dbSettings.contact = {
      phoneNumber: data.phone,
      email: data.email
    }
    
    console.log(dbSettings)
    const result = await dbSettings.save();
    console.log(result);
    res.status(200).json({data: dbSettings, message: "Pobrano"});

  } catch(err) {
    next(err)
  }
}

module.exports = {getSettings, updateSettings}