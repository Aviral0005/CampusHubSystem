const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({

studentName: String,
rollNumber: String,
date: String,
status: String

});

module.exports = mongoose.model("Attendance", attendanceSchema);