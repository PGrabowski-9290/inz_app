const Deals = require('../models/deals');
const Users = require('../models/user');
const Offerts = require('../models/offerts');
const fs = require('fs');
const { PDFDocument, StandardFonts } = require('@visaright/pdf-lib');
const util = require('util');

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
  try {
    
    const data = {
      "date": "a",
      "city": "a",
      "sellerName": "a",
      "sellerPesel": "a",
      "sellerNIP": "a",
      "address": "a",
      "personalId": "a",
      "idVerBy": "a",
      "buyerName": "a",
      "buyerPesel": "a",
      "buyerNIP": "a",
      "BuyerAddress": "a",
      "buyerId": "a",
      "buyerIdVerBy": "a",
      "car": "a",
      "carYear": "a",
      "vin": "a",
      "numberPlate": "a",
      "odometer": "a",
      "price": "a"
    }

    const readFile = util.promisify(fs.readFile)
    const file = await readFile('./config/umowa-form.pdf');
    const pdfFile = await PDFDocument.load(file, {updateMetadata: false});
    const font = await pdfFile.embedFont(StandardFonts.Courier);
    const pdfForm = pdfFile.getForm();
    Object.keys(data).forEach(el => {
      const field = pdfForm.getTextField(el);
      field.setText(data[el]);
      field.updateAppearances(font);
    })
    pdfForm.flatten();
    
    const pdfBytes = await pdfFile.save()
    fs.writeFile("filled.pdf", pdfBytes, () => {
      console.log("PDF DONE")
    })

    res.status(200).json({message: "tak"});
  } catch (err) {
    next(err)
  }
}

module.exports = {createDeal, getPdf}