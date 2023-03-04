const Offerts = require("../models/offerts");
const FilterBuilder = require('../utils/filterBuilder')

const getOffertsList = async (req, res, next) => {
  try {
    const {limit = 10, page = 1} = req.query
    const result = await Offerts.find().populate({path: 'salons'}).sort({_id:1}).skip(limit * (page - 1)).limit(limit * 1).exec();

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
    const filterObj = new FilterBuilder();
    filterObj.addField("isSold", isSold);
    filterObj.addField("isAcitve", isActive);

    if (filter?.make && filter?.make !== ""){
      filterObj.addField("car.make",filter.make)
    }
    if (filter?.year && filter?.year !== ""){
      filterObj.addField("car.year", filter.year)
    }
    if(filter?.model && filter?.model !== ""){
      filterObj.addField("car.model", filter.model)
    }
    if(filter?.category && filter?.category !== ""){
      filterObj.addField("car.category", filter.category)
    }
    if(filter?.fuel && filter?.fuel !== ""){
      filterObj.addField("car.engine.fuelType", filter.fuel)
    }
    if(filter?.drive && filter?.drive !== ""){
      filterObj.addField("car.drive", filter.drive)
    }
    if(filter?.transmission && filter?.transmission !== ""){
      filterObj.addField("car.transmission", filter.transmission)
    }
    if(filter?.salons && filter?.salons !== ""){
      filterObj.addField("salons", filter.salons)
    }
    if(filter?.offertNumber && filter?.offertNumber !== ""){
      filterObj.addField("number", filter.offertNumber)
    }
    
    const result = await Offerts.find(filterObj.get()).populate({path: 'salons'}).sort({_id:1}).skip(limit * (page - 1)).limit(limit * 1).exec();
    const count = Math.ceil(await Offerts.find(filterObj.get()).countDocuments() / limit)

    res.status(200).json({data: result, totalPages: count, message: "Success"});
  } catch (error) {
    next(error)
  }
}

const getOffertDetails = async (req, res, next) => {
  try {
    const id = req.params?.offertId;
        
    const result = await Offerts.findOne({_id: id}).populate({path: 'salons'});
    if(!result) return res.status(404).json({message: "Nie odnaleziono"});

    res.status(200).json({data: result, message: "Success"});
  } catch (error) {
    next(error)
  }
}

const createOffer = async (req, res, next) => {
  try {
    if(!req?.body) return res.status(400).json({message: "Błąd zapytania"});

    const data = req?.body;
    console.log("data",data)
    if (!data?.title || !data?.description || !data?.price || !data?.make || !data?.year || !data?.model ||
        !data?.category || !data?.carColor || !data?.carFuelType || !data?.carPower || !data?.carEngCapacity ||
        !data?.carDrive || !data?.carTrans || !data?.carGears || !data?.carDoors || !data?.vin || !data?.odometer
        || !data?.salon) return res.status(400).json({message: "brak wartości"});

    const filesUrls = req?.files.map(item => item.path);
    const number = await Offerts.countDocuments().exec() + 1;
    const newOffer = new Offerts({
      number: number,
      title: data.title,
      description: data.description,
      functionalities: data.functionalities,
      price: data.price,
      car: {
        make: data.make,
        year: data.year,
        model: data.model,
        color: data.carColor,
        category: data.category,
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
        gallery: data.gallery,
        numberPlate: data.carNumberPlate
      },
      isActive: true,
      isSold: false,
      salons: data.salon.trim(),
      gallery: filesUrls
    })
    await newOffer.save();

    res.status(200).json({id:newOffer?._id, message: "Sukcess"});
  } catch (err) {
    next(err)
  }
}

const updateOffert = async (req, res, next) => {
  try {
    const id = req.params?.offertId;
    const data = req.body?.data;
    if(!data || !id) return res.status(400).json({message: "Błędne zapytanie"});

    if (!data?.title || !data?.description || !data?.price || !data?.make || !data?.year || !data?.model || !data?.category || !data?.carColor || !data?.carFuelType || !data?.carPower || !data?.carEngCapacity || !data?.carDrive || !data?.carTrans || !data?.carGears || !data?.carDoors || !data?.vin || !data?.odometer || !data?.salon ) return res.status(400).json({message: "brak wartości"});

    const offert = await Offerts.findOneAndUpdate({_id: id, isSold: false}, {
      title: data.title,
      description: data.description,
      functionalities: data.functionalities,
      price: data.price,
      car: {
        make: data.make,
        year: data.year,
        model: data.model,
        color: data.carColor,
        category: data.category,
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
        numberPlate: data.carNumberPlate
      },
      salons: data.salon.trim(),
    }); 
    if(!offert) return res.status(404).json({message: "Nie można wykonać aktualizacji"})

    res.status(200).json({message: "Updated"});
  } catch (err) {
   next(err);
  }
}

module.exports = { getOffertsList, createOffert: createOffer, getFilteredOffertsList, updateOffert, getOffertDetails }