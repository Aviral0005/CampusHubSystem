const express = require("express");
const router = express.Router();

const Student = require("../models/Student");
const Teacher = require("../models/Teacher");


/* ================= LOGIN ================= */

router.post("/login", async (req, res) => {
  try {
    const { id, password, role } = req.body;

    // ❗ basic validation
    if (!id || !password || !role) {
      return res.status(400).json({ message: "All fields required" });
    }

    /* ================= STUDENT LOGIN ================= */

    if (role === "student") {

      const student = await Student.findOne({
        rollNumber: id
      });

      if (!student) {
        return res.status(401).json({ message: "Student not found" });
      }

      if (student.password !== password) {
        return res.status(401).json({ message: "Invalid password" });
      }

      return res.json({
        message: "Student login successful",
        name: student.name,
        id: student.rollNumber,
        course: student.course,
        role: "student"
      });
    }

    /* ================= TEACHER LOGIN ================= */

    if (role === "teacher") {

      const teacher = await Teacher.findOne({
        teacherId: id
      });

      if (!teacher) {
        return res.status(401).json({ message: "Teacher not found" });
      }

      if (teacher.password !== password) {
        return res.status(401).json({ message: "Invalid password" });
      }

      return res.json({
        message: "Teacher login successful",
        name: teacher.name,
        id: teacher.teacherId,
        role: "teacher"
      });
    }

    /* ================= ADMIN LOGIN ================= */

    if (role === "admin") {

      if (id === "admin" && password === "admin123") {
        return res.json({
          message: "Admin login successful",
          name: "Administrator",
          id: "admin",
          role: "admin"
        });
      }

      return res.status(401).json({ message: "Invalid admin login" });
    }

    // ❗ invalid role
    return res.status(400).json({ message: "Invalid role" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;