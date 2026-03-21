const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({

studentName: String,
amount: Number,
status: String

});

module.exports = mongoose.model("Fee", feeSchema);