const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({

name:{
type:String,
required:true
},

email:String,
department:String,
subject:String,
phone:String,

teacherId:{
type:String
},

password:{
type:String
}

});

module.exports = mongoose.model("Teacher",TeacherSchema);