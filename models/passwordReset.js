const mongoose = require('mongoose');

const passwordResetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  otp:{
    type:String,
    required:true,
  },

 
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600, // Expires automatically in 10 minutes (600 seconds)
  }
});

module.exports = mongoose.model('PasswordReset', passwordResetSchema);