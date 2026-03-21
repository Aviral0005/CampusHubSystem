const express = require("express");
const router = express.Router();

let subjects = [];

// Add Subject
router.post("/add", (req, res) => {

const { name, teacher } = req.body;

const subject = {
id: Date.now(),
name,
teacher
};

subjects.push(subject);

res.json(subject);

});

// Get Subjects
router.get("/", (req, res) => {

res.json(subjects);

});

// Delete Subject
router.delete("/:id", (req, res) => {

subjects = subjects.filter(s => s.id != req.params.id);

res.json({message:"Deleted"});

});

module.exports = router;