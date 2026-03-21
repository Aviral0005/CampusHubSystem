import ProtectedRoute from "./components/ProtectedRoute";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import Attendance from "./pages/Attendance";
import AttendanceList from "./pages/AttendanceList";
import Notice from "./pages/Notice";
import StudentProfile from "./pages/StudentProfile";

import AddTeacher from "./pages/AddTeacher";
import Teachers from "./pages/Teachers";
import EditTeacher from "./pages/EditTeacher";

import Subjects from "./pages/Subjects";
import Fees from "./pages/Fees";
import Results from "./pages/Results";

import StudentResult from "./pages/StudentResult";
import StudentDashboard from "./pages/StudentDashboard";
import StudentAttendance from "./pages/StudentAttendance";

import TeacherLogin from "./pages/TeacherLogin";
import AdminLogin from "./pages/AdminLogin";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudyMaterial from "./pages/StudyMaterial";
import StudentMaterials from "./pages/StudentMaterials";
import StudentNotices from "./pages/StudentNotices";

function App() {
  return (
    <Router>

      <Routes>

        {/* Home + Login */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Panel */}
        <Route
path="/dashboard"
element={
<ProtectedRoute role="admin">
<Dashboard/>
</ProtectedRoute>
}
/>
        <Route path="/students" element={<Students />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/attendance-list" element={<AttendanceList />} />
        <Route path="/notices" element={<Notice />} />
        <Route path="/student/:id" element={<StudentProfile />} />
        <Route path="/add-teacher" element={<AddTeacher />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/edit-teacher/:id" element={<EditTeacher />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/fees" element={<Fees />} />
        <Route path="/results" element={<Results />} />
        <Route path="/student-materials" element={<StudentMaterials />} />
    {/* Notice path */}

        <Route path="/student-notices" element={<StudentNotices/>}/>

        {/* Student Portal */}
        <Route
path="/student-dashboard"
element={
<ProtectedRoute role="student">
<StudentDashboard/>
</ProtectedRoute>
}
/>
        <Route path="/student-results" element={<StudentResult />} />
        <Route path="/student-attendance" element={<StudentAttendance />} />

        {/* Teacher Login */}
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Teacher Panel */}
        <Route
path="/teacher-dashboard"
element={
<ProtectedRoute role="teacher">
<TeacherDashboard/>
</ProtectedRoute>
}
>

          <Route
            index
            element={<h2 style={{ padding: "40px" }}>Welcome Teacher</h2>}
          />

          <Route path="attendance" element={<Attendance />} />

          <Route path="attendance-list" element={<AttendanceList />} />

          <Route path="marks" element={<Results />} />

          <Route path="study-material" element={<StudyMaterial />} />

          

        </Route>

      </Routes>

    </Router>
  );
}

export default App;