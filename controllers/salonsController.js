const { find } = require('../models/salons');
const salons = require('../models/salons');
const Salons = require('../models/salons');

const createSalon = async (req, res, next) => {
  const data = req.body?.salon;

  try {
    const salon = new Salons({
      location: {
        city: data.city,
        street: data.street,
        zipCode: data.zipCode
      },
      contact: {
        phoneNumber: data.phone,
        email: data.email
      },
      users: [
        data.userId
      ]
    })

    await salon.save();

    res.status(200).json({message: "Dodano"})
  } catch (err) {
    next(err)
  }
}

const updateSalon = async (req, res, next) => {
    const id = req.params?.salonId;
    const data = req.body?.data;

    try {
        const findSalon = await Salons.findOne({_id: id}).exec();
        if( !findSalon ) return res.status(404).json({message: "Nie odnaleziono salonu do zaktualizowania"})

        findSalon.location = {...data.location}
        findSalon.contact = {...data.contact}

        await findSalon.save();

        res.status(200).json({message: "Zakutalizowano"})
    } catch (err) {
        next(err);
    }
}

const updateActiveStatus = async (req, res, next) => {
  const salonId = req.params?.salonId;
  const status = req.body?.status;

  if (!salonId) return res.status(404).json({message: "Brak Id Salonu"});
  try {
    const foundSalon = await Salons.findById(salonId)
    if( !foundSalon) return res.status(404).json({message: "Nie odnaleziono salonu"});

    foundSalon.isActive = status;

    await foundSalon.save();
    res.status(200).json({message: "Zaktualizowano"});
  }catch (err) {
    next(err);
  }
}

const getActiveSalonsList = async (req,res,next) => {
  try {
    const result = await Salons.find({ isActive: true});
    if (!result) return res.status(404).json({message: "Brak aktywnych salonów sprzedaży"});

    res.status(200).json({data: result, message: "Pobrano"});
  } catch (err) {
    next(err)
  }
}

const getSalonsList = async (req, res, next) => {
  try {
    const result = await Salons.find().select("_id location.city location.street contact").exec();

    if (!result) return res.status(400).json({message: "Błąd pobierania listy salonów"});

    res.status(200).json({data: result, message: "Pobrano"});
  } catch (err) {
    next(err);
  }
}

const getSalon = async (req, res, next) => {
    const paramId = req.params?.salonId;
    if (!paramId) return res.status(400).json({message: "Brak podanego id salonu"})
    console.log(paramId);

    try {
        const result = await Salons.findOne({_id: paramId}).exec();
        if (!result) return res.status(404).json({message: "Nie odnaleziono"});

        res.status(200).json({data: result, message: "Pobrano"})
    } catch (err) {
        next(err);
    }
}

const updateUsers = async (req, res, next) => {
  const id = req.params?.salonId;
  const {action, userId} = req.body?.data;
  try {
    const findSalon = await Salons.findOne({_id: id});
    if (!findSalon) return res.status(404).json({message: "Nie znaleziono salonu"});

    if(!action || !userId) return res.status(400).json({message: "Uzupełnij dane"})

    if (action === "add"){
      findSalon.users.push(userId);
    }
    else if (action === "remove"){
      findSalon.users = findSalon.users.pull(userId)
    } else {
      return res.status(400).json({message: "Nie poprawna wartość"});
    }

    await findSalon.save();

    res.status(200).json({message: "Zaktualizowano"})
  } catch(err) {
    next(err);
  }
}

module.exports = { createSalon, updateSalon, updateActiveStatus, getSalonsList, getSalon, getActiveSalonsList, updateUsers }