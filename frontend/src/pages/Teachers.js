import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";

function Teachers(){

const [teachers,setTeachers] = useState([]);

useEffect(()=>{

axios.get("http://localhost:5000/teachers") // ✅ FIXED URL
.then(res=>{
console.log("API DATA:", res.data); // ✅ DEBUG
setTeachers(res.data);
})
.catch(err=>{
console.log("API ERROR:", err); // ✅ DEBUG
});

},[]);

return(

<div style={{display:"flex"}}>

<Sidebar/>

<div style={page}>

<h1 style={{marginBottom:"20px"}}>👨‍🏫 Teachers</h1>

<Link to="/add-teacher">
<button style={addBtn}>+ Add Teacher</button>
</Link>

<table style={table}>

<thead>

<tr>

<th style={th}>Name</th>
<th style={th}>Email</th>
<th style={th}>Department</th>
<th style={th}>Subject</th>
<th style={th}>Phone</th>
<th style={th}>Teacher ID</th>

</tr>

</thead>

<tbody>

{teachers.length === 0 ? (
<tr>
<td colSpan="6" style={{textAlign:"center", padding:"20px"}}>
No Teachers Found ❌
</td>
</tr>
) : (

teachers.map((t,index)=>(

<tr key={index} style={row}>

<td style={td}>{t.name}</td>
<td style={td}>{t.email}</td>
<td style={td}>{t.department}</td>
<td style={td}>{t.subject}</td>
<td style={td}>{t.phone}</td>
<td style={td}>{t.teacherId}</td>

</tr>

))

)}

</tbody>

</table>

</div>

</div>

)

}

/* ---------- STYLES ---------- */

const page={
marginLeft:"240px",
padding:"40px",
background:"#f4f6f9",
minHeight:"100vh",
width:"100%"
}

const addBtn={
background:"#3498db",
color:"white",
border:"none",
padding:"10px 18px",
borderRadius:"6px",
cursor:"pointer",
marginBottom:"20px"
}

const table={
width:"100%",
background:"white",
borderCollapse:"collapse",
boxShadow:"0 4px 10px rgba(0,0,0,0.1)"
}

const th={
padding:"14px",
background:"#2c3e50",
color:"white",
textAlign:"left",
fontWeight:"600"
}

const td={
padding:"14px",
borderBottom:"1px solid #ddd"
}

const row={
background:"#fff"
}

export default Teachers;