const mongoose = require("mongoose");
const validator = require("validator");

const assignmentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  }
});

const assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = assignment;
