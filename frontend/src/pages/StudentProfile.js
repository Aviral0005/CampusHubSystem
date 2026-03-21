import React,{useEffect,useState} from "react";
import {useParams} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {Pie} from "react-chartjs-2";

import {
Chart as ChartJS,
ArcElement,
Tooltip,
Legend
} from "chart.js";

ChartJS.register(ArcElement,Tooltip,Legend);

function StudentProfile(){

const {id} = useParams();

const [student,setStudent] = useState(null);
const [attendance,setAttendance] = useState([]);
const [results,setResults] = useState([]);

useEffect(()=>{

fetch("http://localhost:5000/students")
.then(res=>res.json())
.then(data=>{

const s = data.find(st=>st._id===id);
setStudent(s);

});

fetch("http://localhost:5000/attendance")
.then(res=>res.json())
.then(data=>{

const filtered = data.filter(a=>a.studentName);
setAttendance(filtered);

});

fetch("http://localhost:5000/results")
.then(res=>res.json())
.then(data=>{

const filtered = data.filter(r=>r.rollNumber);
setResults(filtered);

});

},[id]);


if(!student){
return <h2>Loading...</h2>
}


const present = attendance.filter(a=>a.status==="Present").length;
const absent = attendance.filter(a=>a.status==="Absent").length;

const total = present + absent;

const percent = total===0 ? 0 : ((present/total)*100).toFixed(1);

const chartData={
labels:["Present","Absent"],
datasets:[
{
data:[present,absent],
backgroundColor:["#2ecc71","#e74c3c"]
}
]
};


return(

<div>

<Sidebar/>

<div style={{
marginLeft:"220px",
padding:"40px",
background:"#f4f6f9",
minHeight:"100vh"
}}>

<h1>Student Profile</h1>

<div style={{
background:"white",
padding:"25px",
borderRadius:"10px",
marginBottom:"30px"
}}>

<h2>{student.name}</h2>
<p>Roll Number : {student.rollNumber}</p>
<p>Course : {student.course}</p>
<p>Year : {student.year}</p>

</div>


<div style={{
display:"flex",
gap:"40px",
marginBottom:"40px"
}}>

<div style={{width:"300px"}}>
<Pie data={chartData}/>
</div>

<div style={{
background:"white",
padding:"20px",
borderRadius:"10px"
}}>

<h3>Attendance Summary</h3>

<p style={{color:"#27ae60"}}>Present : {present}</p>
<p style={{color:"#e74c3c"}}>Absent : {absent}</p>

<h2>Attendance % : {percent}%</h2>

</div>

</div>


<h2>Results</h2>

<table style={{
width:"100%",
background:"white",
borderRadius:"10px"
}}>

<thead>

<tr>
<th>Subject</th>
<th>Marks</th>
</tr>

</thead>

<tbody>

{results.map((r,index)=>(
<tr key={index}>
<td>{r.subject}</td>
<td>{r.marks}</td>
</tr>
))}

</tbody>

</table>

</div>

</div>

)

}

export default StudentProfile;