const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  text: String,
  sender: String
}, { timestamps: true });

module.exports = mongoose.model("Chat", chatSchema);