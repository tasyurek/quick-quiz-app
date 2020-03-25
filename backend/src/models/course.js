const mongoose = require("mongoose");
const validator = require("validator");

const courseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User"
  }
});

const course = mongoose.model("Course", courseSchema);

module.exports = course;
