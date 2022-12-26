const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salonsSchema = new Schema({
  location: {
    city: {
      type: String,
      required: true
    },
    street: {
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
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: "user"
  }],
  isActive: bool
});

module.exports = Salons = mongoose.model('salons', salonsSchema);