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

const createOffert = async (req,res,next) => {
  try {
    const data = req.body?.data;

    if (!data.title || !data.description || !data.price || !data.carMake || !data.carYear || !data.carCategory || !data.carColor || !data.carFuelType || !data.carPower || !data.carEngCapacity || !data.carDrive || !data.carTrans || !data.carGears || !data.carDoors || !data.vin || !data.odometer || !data.salon) return res.status(400).json({message: "brak wartości"})


    const newOffert = new Offers({
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
        odometer: data.odometer
      },
      isActive: true,
      isSold: false,
      salons: data.salon
    })
    
    await newOffert.save();

    res.status(200).json({message: "Sukcess"});
  } catch (err) {
    next(err)
  }
}

module.exports = { getOffersList, createOffert }