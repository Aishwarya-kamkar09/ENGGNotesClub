const { required } = require("joi");
const mongoose = require("mongoose");
const {Schema} = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");



const userSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  email: { type: String, lowercase: true, trim: true, unique: true, required: true },
  password: { type: String }, // hashed
  provider: { type: String, enum: ['local','google'], default: 'local' },
  providerId: { type: String }, // oauth id
  emailVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  refreshToken: { type: String }, // current valid refresh token (hashed)
  resetToken: String,
  resetTokenExpiry: Date,

  savedNotes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Note" }
  ],
  recentNotes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Note" }
  ],

  role: {
    type: String,
    enum: ["student", "teacher"],
    default: "student"
},
profileImage: {
    type: String,
    default: ""
},
online: {
    type: Boolean,
    default: false
}
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);