import React, { useState, useEffect } from "react";

function Attendance() {

const [students,setStudents] = useState([]);
const [studentName,setStudentName] = useState("");
const [rollNumber,setRollNumber] = useState("");
const [status,setStatus] = useState("Present");
const [date,setDate] = useState(new Date().toISOString().split("T")[0]);

useEffect(()=>{

fetch("https://campushub-backend-6r2u.onrender.com/students")
.then(res=>res.json())
.then(data=>setStudents(data));

},[]);

/* SAVE ATTENDANCE */

const saveAttendance = async()=>{

await fetch("https://campushub-backend-6r2u.onrender.com/mark-attendance",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
studentName,
rollNumber,
status,
date
})
});

alert("Attendance Saved Successfully");

};

return(

<div>

<div style={page}>

<div style={card}>

<h2 style={title}>📅 Mark Attendance</h2>

<label style={label}>Select Student</label>

<select
value={studentName}
onChange={(e)=>{

const selectedStudent = students.find(
s => s.name === e.target.value
);

setStudentName(selectedStudent.name);
setRollNumber(selectedStudent.rollNumber);

}}
style={input}

>

<option>Select Student</option>

{students.map((s,i)=>(

<option key={i} value={s.name}>
{s.name} ({s.rollNumber})
</option>

))}

</select>

<label style={label}>Select Date</label>

<input
type="date"
value={date}
onChange={(e)=>setDate(e.target.value)}
style={input}
/>

<label style={label}>Attendance Status</label>

<select
value={status}
onChange={(e)=>setStatus(e.target.value)}
style={input}

>

<option value="Present">✅ Present</option>
<option value="Absent">❌ Absent</option>

</select>

<button onClick={saveAttendance} style={button}>
Save Attendance
</button>

</div>

</div>

</div>

)

}

/* ---------- STYLES ---------- */

const page={
marginLeft:"220px",
minHeight:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"linear-gradient(135deg,#e0ecff,#f4f6f9)"
}

const card={
background:"white",
padding:"40px",
width:"400px",
borderRadius:"14px",
boxShadow:"0 15px 35px rgba(0,0,0,0.15)"
}

const title={
textAlign:"center",
marginBottom:"30px",
color:"#2c3e50"
}

const label={
display:"block",
marginBottom:"6px",
marginTop:"15px",
fontWeight:"600",
color:"#555"
}

const input={
width:"100%",
padding:"10px",
borderRadius:"8px",
border:"1px solid #ccc",
outline:"none",
fontSize:"14px"
}

const button={
marginTop:"25px",
width:"100%",
padding:"12px",
border:"none",
borderRadius:"8px",
background:"linear-gradient(135deg,#16a085,#1abc9c)",
color:"white",
fontSize:"16px",
cursor:"pointer",
fontWeight:"bold"
}

export default Attendance;
