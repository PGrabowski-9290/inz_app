const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offertsSchema = new Schema({
  number:{
    type: Schema.Types.Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  functionalities: [{
    type: String
  }],
  price: {
    type: String,
    required: true
  },
  car: {
    make: {
      type: String,
      required: true
    },
    year: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    category: [{
      type: String,
      required: true
    }],
    color: {
      type: String,
      required: true
    },
    engine: {
      fuelType: {
        type: String,
        required: true
      },
      power: {
        type: String,
        required: true
      },
      capacity: {
        type: String,
        required: true
      }
    },
    drive: {
      type: String,
      required: true
    },
    transmission: {
      type: String,
      required: true
    },
    gears: {
      type: String,
      required: true
    },
    doorsNumber:{
      type: String,
      required: true
    },
    vin: {
      type: String,
      required: true
    },
    odometer: {
      type: String,
      required: true
    },
    numberPlate: {
      type: String
    }
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  },
  isSold: {
    type: Boolean,
    required: true,
    default: false
  },
  salons: {
    type: Schema.Types.ObjectId,
    ref: 'salons',
    required: true
  },
  gallery: [{
    type: String
  }]
});

module.exports = Offerts = mongoose.model('offerts', offertsSchema);