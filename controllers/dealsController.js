const Deals = require('../models/deals');
const Users = require('../models/user');
const Offerts = require('../models/offerts');

const createDeal = async (req,res,next) => {
  try {
    const data = req?.body?.data;
    if(!data) return res.status(400).json({message: "Błędne zapytanie"});

    const number = await Deals.estimatedDocumentCount() + 1;
    const userId = await Users.findOne({email: req.email}).select('_id');
    console.log(userId)
    const newDeal = new Deals({
      number: number,
      offert: data.offert,
      user: userId,
      dateAdd: Date.now(),
      buyerDetails: {
        name: data.name,
        address: data.address,
        phoneNumber: data.phone,
        nip: data?.nip,
        pesel: data.pesel,
        personalIdNumber: data.personalIdNumber,
        personalIdVerifiedBy: data.personalIdVerifiedBy
      }
    });

    const result = await newDeal.save();
    const resOffert = await Offerts.findOneAndUpdate(
      {_id: data.offert},
      {
        isSold: true
      }
    );

      
    console.log("RESULT:  ",result)
    console.log("resOFFERT:  ",resOffert)

    res.status(200).json({message: "Utworzno"})
  } catch (err) {
    next(err)
  }
}

const getPdf = async (req,res,next) => {

}

module.exports = {createDeal}