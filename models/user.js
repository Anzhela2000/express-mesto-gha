const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  about: {
    type: String,
    required: true,
    maxlength: 30
  },
  avatar: {
    type: String,
    required: true
  }
});

const User = mongoose.model('user', userSchema);

module.exports = User;