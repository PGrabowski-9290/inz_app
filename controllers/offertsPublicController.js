const Offerts = require("../models/offerts");
const FilterBuilder = require('../utils/filterBuilder')
const getOffertsListPublic = async (req, res, next) => {
  try {
    const {limit = 10, page = 1} = req.query;
    const count = Math.ceil(await Offerts.countDocuments() / limit);
    
    const result = await Offerts.find({ isSold: false, isActive: true}).populate({path: 'salons', select: 'location contact _id'}).sort({ $natural:1}).select("car.engine car.make car.year car.model car.odometer title price salons gallery").skip(limit * (page - 1)).limit(limit * 1).exec();
    if (!result) return res.status(404).json({ message: "Nie znaleziono"});

    res.status(200).json({data: result, totalPages: count, message: "Success"});
  } catch (err) {
    next(err);
  }
}

const getFilteredOffertsListPublic = async (req, res, next) => {
  try {
    const {limit = 10, page = 1} = req.query;
    const filter = req?.body?.filter;
    if (!filter) return res.status(400).json({message: "błąd zapytania"});
    const filterObj = new FilterBuilder();

    if (filter?.make && filter?.make != ""){
      filterObj.addField("car.make",filter.make)
    }
    if (filter?.year && filter?.year != ""){
      filterObj.addField("car.year", filter.year)
    }
    if(filter?.model && filter?.model != ""){
      filterObj.addField("car.model", filter.model)
    }
    if(filter?.category && filter?.category != ""){
      filterObj.addField("car.category", filter.category)
    }
    if(filter?.fuel && filter?.fuel != ""){
      filterObj.addField("car.engine.fuelType", filter.fuel)
    }
    if(filter?.drive && filter?.drive != ""){
      filterObj.addField("car.drive", filter.drive)
    }
    if(filter?.transsmission && filter?.transsmission != ""){
      filterObj.addField("car.transmission", filter.transsmission)
    }
    if(filter?.salons && filter?.salons != ""){
      filterObj?.addField("salons", filter.salons)
    }

    console.log(filterObj.get())

    const count = Math.ceil(await Offerts.find(filterObj.get()).countDocuments() / limit);

    const result = await Offerts.find(filterObj.get()).populate({path: 'salons', select: 'location contact _id'}).sort({_id:1}).select("car.engine car.make car.year car.model car.odometer title price salons gallery").skip(limit * (page - 1)).limit(limit * 1).exec();
    if(!result) return res.status(404).json({message: "Nie odnaleziono obiektu"});

    res.status(200).json({data: result, totalPages: count, message: "Done"});
  } catch (error) {
    next(error);
  }
}

const getOffertDetailsPublic = async (req, res, next) => {
    try {
        const id = req.params?.offertId;
        
        const result = await Offerts.findOne({_id: id}).populate({path: 'salons', select: 'location contact _id'}).select('-isActive -isSold');
        if(!result) return res.status(404).json({message: "Nie odnaleziono"})

        res.status(200).json({data: result, message: "Success"})
    }catch (err) {
        next(err)
    }
}

module.exports = { getOffertsListPublic, getFilteredOffertsListPublic, getOffertDetailsPublic }