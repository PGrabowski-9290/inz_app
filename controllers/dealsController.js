const Deals = require('../models/deals');
const Users = require('../models/user');
const Offerts = require('../models/offerts');
const Settings = require('../models/settings');
const fs = require('fs');
const { PDFDocument} = require('@visaright/pdf-lib');
const fontkit = require('@pdf-lib/fontkit')
const util = require('util');

const createDeal = async (req,res,next) => {
  try {
    const data = req?.body?.data;
    if(!data) return res.status(400).json({message: "Błędne zapytanie"});

    const resOffert = await Offerts.findOne({_id: data.offert});
    if(!resOffert) return res.status(400).json({message: "Nie odnaleziono oferty"});
    if(resOffert.isSold === true) return res.status(400).json({message: "Wybrana ofert została już sprzedana"})

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
    resOffert.isSold = true;
    await resOffert.save();    

    res.status(200).json({id: result._id ,message: "Utworzno"})
  } catch (err) {
    next(err)
  }
}

const getPdf = async (req,res,next) => {
  try {
    const dealId = req.query?.id;
    if (!dealId) return res.status(400).json({message: "Bad Request"});

    const deal = await Deals.findOne({_id: dealId}).populate({path: 'offert', populate: {path: "salons"}}).exec();

    if (!deal) return res.status(400).json({message: "Błąd zapytania"});
    
    const defValues = await Settings.findOne({id: 0});

    console.log(deal);

    const data = {
      "date": deal.dateAdd.toString(),
      "city": deal.offert?.salons?.location?.city.toString(),
      "sellerName": defValues.companyDetails.name.toString(),
      "sellerNIP": defValues.companyDetails.nip.toString(),
      "address": defValues.companyDetails.street.toString()+" "+defValues.companyDetails.zipCode.toString()+" "+defValues.companyDetails.city.toString(),
      "buyerName": deal.buyerDetails.name.toString(),
      "buyerPesel": deal.buyerDetails?.pesel?.toString(),
      "buyerNIP": deal.buyerDetails?.nip?.toString(),
      "BuyerAddress": deal.buyerDetails.address.toString(),
      "buyerId": deal.buyerDetails.personalIdNumber.toString(),
      "buyerIdVerBy": deal.buyerDetails.personalIdVerifiedBy.toString(),
      "car": deal.offert?.car?.make.toString()+" "+deal.offert?.car?.model.toString(),
      "carYear": deal.offert?.car?.year.toString(),
      "vin": deal.offert?.car?.vin.toString(),
      "numberPlate": deal.offert?.car?.numberPlate?.toString(),
      "odometer": deal.offert?.car?.odometer.toString(),
      "price": deal.offert?.price.toString()
    }

    const readFile = util.promisify(fs.readFile)
    const file = await readFile('./config/umowa-form.pdf');
    const pdfFile = await PDFDocument.load(file, {updateMetadata: false});
    
    pdfFile.registerFontkit(fontkit);
    
    const font = fs.readFileSync("./config/font.ttf");
    const customFont = await pdfFile.embedFont(font)
    const pdfForm = pdfFile.getForm();

    const rawUpdateFieldAppearances = pdfForm.updateFieldAppearances.bind(pdfForm);
    pdfForm.updateFieldAppearances = function () {
      return rawUpdateFieldAppearances(customFont);
    };

    Object.keys(data).forEach(el => {
      const field = pdfForm.getTextField(el);
      field.setText(data[el]);
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