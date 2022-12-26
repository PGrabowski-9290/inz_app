const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dealsSchema = new Schema({
  offer: {
    type: Schema.Types.ObjectId,
    ref: 'offers',
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
      type: String
    },
    nip: {
      type: String
    },
    pesel: {
      type: String
    },
    personalIdNumber: {
      type: String,
      required: true
    }
  }
});

module.exports = Deals = mongoose.model('deals', dealsSchema);