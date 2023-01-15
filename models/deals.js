const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dealsSchema = new Schema({
  number: {
    type: String,
    required: true
  },
  offert: {
    type: Schema.Types.ObjectId,
    ref: 'offerts',
    required: true
  },
  user:{
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  dateAdd: {
    type: Schema.Types.Date,
    default: Date.now()
  },
  buyerDetails: {
    name: {
      type: String,
      required: true
    },
    address: {
      city: {
        type: String
      },
      street: {
        type: String
      },
      zipCode: {
        type: String
      }
    },
    phoneNumber: {
      type: String,
      requred: true
    },
    nip: {
      type: String
    },
    pesel: {
      type: String,
      required: true
    },
    personalIdNumber: {
      type: String,
      required: true
    },
    personalIdVerifiedBy:{
      type: String,
      required: true
    }
  }
});

module.exports = Deals = mongoose.model('deals', dealsSchema);