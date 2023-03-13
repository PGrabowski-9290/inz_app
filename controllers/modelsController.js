const ModelsList = require('../models/model_list')
const FilterBuilder = require('../utils/filterBuilder')
const get = async (req, res, next) => {
  try{
    const data = req?.body
    const filterObj = new FilterBuilder()
    if ( !data?.make ){
      return res.status(400).json({message: "Pole wymagane: make"})
    }

    filterObj.addField("Make", data.make)

    if ( data?.category ) {
      filterObj.addField("Category", data.category)
    }
    if ( data?.year ){
      filterObj.addField("Year", data.year)
    }

    console.log(filterObj.get())

    const results = await ModelsList.find({sort: {"Model": 1}}).distinct("Model", filterObj.get())
    console.log(results)

    res.status(200).json({list: results, message: "Sukces"})
  }catch (err) {
    next(err)
  }
}

module.exports = { get }