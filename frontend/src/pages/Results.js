import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Results() {

const [results,setResults] = useState([]);
const [students,setStudents] = useState([]);

const [studentName,setStudentName] = useState("");
const [rollNumber,setRollNumber] = useState("");
const [course,setCourse] = useState("");

const [searchRoll,setSearchRoll] = useState("");

const [subjects,setSubjects] = useState([{ name:"", marks:"" }]);

useEffect(()=>{
fetchResults();
fetchStudents();
},[]);

/* FETCH RESULTS */

const fetchResults = async ()=>{
try{
const res = await axios.get("https://campushub-backend-6r2u.onrender.com/api/results");
setResults(res.data);
}catch(err){
console.log(err);
}
};

/* FETCH STUDENTS */

const fetchStudents = async ()=>{
try{
const res = await axios.get("https://campushub-backend-6r2u.onrender.com/api/students");
setStudents(res.data);
}catch(err){
console.log(err);
}
};

/* SELECT STUDENT */

const handleStudentChange = (e)=>{
const student = students.find(s=>s._id === e.target.value);
if(!student) return;

setStudentName(student.name);
setRollNumber(student.rollNumber);
setCourse(student.course);
};

/* SEARCH RESULT */

const searchResult = async ()=>{
try{
const res = await axios.get(
`https://campushub-backend-6r2u.onrender.com/api/results/roll/${searchRoll}`
);
setResults(res.data);
}catch(err){
console.log(err);
}
};

/* ADD SUBJECT */

const addSubject = ()=>{
setSubjects([...subjects,{name:"",marks:""}]);
};

/* HANDLE SUBJECT */

const handleSubjectChange = (index,field,value)=>{
const updated=[...subjects];
updated[index][field]=value;
setSubjects(updated);
};

/* ADD RESULT */

const addResult = async ()=>{

await axios.post("https://campushub-backend-6r2u.onrender.com/api/results/add",{
studentName,
rollNumber,
course,
subjects
});

setStudentName("");
setRollNumber("");
setCourse("");
setSubjects([{name:"",marks:""}]);

fetchResults();
};

/* DELETE RESULT */

const deleteResult = async(id)=>{
await axios.delete(`https://campushub-backend-6r2u.onrender.com/api/results/${id}`);
fetchResults();
};

/* TOTAL */

const calculateTotal = (subjects)=>{
let total=0;
subjects.forEach((s)=>{
total+=Number(s.marks);
});
return total;
};

/* PERCENTAGE */

const calculatePercentage = (subjects)=>{
let total = calculateTotal(subjects);
return (total/subjects.length).toFixed(2);
};

/* GRADE */

const calculateGrade = (marks)=>{

if(marks>=90) return "A+";
if(marks>=80) return "A";
if(marks>=70) return "B+";
if(marks>=60) return "B";
if(marks>=50) return "C";
if(marks>=40) return "D";

return "F";
};

/* DOWNLOAD PDF */

const downloadPDF = async ()=>{

const input=document.getElementById("marksheet");

const canvas=await html2canvas(input,{scale:3});

const imgData=canvas.toDataURL("image/png");

const pdf=new jsPDF();

pdf.addImage(imgData,"PNG",10,10,180,120);

pdf.save("marksheet.pdf");
};

return(

<div style={page}>

<h2 style={title}>📊 Result Management</h2>

{/* RESULT FORM */}

<div style={card}>

<select onChange={handleStudentChange} style={input}>
<option>Select Student</option>

{students.map((s)=>(

<option key={s._id} value={s._id}>
{s.name} - {s.course} ({s.rollNumber})
</option>
))}

</select>

<input
placeholder="Roll Number"
value={rollNumber}
readOnly
style={input}
/>

<input
placeholder="Course"
value={course}
readOnly
style={input}
/>

{/* SEARCH */}

<div style={{marginTop:"10px"}}>

<input
placeholder="Search Roll Number"
value={searchRoll}
onChange={(e)=>setSearchRoll(e.target.value)}
style={input}
/>

<button onClick={searchResult} style={searchBtn}>
Search Result
</button>

</div>

<h3>Subjects</h3>

{subjects.map((s,index)=>(

<div key={index} style={{display:"flex",gap:"10px"}}>

<input
placeholder="Subject"
value={s.name}
onChange={(e)=>handleSubjectChange(index,"name",e.target.value)}
style={input}
/>

<input
placeholder="Marks"
value={s.marks}
onChange={(e)=>handleSubjectChange(index,"marks",e.target.value)}
style={input}
/>

</div>

))}

<button onClick={addSubject} style={addBtn}>
➕ Add Subject
</button>

<br/><br/>

<button onClick={addResult} style={saveBtn}>
Add Result
</button>

</div>

{/* RESULT TABLE */}

<div style={card}>

<h3>Result List</h3>

<table style={table}>

<thead style={thead}>
<tr>
<th>Student</th>
<th>Subject</th>
<th>Marks</th>
<th>Grade</th>
<th>Total</th>
<th>%</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{results.map((r)=>(

r.subjects.map((s,index)=>(

<tr key={index} style={row}>

<td>{r.studentName}</td>
<td>{s.name}</td>
<td>{s.marks}</td>
<td>{calculateGrade(s.marks)}</td>
<td>{calculateTotal(r.subjects)}</td>
<td>{calculatePercentage(r.subjects)}%</td>

<td>

<button
onClick={()=>deleteResult(r._id)}
style={deleteBtn}

>

Delete </button>

</td>

</tr>

))

))}

</tbody>

</table>

</div>

{/* MARKSHEET */}

<div style={card} id="marksheet">

<h2 style={{textAlign:"center"}}>CampusHub University</h2>
<p style={{textAlign:"center"}}>Official Student Marksheet</p>
<hr/>

{results.map((r)=>{

const total = calculateTotal(r.subjects);
const percentage = calculatePercentage(r.subjects);

return(

<div key={r._id} style={{marginBottom:"20px"}}>

<h4>{r.studentName}</h4>

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
<td>{calculateGrade(s.marks)}</td>
</tr>

))}

</tbody>

</table>

<p>Total : <b>{total}</b></p>
<p>Percentage : <b>{percentage}%</b></p>

</div>

);

})}

<button onClick={downloadPDF} style={pdfBtn}>
Download Marksheet PDF
</button>

</div>

</div>

);

}

/* ---------- STYLES ---------- */

const page={
padding:"30px",
background:"linear-gradient(135deg,#eef2f3,#dfe9f3)",
minHeight:"100vh"
};

const title={marginBottom:"20px"};

const card={
background:"#fff",
padding:"25px",
borderRadius:"10px",
boxShadow:"0 10px 25px rgba(0,0,0,0.1)",
marginBottom:"20px"
};

const input={
padding:"8px",
margin:"5px"
};

const searchBtn={
background:"#3498db",
color:"#fff",
border:"none",
padding:"8px 15px",
borderRadius:"5px",
cursor:"pointer"
};

const addBtn={
background:"#8e44ad",
color:"#fff",
border:"none",
padding:"8px 15px",
borderRadius:"5px",
cursor:"pointer"
};

const saveBtn={
background:"#27ae60",
color:"#fff",
border:"none",
padding:"10px 20px",
borderRadius:"5px",
cursor:"pointer"
};

const deleteBtn={
background:"red",
color:"#fff",
border:"none",
padding:"5px 10px",
borderRadius:"5px",
cursor:"pointer"
};

const pdfBtn={
background:"#2c7be5",
color:"#fff",
border:"none",
padding:"10px 20px",
borderRadius:"5px",
cursor:"pointer"
};

const table={
width:"100%",
borderCollapse:"collapse",
textAlign:"center"
};

const thead={
background:"#34495e",
color:"#fff"
};

const row={
borderBottom:"1px solid #ddd"
};

export default Results;
