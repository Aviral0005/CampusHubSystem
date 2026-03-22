import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function StudentResults(){

const [results,setResults] = useState([]);

useEffect(()=>{

const fetchResults = async ()=>{

try{

const rollNumber = localStorage.getItem("studentId");

const res = await axios.get(
`https://campushub-backend-6r2u.onrender.com/api/results/roll/${rollNumber}`
);

setResults(res.data);

}catch(err){

console.log(err);

}

};

fetchResults();

},[]);

/* TOTAL */

const calculateTotal = (subjects)=>{
let total = 0;
subjects.forEach((s)=>{
total += Number(s.marks);
});
return total;
};

/* PERCENTAGE */

const calculatePercentage = (subjects)=>{
const total = calculateTotal(subjects);
return (total / subjects.length).toFixed(2);
};

/* DOWNLOAD PDF */

const downloadPDF = async ()=>{

const input = document.getElementById("marksheet");

const canvas = await html2canvas(input);

const imgData = canvas.toDataURL("image/png");

const pdf = new jsPDF();

pdf.addImage(imgData,"PNG",10,10,180,120);

pdf.save("StudentMarksheet.pdf");

};

return(

<div style={page}>

<h2 style={title}>🎓 My Result</h2>

{results.map((r)=>{

const total = calculateTotal(r.subjects);
const percentage = calculatePercentage(r.subjects);

return(

<div key={r._id} style={card} id="marksheet">

{/* Student Header */}

<div style={header}>

<h3 style={{margin:0}}>{r.studentName}</h3>

<span style={badge}>
{percentage}%
</span>

</div>

{/* Table */}

<table style={table}>

<thead style={thead}>

<tr>
<th>Subject</th>
<th>Marks</th>
<th>Grade</th>
</tr>

</thead>

<tbody>

{r.subjects.map((s,index)=>(

<tr key={index} style={row}>

<td>{s.name}</td>
<td>{s.marks}</td>
<td>{s.grade}</td>

</tr>

))}

</tbody>

</table>

{/* Summary */}

<div style={summary}>

<p>Total Marks: <b>{total}</b></p>

<p>Percentage: <b>{percentage}%</b></p>

</div>

{/* Download Button */}

<button
onClick={downloadPDF}
style={button}

>

⬇ Download Marksheet </button>

</div>

);

})}

</div>

);

}

/* ---------- STYLES ---------- */

const page={
padding:"40px",
background:"linear-gradient(135deg,#eef2f3,#dfe9f3)",
minHeight:"100vh"
};

const title={
marginBottom:"25px",
fontSize:"28px",
fontWeight:"600"
};

const card={
background:"#fff",
padding:"25px",
borderRadius:"12px",
boxShadow:"0 10px 25px rgba(0,0,0,0.1)",
maxWidth:"520px"
};

const header={
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:"15px"
};

const badge={
background:"#2ecc71",
color:"#fff",
padding:"6px 12px",
borderRadius:"20px",
fontWeight:"bold"
};

const table={
width:"100%",
borderCollapse:"collapse",
textAlign:"center",
marginBottom:"15px"
};

const thead={
background:"#34495e",
color:"#fff"
};

const row={
borderBottom:"1px solid #ddd"
};

const summary={
display:"flex",
justifyContent:"space-between",
marginBottom:"15px"
};

const button={
background:"#3498db",
color:"#fff",
border:"none",
padding:"10px 20px",
borderRadius:"6px",
cursor:"pointer",
fontWeight:"bold"
};

export default StudentResults;
