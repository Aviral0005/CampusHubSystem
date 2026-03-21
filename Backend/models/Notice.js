const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Notice", noticeSchema);