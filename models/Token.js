const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  token: { type: String, required: true },
  type: { type: String, enum: ['email_verify','password_reset'], required: true },
  createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 } // tokens expire (24h)
});

module.exports = mongoose.model('Token', tokenSchema);