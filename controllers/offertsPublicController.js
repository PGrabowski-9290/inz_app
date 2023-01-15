const Offerts = require("../models/offerts");

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
    var filter = req.body?.filter;
    const isActive = req.body?.isActive || true;
    const isSold = false;
    filter = {... isSold, isActive: isActive}
    const result = await Offerts.find({filter}).select("car.engine car.make car.year car.model car.odometer title price salons gallery")
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