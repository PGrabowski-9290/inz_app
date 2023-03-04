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
    required: true,
    default: 'user'
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
    required: true,
    default: false
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  }
});

module.exports = User = mongoose.model('user', UserSchema);