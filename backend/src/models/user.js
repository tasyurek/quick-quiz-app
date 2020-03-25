const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    uniqe: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error({ error: "Invalid email!" });
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
});

const user = mongoose.model("User", userSchema);

module.exports = user;
