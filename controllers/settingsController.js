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

    var dbSettings = await Settings.findOneAndUpdate(
      {id: 0}, 
      {
        id: 0,
        ownerDetails: {
          firstName: data.firstName,
          surName: data.surName
        },
        companyDetails: {
          name: data.companyName,
          nip: data.nip,
          city: data.city,
          zipCode: data.zipCode,
          street: data.street
        },
        contact: {
          phoneNumber: data.phone,
          email: data.email
        }
      },
      {
        upsert: true,
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({data: dbSettings, message: "Pobrano"});

  } catch(err) {
    next(err)
  }
}

module.exports = {getSettings, updateSettings}