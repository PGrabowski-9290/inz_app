const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelsListSchema = new Schema({
  Make: {
    type: String
  },
  Year: {
    type: String
  },
  Model: {
    type: String
  },
  Category: [{
    type: String
  }] 
});

module.exports = ModelsList = mongoose.model('models', modelsListSchema);