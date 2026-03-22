const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

const Notice = require("./models/Notice");
const Result = require("./models/Result");
const Attendance = require("./models/Attendance");
const Student = require("./models/Student");
const Teacher = require("./models/Teacher");

const subjectRoutes = require("./routes/subjectRoutes");
const feeRoutes = require("./routes/feeRoutes");
const resultRoutes = require("./routes/resultRoutes");
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");
const aiRoute = require("./routes/ai");


const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/ai", aiRoute);

/* ================= ROUTES ================= */

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/results", resultRoutes);

/* ================= MULTER ================= */

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

/* ================= MATERIAL MODEL ================= */

const MaterialSchema = new mongoose.Schema({
  title: String,
  subject: String,
  file: String
});

const Material = mongoose.model("Material", MaterialSchema);

/* ================= TEST ================= */

app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

/* ================= STUDENT ================= */

app.post("/add-student", async (req, res) => {
  try {
    const { name, rollNumber, course, year } = req.body;

    const student = new Student({
      name,
      rollNumber: String(rollNumber),
      course,
      year,
      password: String(rollNumber)
    });

    await student.save();

    res.json({ message: "Student added successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

app.delete("/delete-student/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Student deleted" });
});

/* ================= TEACHER ================= */

app.post("/add-teacher", async (req, res) => {
  try {
    const { name, teacherId, email, department, subject, phone } = req.body;

    const teacher = new Teacher({
      name,
      teacherId,
      password: teacherId,
      email,
      department,
      subject,
      phone
    });

    await teacher.save();

    res.json({
      message: "Teacher added",
      login: { id: teacherId, password: teacherId }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= TEACHER ================= */

// ADD TEACHER
app.post("/add-teacher", async (req, res) => {
  try {
    const { name, teacherId, email, department, subject, phone } = req.body;

    const teacher = new Teacher({
      name,
      teacherId,
      password: teacherId,
      email,
      department,
      subject,
      phone
    });

    await teacher.save();

    res.json({
      message: "Teacher added",
      login: { id: teacherId, password: teacherId }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ YE ADD KAR (IMPORTANT)
app.get("/teachers", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= ATTENDANCE ================= */

/* MARK */
app.post("/mark-attendance", async (req, res) => {
  try {
    const { studentName, rollNumber, date, status } = req.body;

    const attendance = new Attendance({
      studentName,
      rollNumber: String(rollNumber), // 🔥 IMPORTANT
      date,
      status
    });

    await attendance.save();

    res.json({ message: "Attendance marked" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===== GET ALL ATTENDANCE ===== */
app.get("/attendance", async (req, res) => {
  try {
    const data = await Attendance.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* GET */
app.get("/attendance/:rollNumber", async (req, res) => {
  try {
    const data = await Attendance.find({
      rollNumber: req.params.rollNumber
    });

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



/* ================= MATERIAL ================= */

/* UPLOAD */
app.post("/upload-material", upload.single("file"), async (req, res) => {
  try {
    const material = new Material({
      title: req.body.title,
      subject: req.body.subject,
      file: req.file.filename
    });

    await material.save();

    res.json({ message: "Material uploaded" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= NOTICE ================= */

app.post("/add-notice", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;

    const notice = new Notice({
      title,
      description,
      image: req.file ? req.file.filename : "",
      date: new Date()
    });

    await notice.save();

    res.json({ message: "Notice added" });

  } catch (err) {
    res.status(500).json(err);
  }
});

// GET
app.get("/notices", async (req, res) => {
  const notices = await Notice.find().sort({ _id: -1 });
  res.json(notices);
});

// DELETE
app.delete("/delete-notice/:id", async (req, res) => {
  await Notice.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});
/* ================= DASHBOARD ================= */

app.get("/dashboard", async (req, res) => {
  try {
    const students = await Student.countDocuments();
    const teachers = await Teacher.countDocuments();
    const attendance = await Attendance.countDocuments();
    const notices = await Notice.countDocuments();
    const results = await Result.countDocuments();

    res.json({
      students,
      teachers, // future use
      attendance,
      notices,
      results
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/* ================= DASHBOARD COUNTS ================= */

// Total Students
app.get("/count/students", async (req, res) => {
  try {
    const count = await Student.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Total Teachers
app.get("/count/teachers", async (req, res) => {
  try {
    const count = await Teacher.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Attendance Records
app.get("/count/attendance", async (req, res) => {
  try {
    const count = await Attendance.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Notices
app.get("/count/notices", async (req, res) => {
  try {
    const count = await Notice.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Results
app.get("/count/results", async (req, res) => {
  try {
    const count = await Result.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* GET */
app.get("/materials", async (req, res) => {
  const materials = await Material.find();
  res.json(materials);
});

/* ================= MONGODB ================= */

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

/* ================= SERVER ================= */

app.listen(5000, () => {
  console.log("Server running on port 5000");
});