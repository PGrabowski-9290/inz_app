const Offerts = require("../models/offerts");
const FilterBuilder = require('../utils/filterBuilder')

const getOffertsList = async (req, res, next) => {
  try {
    const {limit = 10, page = 1} = req.query
    const result = await Offerts.find().skip(limit * (page - 1)).limit(limit * 1).exec();

    const count = Math.ceil(await Offerts.countDocuments() / limit)

    res.status(200).json({data: result,totalPages: count, message: "Success"});
  } catch (error) {
    next(error)
  }
}

const getFilteredOffertsList = async (req, res, next) => {
  try {
    const {limit = 25, page = 1} = req.query
    const filter = req?.body?.filter;
    if (!filter) return res.status(401).json({message: "błąd zapytania"});

    const isActive = req.body.filter?.isActive || true;
    const isSold = req.body.filter?.isSold || false;
    const filterObj = new FilterBuilder(isSold, isActive);

    if (filter?.make){
      filterObj.addField("car.make",filter.make)
    }
    if (filter?.year){
      filterObj.addField("car.year", filter.year)
    }
    if(filter?.model){
      filterObj.addField("car.model", filter.model)
    }
    if(filter?.category){
      filterObj.addField("car.category", filter.category)
    }
    if(filter?.fuel){
      filterObj.addField("car.engine.fuelType", filter.fuel)
    }
    if(filter?.drive){
      filterObj.addField("car.drive", filter.drive)
    }
    if(filter?.transsmission){
      filterObj.addField("car.transmission", filter.transsmission)
    }
    if(filter?.salons){
      filterObj?.addField("salons", filter.salons)
    }
    const result = await Offerts.find(filterObj.get()).skip(limit * (page - 1)).limit(limit * 1).exec();
    const count = Math.ceil(await Offerts.countDocuments() / limit)

    res.status(200).json({data: result, totalPages: count, message: "Success"});
  } catch (error) {
    next(error)
  }
}

const getOffertDetails = async (req, res, next) => {
  try {
    const id = req.params?.offertId;
        
    const result = await Offerts.findOne({_id: id});
    if(!result) return res.status(404).json({message: "Nie odnaleziono"});

    res.status(200).json({data: result, message: "Success"});
  } catch (error) {
    next(error)
  }
}

const createOffert = async (req,res,next) => {
  try {
    if(!req?.body) return res.status(401).json({message: "Błąd zapytania"});

    const data = req?.body;

    if (!data?.title || !data?.description || !data?.price || !data?.carMake || !data?.carYear || !data?.carModel || !data?.carCategory || !data?.carColor || !data?.carFuelType || !data?.carPower || !data?.carEngCapacity || !data?.carDrive || !data?.carTrans || !data?.carGears || !data?.carDoors || !data?.vin || !data?.odometer || !data?.salon || !data?.number) return res.status(400).json({message: "brak wartości"});

    const filesUrls = req?.files.map(item => item.path);

    const newOffert = new Offerts({
      number: data.number,
      title: data.title,
      description: data.description,
      functionalities: data.functionalities,
      price: data.price,
      car: {
        make: data.carMake,
        year: data.carYear,
        model: data.carModel,
        color: data.carColor,
        category: data.carCategory,
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
    const data = req.body?.data;
    if(!data || !id) return res.status(400).json({message: "Błędne zapytanie"});

    if (!data?.title || !data?.description || !data?.price || !data?.carMake || !data?.carYear || !data?.carModel || !data?.carCategory || !data?.carColor || !data?.carFuelType || !data?.carPower || !data?.carEngCapacity || !data?.carDrive || !data?.carTrans || !data?.carGears || !data?.carDoors || !data?.vin || !data?.odometer || !data?.salon || !data?.number) return res.status(400).json({message: "brak wartości"});

    const offert = await Offerts.findOneAndUpdate({_id: id}, {
      number: data.number,
      title: data.title,
      description: data.description,
      functionalities: data.functionalities,
      price: data.price,
      car: {
        make: data.carMake,
        year: data.carYear,
        model: data.carModel,
        color: data.carColor,
        category: data.carCategory,
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
      },
      salons: data.salon.trim(),
    }).exec(); 

    res.status(200).json({message: "Updated"});
  } catch (err) {
   next(err);
  }
}

module.exports = { getOffertsList, createOffert, getFilteredOffertsList, updateOffert, getOffertDetails }