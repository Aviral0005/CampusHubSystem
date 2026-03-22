import React, { useState, useEffect } from "react";
import axios from "axios";

function Subjects() {

const [subjects, setSubjects] = useState([]);
const [name, setName] = useState("");
const [teacher, setTeacher] = useState("");
const [search, setSearch] = useState("");

useEffect(() => {
fetchSubjects();
}, []);

const fetchSubjects = async () => {
const res = await axios.get("https://campushub-backend-6r2u.onrender.com/api/subjects");
setSubjects(res.data);
};

const addSubject = async () => {

if(!name || !teacher){
alert("Fill all fields");
return;
}

await axios.post("https://campushub-backend-6r2u.onrender.com/api/subjects/add",{name,teacher});

setName("");
setTeacher("");

fetchSubjects();

};

const deleteSubject = async (id) => {

await axios.delete(`https://campushub-backend-6r2u.onrender.com/api/subjects/${id}`);
fetchSubjects();

};

const filteredSubjects = subjects.filter((s)=>
s.name.toLowerCase().includes(search.toLowerCase())
);

return (

<div style={{
padding:"30px",
background:"#f4f6f9",
minHeight:"100vh"
}}>

<div style={{
background:"linear-gradient(135deg,#667eea,#764ba2)",
padding:"20px",
borderRadius:"12px",
color:"#fff",
marginBottom:"25px"
}}>
<h2>📚 Subject Management</h2>
<p style={{opacity:"0.8"}}>Manage subjects and teachers easily</p>
</div>


<div style={{
background:"#fff",
padding:"25px",
borderRadius:"12px",
boxShadow:"0 10px 25px rgba(0,0,0,0.1)"
}}>


<div style={{
display:"flex",
gap:"10px",
flexWrap:"wrap",
marginBottom:"20px"
}}>

<input
placeholder="Subject Name"
value={name}
onChange={(e)=>setName(e.target.value)}
style={{
padding:"10px",
borderRadius:"8px",
border:"1px solid #ddd",
flex:"1"
}}
/>

<input
placeholder="Teacher Name"
value={teacher}
onChange={(e)=>setTeacher(e.target.value)}
style={{
padding:"10px",
borderRadius:"8px",
border:"1px solid #ddd",
flex:"1"
}}
/>

<button
onClick={addSubject}
style={{
background:"#667eea",
color:"#fff",
border:"none",
padding:"10px 20px",
borderRadius:"8px",
cursor:"pointer",
fontWeight:"bold"
}}
>
➕ Add Subject
</button>

</div>


<input
placeholder="🔍 Search Subject..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
style={{
width:"300px",
padding:"10px",
borderRadius:"8px",
border:"1px solid #ddd",
marginBottom:"20px"
}}
/>


<table style={{
width:"100%",
borderCollapse:"collapse"
}}>

<thead>

<tr style={{
background:"#667eea",
color:"#fff"
}}>

<th style={{padding:"12px"}}>Subject</th>
<th style={{padding:"12px"}}>Teacher</th>
<th style={{padding:"12px"}}>Action</th>

</tr>

</thead>

<tbody>

{filteredSubjects.map((s)=>(
<tr key={s.id} style={{
borderBottom:"1px solid #eee",
textAlign:"center"
}}>

<td style={{padding:"12px"}}>{s.name}</td>

<td style={{padding:"12px"}}>{s.teacher}</td>

<td style={{padding:"12px"}}>

<button
onClick={()=>deleteSubject(s.id)}
style={{
background:"#ff4d4f",
color:"#fff",
border:"none",
padding:"6px 14px",
borderRadius:"6px",
cursor:"pointer"
}}
>
Delete
</button>

</td>

</tr>
))}

</tbody>

</table>

</div>

</div>

);

}

export default Subjects;