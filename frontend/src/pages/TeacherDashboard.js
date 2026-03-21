import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet, useNavigate } from "react-router-dom";

function TeacherDashboard(){

const navigate = useNavigate();

const teacherName = localStorage.getItem("teacherName");
const teacherId = localStorage.getItem("teacherId");
const role = localStorage.getItem("role");

useEffect(()=>{
if(!role || role !== "teacher"){
navigate("/teacher-login");
}
},[]);

const [students,setStudents] = useState([]);
const [selectedStudent,setSelectedStudent] = useState(null);
const [showStudents,setShowStudents] = useState(false);

const logout = () => {
localStorage.clear();
navigate("/");
};

useEffect(()=>{
axios.get("http://localhost:5000/students")
.then(res=>setStudents(res.data))
.catch(err=>console.log(err));
},[]);

return(

<div style={{display:"flex", fontFamily:"sans-serif"}}>

{/* ================= SIDEBAR ================= */}

<div style={{
width:"260px",
background:"linear-gradient(180deg,#020617,#0f172a)",
color:"white",
minHeight:"100vh",
padding:"20px"
}}>

<h2>🚀 Teacher Panel</h2>

<p><b>{teacherName}</b></p>
<p style={{opacity:0.6}}>ID: {teacherId}</p>

<button onClick={logout} style={logoutBtn}>Logout</button>

<hr style={{opacity:0.2}}/>

<ul style={{listStyle:"none",padding:0,lineHeight:"2.5"}}>

<li><Link to="/teacher-dashboard" style={linkStyle}>🏠 Dashboard</Link></li>
<li><Link to="/teacher-dashboard/attendance" style={linkStyle}>📅 Attendance</Link></li>
<li><Link to="/teacher-dashboard/attendance-list" style={linkStyle}>📋 Attendance List</Link></li>
<li><Link to="/teacher-dashboard/marks" style={linkStyle}>📝 Marks</Link></li>
<li><Link to="/teacher-dashboard/study-material" style={linkStyle}>📚 Material</Link></li>

</ul>

<hr style={{opacity:0.2}}/>

<div style={studentBox} onClick={()=>setShowStudents(!showStudents)}>
👨‍🎓 Students ({students.length})
</div>

{showStudents && (
<ul style={studentList}>
{students.map(s=>(
<li key={s._id} style={studentItem}
onClick={()=>{setSelectedStudent(s);setShowStudents(false);}}>
{s.name}
</li>
))}
</ul>
)}

</div>

{/* ================= MAIN ================= */}

<div style={{flex:1,background:"#f8fafc"}}>

{/* ===== TOP BAR ===== */}

<div style={topBar}>
<h2>Dashboard</h2>
<div>
🔔 &nbsp; 📅 {new Date().toLocaleDateString()}
</div>
</div>

<div style={{padding:"25px"}}>

{/* ===== CARDS ===== */}

<div style={grid}>

<div style={{...card,background:"#3b82f6"}}>
<h2>{students.length}</h2>
<p>Total Students</p>
</div>

<div style={{...card,background:"#10b981"}}>
<h2>92%</h2>
<p>Attendance</p>
</div>

<div style={{...card,background:"#f59e0b"}}>
<h2>5</h2>
<p>Pending Tasks</p>
</div>

<div style={{...card,background:"#ef4444"}}>
<h2>2</h2>
<p>Alerts</p>
</div>

</div>

{/* ===== WELCOME ===== */}

<div style={welcomeBox}>
<h3>Welcome back, {teacherName} 👋</h3>
<p>Teacher ID: {teacherId}</p>
</div>

{/* ===== STUDENT DETAILS ===== */}

{selectedStudent && (
<div style={studentCard}>
<h3>👨‍🎓 Student Details</h3>
<p><b>Name:</b> {selectedStudent.name}</p>
<p><b>Roll:</b> {selectedStudent.rollNumber}</p>
<p><b>Course:</b> {selectedStudent.course}</p>
<p><b>Year:</b> {selectedStudent.year}</p>
</div>
)}

<Outlet/>

</div>

</div>

</div>

)

}

/* ================= STYLES ================= */

const linkStyle = {
color:"white",
textDecoration:"none"
};

const logoutBtn = {
margin:"10px 0",
padding:"8px",
background:"#ef4444",
border:"none",
borderRadius:"6px",
color:"#fff",
cursor:"pointer",
width:"100%"
};

const studentBox = {
background:"#1e293b",
padding:"10px",
borderRadius:"6px",
cursor:"pointer",
marginTop:"10px"
};

const studentList = {
listStyle:"none",
padding:"10px",
maxHeight:"200px",
overflowY:"auto"
};

const studentItem = {
padding:"6px",
cursor:"pointer",
borderRadius:"5px",
marginBottom:"5px",
background:"#0f172a"
};

const topBar = {
display:"flex",
justifyContent:"space-between",
alignItems:"center",
padding:"15px 25px",
background:"#ffffff",
boxShadow:"0 2px 6px rgba(0,0,0,0.1)"
};

const grid = {
display:"grid",
gridTemplateColumns:"repeat(4,1fr)",
gap:"20px",
marginBottom:"20px"
};

const card = {
padding:"20px",
borderRadius:"12px",
color:"#fff",
textAlign:"center",
fontWeight:"bold",
transition:"0.3s",
cursor:"pointer"
};

const welcomeBox = {
background:"#fff",
padding:"20px",
borderRadius:"12px",
boxShadow:"0 2px 8px rgba(0,0,0,0.1)",
marginBottom:"20px"
};

const studentCard = {
background:"#fff",
padding:"20px",
borderRadius:"12px",
boxShadow:"0 2px 8px rgba(0,0,0,0.1)"
};

export default TeacherDashboard;