const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emailHelper = require("../helpers/mail");

const crypto = require("crypto");

const userSchema = Schema({
  email: String,
  isVerified: {
    default: false,
    type: Boolean,
  },
  verificationCode: String,
  numberOfLegs: Number,
  favoriteTeacher: {
    default: 'Loi',
    type: String
  }
});

function generateRandomHexString(len) {
  return crypto
    .randomBytes(Math.ceil(len / 2))
    .toString("hex") // convert to hexadecimal format
    .slice(0, len)
    .toUpperCase(); // return required number of characters
};

userSchema.pre('save', function (next) {
  if (this.isNew) {
    const code = generateRandomHexString(10);
    this.verificationCode = code;
    emailHelper.sendEmailConfirmationLink(this.email, code);
    next()
  }
  next()
})


const User = mongoose.model("User", userSchema);
module.exports = User;
