import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import * as XLSX from "xlsx";

import {
Chart as ChartJS,
ArcElement,
Tooltip,
Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function AttendanceList(){

const [records,setRecords] = useState([]);
const [search,setSearch] = useState("");
const [dateFilter,setDateFilter] = useState("");


/* FETCH DATA */

useEffect(()=>{

fetch("http://localhost:5000/attendance/2025")
.then(res=>res.json())
.then(data=>setRecords(data))
.catch(err=>console.log(err));

},[]);

/* DELETE */

const deleteRecord = async(id)=>{

await fetch(`http://localhost:5000/delete-attendance/${id}`,{
method:"DELETE"
});

setRecords(records.filter(r=>r._id !== id));

};

/* STUDENT STATS */

const studentStats = {};

records.forEach(r => {

if(!studentStats[r.studentName]){

studentStats[r.studentName] = {
present:0,
total:0
};

}

studentStats[r.studentName].total++;

if(r.status === "Present"){
studentStats[r.studentName].present++;
}

});

/* LOW ATTENDANCE */

const lowAttendanceStudents = Object.keys(studentStats).filter(name => {

const s = studentStats[name];
const percent = (s.present / s.total) * 100;

return percent < 75;

});

/* FILTER */

const filtered = records.filter(r=>{

return(
r.studentName.toLowerCase().includes(search.toLowerCase()) &&
r.date.includes(dateFilter)
)

});

/* COUNT */

const presentCount = records.filter(r=>r.status==="Present").length;
const absentCount = records.filter(r=>r.status==="Absent").length;

const total = presentCount + absentCount;

const percentage =
total === 0 ? 0 : ((presentCount / total) * 100).toFixed(1);

/* PIE CHART */

const chartData={
labels:["Present","Absent"],
datasets:[
{
data:[presentCount,absentCount],
backgroundColor:["#2ecc71","#e74c3c"]
}
]
};

/* EXPORT EXCEL */

const exportExcel = ()=>{

const worksheet = XLSX.utils.json_to_sheet(records);
const workbook = XLSX.utils.book_new();

XLSX.utils.book_append_sheet(workbook,worksheet,"Attendance");

XLSX.writeFile(workbook,"attendance.xlsx");

};

/* PDF */

const downloadPDF = ()=>{

const doc = new jsPDF();

doc.text("Attendance Report", 20, 10);

const tableData = records.map(r=>[
r.studentName,
r.date,
r.status
]);

autoTable(doc,{
head:[["Student","Date","Status"]],
body:tableData
});

doc.save("attendance-report.pdf");

};

return(

<div style={{
padding:"40px",
background:"#f4f6f9",
minHeight:"100vh"
}}>

<h1 style={{marginBottom:"25px"}}>Attendance Records</h1>

{/* LOW ATTENDANCE */}

{lowAttendanceStudents.length > 0 && (

<div style={{
background:"#ffe6e6",
padding:"15px",
borderRadius:"8px",
marginBottom:"20px",
color:"#c0392b",
fontWeight:"bold"
}}>

⚠ Low Attendance Alert

{lowAttendanceStudents.map(name=>(

<div key={name}>{name}</div>
))}

</div>

)}

{/* SEARCH */}

<div style={{
display:"flex",
gap:"20px",
marginBottom:"25px"
}}>

<input
placeholder="Search student..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
style={input}
/>

<input
type="date"
value={dateFilter}
onChange={(e)=>setDateFilter(e.target.value)}
style={input}
/>

<button onClick={exportExcel} style={excelBtn}>
Export Excel
</button>

<button onClick={downloadPDF} style={excelBtn}>
Download PDF
</button>

</div>

{/* CHART */}

<div style={{
display:"flex",
gap:"40px",
alignItems:"center",
marginBottom:"30px"
}}>

<div style={{width:"300px"}}>
<Pie data={chartData}/>
</div>

<div style={{
background:"white",
padding:"25px",
borderRadius:"12px",
boxShadow:"0 5px 15px rgba(0,0,0,0.1)"
}}>

<h2>Attendance Summary</h2>

<p style={{color:"#27ae60",fontWeight:"bold"}}>
Present : {presentCount}
</p>

<p style={{color:"#e74c3c",fontWeight:"bold"}}>
Absent : {absentCount}
</p>

<h3>Attendance % : {percentage}%</h3>

</div>

</div>

{/* TABLE */}

<div style={{
background:"white",
borderRadius:"10px",
boxShadow:"0 10px 25px rgba(0,0,0,0.15)",
overflow:"hidden"
}}>

<table style={{
width:"100%",
borderCollapse:"collapse"
}}>

<thead style={{
background:"linear-gradient(135deg,#34495e,#2c3e50)",
color:"white"
}}>

<tr>
<th style={th}>Student</th>
<th style={th}>Date</th>
<th style={th}>Status</th>
<th style={th}>Action</th>
</tr>

</thead>

<tbody>

{filtered.map((r)=>(

<tr key={r._id} style={row}>

<td style={td}>{r.studentName}</td>

<td style={td}>{r.date}</td>

<td style={td}>

<span style={{
padding:"6px 14px",
borderRadius:"20px",
color:"white",
background:r.status==="Present" ? "#27ae60" : "#e74c3c"
}}>
{r.status} </span>

</td>

<td style={td}>

<button
onClick={()=>deleteRecord(r._id)}
style={deleteBtn}

>

Delete </button>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

)

}

/* STYLES */

const th={ padding:"14px" };

const td={
padding:"14px",
textAlign:"center",
borderBottom:"1px solid #eee"
};

const row={ transition:"0.3s" };

const input={
padding:"10px",
borderRadius:"6px",
border:"1px solid #ccc"
};

const deleteBtn={
background:"#e74c3c",
border:"none",
color:"white",
padding:"6px 14px",
borderRadius:"6px",
cursor:"pointer"
};

const excelBtn={
background:"#27ae60",
border:"none",
color:"white",
padding:"10px 18px",
borderRadius:"6px",
cursor:"pointer"
};

export default AttendanceList;
