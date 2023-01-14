const { default: mongoose } = require("mongoose");
const Offers = require("../models/offers");

const getOffersList = async (req, res, next) => {
  try {
    const result = await Offers.find({ isSold: false, isActive: true}).select("-isSold -isActive");
    if (!result) return res.status(404).json({ message: "Nie znaleziono"});

    res.status(200).json({data: result ,message: "test"});
  } catch (err) {
    next(err);
  }
}

const getFilteredOffersList = async (req, res, next) => {
  try {
    var filter = req.body?.data;
    const isActive = req.body?.isActive || true;
    const isSold = false;
    filter = {... isSold}
    const result = await Offers.find({filter}).select("-isSold -isActive")
    if(!result) return res.status(404).json({message: "Nie odnaleziono obiektu"});


    res.status(200).json({data: result, message: "Done"});
  } catch (error) {
    next(error);
  }
}

const getOffertDetails = async (req, res, next) => {
    try {
        const id = req.params?.offertId;
        
        const result = await Offers.find({_id: id});
        if(!result) return res.status(404).json({message: "Nie odnaleziono"})


    }catch (err) {
        next(err)
    }
}

const createOffert = async (req,res,next) => {
  try {
    if(!req?.body) return res.status(401).json({message: "Błąd zapytania"});

    const data = req?.body;

    if (!data.title || !data.description || !data.price || !data.carMake || !data.carYear || !data.carCategory || !data.carColor || !data.carFuelType || !data.carPower || !data.carEngCapacity || !data.carDrive || !data.carTrans || !data.carGears || !data.carDoors || !data.vin || !data.odometer || !data.salon || !data.number) return res.status(400).json({message: "brak wartości"});

    const filesUrls = req?.files.map(item => item.path);

    const newOffert = new Offers({
      number: data.number,
      title: data.title,
      description: data.description,
      functionalities: data.functionalities,
      price: data.price,
      car: {
        make: data.carMake,
        year: data.carYear,
        model: data.carCategory,
        color: data.carColor,
        engine: {
          fuelType: data.carFuelType,
          power: data.carPower,
          capacity: data.carEngCapacity
        },
        drive: data.carDrive,
        transmission: data.carTrans,
        gears: data.carGears,
        doorsNumber: data.carDoors,
        vin: data.vin,
        odometer: data.odometer,
        gallery: data.gallery
      },
      isActive: true,
      isSold: false,
      salons: data.salon.trim(),
      gallery: filesUrls
    })
    console.log(newOffert)
    await newOffert.save();

    res.status(200).json({message: "Sukcess"});
  } catch (err) {
    next(err)
  }
}

const updateOffert = async (req, res, next) => {
  try {
    const id = req.params?.offertId;
    const data = req.data?.data;
    if(!data || !id) return res.status(400).json({message: "Błędne zapytanie"});

    const offert = await Offers.find({_id: id});
    if(!offert) return res.status(404).json({message: "Nie znaleziono obiektu"});

    res.status(200).json({message: "Updated"});
  } catch (err) {
   next(err);
  }
}

module.exports = { getOffersList, createOffert, getFilteredOffersList, updateOffert, getOffertDetails }