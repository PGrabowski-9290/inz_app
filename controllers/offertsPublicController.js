const Offerts = require("../models/offerts");
const FilterBuilder = require('../utils/filterBuilder')
const getOffertsListPublic = async (req, res, next) => {
  try {
    const result = await Offerts.find({ isSold: false, isActive: true}).select("car.engine car.make car.year car.model car.odometer title price salons gallery");
    if (!result) return res.status(404).json({ message: "Nie znaleziono"});

    res.status(200).json({data: result ,message: "Success"});
  } catch (err) {
    next(err);
  }
}

const getFilteredOffertsListPublic = async (req, res, next) => {
  try {
    const filter = req?.body?.filter;
    if (!filter) return res.status(401).json({message: "błąd zapytania"});
    const filterObj = new FilterBuilder();

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

    console.log(filterObj.get());

    const result = await Offerts.find(filterObj.get()).select("car.engine car.make car.year car.model car.odometer title price salons gallery")
    if(!result) return res.status(404).json({message: "Nie odnaleziono obiektu"});

    res.status(200).json({data: result, message: "Done"});
  } catch (error) {
    next(error);
  }
}

const getOffertDetailsPublic = async (req, res, next) => {
    try {
        const id = req.params?.offertId;
        
        const result = await Offerts.findOne({_id: id}).select('-isActive -isSold');
        if(!result) return res.status(404).json({message: "Nie odnaleziono"})

        res.status(200).json({data: result, message: "Success"})
    }catch (err) {
        next(err)
    }
}

module.exports = { getOffertsListPublic, getFilteredOffertsListPublic, getOffertDetailsPublic }