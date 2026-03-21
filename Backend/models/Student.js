const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  rollNumber: {
    type: String,
    unique: true,
    required: true
  },

  course: {
    type: String,
    required: true
  },

  year: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    default: "student"
  }

});

module.exports = mongoose.model("Student", StudentSchema);