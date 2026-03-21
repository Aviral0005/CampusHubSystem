const express = require("express");
const router = express.Router();

const Student = require("../models/Student");


/* ================= GET ALL STUDENTS ================= */

router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


/* ================= ADD STUDENT ================= */

router.post("/", async (req, res) => {
  try {
    const { name, rollNumber, course, year } = req.body;

    // ❗ check duplicate
    const existingStudent = await Student.findOne({ rollNumber });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists" });
    }

    /* 🔥 Save Student (WITH PASSWORD) */
    const student = new Student({
      name,
      rollNumber,
      course,
      year,
      password: rollNumber // 🔥 AUTO PASSWORD
    });

    await student.save();

    res.json({
      message: "Student added successfully",
      student
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


/* ================= GET STUDENT BY ROLL NUMBER ================= */

router.get("/:rollNumber", async (req, res) => {
  try {
    const student = await Student.findOne({
      rollNumber: req.params.rollNumber
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


/* ================= DELETE STUDENT ================= */

router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;