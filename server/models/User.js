const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
});

UserSchema.methods.changePassword = function(newPassword) {
  this.password = newPassword;
  return this.save();
};

module.exports = mongoose.model('User', UserSchema);
