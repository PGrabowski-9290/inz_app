const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: {unique: true}
  },
  name:{
    type: String,
    required: true
  },
  role:{
    type: String,
    enum: ['admin', 'user'],
    required: true
  },
  password: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String
  },
  isSuperAdmin: {
    type: Boolean,
    enum: [true, false],
    default: false
  }
});

module.exports = User = mongoose.model('user', UserSchema);