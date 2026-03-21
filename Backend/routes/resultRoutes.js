const express = require("express");
const router = express.Router();
const Result = require("../models/Result");


/* ---------------- GET RESULT BY ROLL NUMBER ---------------- */

router.get("/roll/:rollNumber", async (req,res)=>{

try{

const rollNumber = req.params.rollNumber;

const results = await Result.find({ rollNumber });

res.json(results);

}catch(err){

console.log(err);
res.status(500).json({message:"Server error"});

}

});


/* ---------------- ADD RESULT ---------------- */

router.post("/add", async (req, res) => {

try{

const { studentName, rollNumber, course, subjects } = req.body;

const subjectsWithGrade = subjects.map((s) => {

let grade = "Fail";

if (s.marks >= 90) grade = "A+";
else if (s.marks >= 80) grade = "A";
else if (s.marks >= 70) grade = "B";
else if (s.marks >= 60) grade = "C";

return {
name: s.name,
marks: s.marks,
grade
};

});

const result = new Result({
studentName,
rollNumber,
course,
subjects: subjectsWithGrade
});

await result.save();

res.json({
message:"Result added",
result
});

}catch(err){

console.log(err);
res.status(500).json({message:"Server error"});

}

});


/* ---------------- DELETE RESULT ---------------- */

router.delete("/delete/:id", async (req, res) => {

try{

await Result.findByIdAndDelete(req.params.id);

res.json({ message: "Result Deleted" });

}catch(err){

console.log(err);
res.status(500).json({message:"Server error"});

}

});


module.exports = router;