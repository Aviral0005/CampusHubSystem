const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({

studentName: String,
rollNumber: String,
course: String,

subjects: [
{
name: String,
marks: Number,
grade: String
}
]

});

module.exports = mongoose.model("Result", resultSchema);