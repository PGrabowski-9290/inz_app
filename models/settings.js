const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const settingsSchema = new Schema({
  owner: {
    firstName: {
      type: String,
      required: true
    },
    surName: {
      type: String,
      required: true
    }
  },
  companyDetails: {
    name: {
      type: String,
      required: true
    },
    nip: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    }
  },
  contact: {
    phoneNumber: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  }
})

module.exports = Settings = mongoose.model('settings', settingsSchema);