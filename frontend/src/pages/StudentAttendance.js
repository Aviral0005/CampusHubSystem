import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function StudentAttendance(){

const [attendance,setAttendance] = useState([]);

const studentName = localStorage.getItem("studentName");
const rollNumber = localStorage.getItem("studentId");

useEffect(()=>{

fetch(`https://campushub-backend-6r2u.onrender.com/attendance/${rollNumber}`)
.then(res=>res.json())
.then(data=>setAttendance(data));

},[]);

/* CALCULATE PERCENTAGE */

const calculatePercentage = ()=>{

if(attendance.length===0) return 0;

const present = attendance.filter(
a => a.status==="Present"
).length;

return ((present/attendance.length)*100).toFixed(1);

};

/* DOWNLOAD PDF */

const downloadPDF = async ()=>{

const input = document.getElementById("attendanceReport");

const canvas = await html2canvas(input);

const imgData = canvas.toDataURL("image/png");

const pdf = new jsPDF();

pdf.addImage(imgData,"PNG",10,10,180,120);

pdf.save("AttendanceReport.pdf");

};

return(

<div style={page}>

<div id="attendanceReport" style={card}>

<h2 style={title}>📅 My Attendance</h2>

<div style={profile}>

<div>

<p><b>Name:</b> {studentName}</p>
<p><b>Roll No:</b> {rollNumber}</p>

</div>

<div style={percentageBox}>

{calculatePercentage()}%

<p style={{fontSize:"12px"}}>Attendance</p>

</div>

</div>

<table style={table}>

<thead style={thead}>

<tr>
<th>Date</th>
<th>Status</th>
</tr>

</thead>

<tbody>

{attendance.map((a,i)=>(

<tr key={i} style={row}>

<td>{a.date}</td>

<td style={{
color:a.status==="Present"?"green":"red",
fontWeight:"bold"
}}>
{a.status}
</td>

</tr>

))}

</tbody>

</table>

</div>

<button onClick={downloadPDF} style={button}>
Download Attendance Report
</button>

</div>

)

}

/* ---------- STYLES ---------- */

const page={
padding:"40px",
background:"linear-gradient(135deg,#eef2f3,#dfe9f3)",
minHeight:"100vh"
};

const card={
background:"#fff",
padding:"30px",
borderRadius:"12px",
maxWidth:"600px",
boxShadow:"0 10px 25px rgba(0,0,0,0.1)"
};

const title={
marginBottom:"20px"
};

const profile={
display:"flex",
justifyContent:"space-between",
marginBottom:"20px"
};

const percentageBox={
background:"#2ecc71",
color:"#fff",
padding:"15px",
borderRadius:"10px",
textAlign:"center",
fontSize:"20px",
fontWeight:"bold"
};

const table={
width:"100%",
borderCollapse:"collapse"
};

const thead={
background:"#34495e",
color:"#fff"
};

const row={
borderBottom:"1px solid #ddd",
textAlign:"center"
};

const button={
marginTop:"20px",
padding:"10px 20px",
border:"none",
borderRadius:"6px",
background:"#3498db",
color:"#fff",
cursor:"pointer"
};

export default StudentAttendance;
