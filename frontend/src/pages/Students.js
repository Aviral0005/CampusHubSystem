import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";

function Students() {

const [students, setStudents] = useState([]);
const [showForm,setShowForm] = useState(false);
const [formData,setFormData] = useState({
name:"",
roll:"",
course:"",
year:""
});

const [editId,setEditId] = useState(null);

const API = "https://campushub-backend-6r2u.onrender.com/api/students";


/* LOAD STUDENTS FROM DATABASE */

useEffect(()=>{

axios.get(API)
.then(res=>{
setStudents(res.data);
})
.catch(err=>console.log(err));

},[]);



/* HANDLE INPUT */

const handleChange = (e)=>{
setFormData({...formData,[e.target.name]:e.target.value});
};



/* SAVE STUDENT */

const handleSave = async ()=>{

try{

if(editId){

const res = await axios.put(`${API}/${editId}`,formData);

setStudents(students.map(s=>s._id===editId ? res.data : s));

}else{

const res = await axios.post(API,formData);

setStudents([...students,res.data]);

}

setFormData({name:"",roll:"",course:"",year:""});
setShowForm(false);
setEditId(null);

}catch(err){

console.log(err);

}

};



/* EDIT STUDENT */

const handleEdit = (student)=>{

setFormData({
name:student.name,
roll:student.rollNumber || student.roll,
course:student.course,
year:student.year
});

setEditId(student._id);
setShowForm(true);

};



/* DELETE STUDENT */

const handleDelete = async(id)=>{

try{

await axios.delete(`${API}/${id}`);

setStudents(students.filter(s=>s._id !== id));

}catch(err){

console.log(err);

}

};



return(

<div style={styles.container}>

<Sidebar/>

<div style={styles.main}>

<div style={styles.header}>

<h2 style={styles.title}>Students Management</h2>

<button style={styles.addBtn} onClick={()=>setShowForm(true)}>
+ Add Student
</button>

</div>

<div style={styles.card}>

<table style={styles.table}>

<thead>
<tr>
<th style={styles.th}>Name</th>
<th style={styles.th}>Roll Number</th>
<th style={styles.th}>Course</th>
<th style={styles.th}>Year</th>
<th style={styles.th}>Action</th>
</tr>
</thead>

<tbody>

{students.map((s)=>(
<tr key={s._id}>

<td style={styles.td}>{s.name}</td>
<td style={styles.td}>{s.rollNumber || s.roll}</td>
<td style={styles.td}>{s.course}</td>
<td style={styles.td}>{s.year}</td>

<td style={styles.td}>

<button style={styles.editBtn} onClick={()=>handleEdit(s)}>
Edit
</button>

<button style={styles.deleteBtn} onClick={()=>handleDelete(s._id)}>
Delete
</button>

</td>

</tr>
))}

</tbody>

</table>

</div>


{/* POPUP FORM */}

{showForm && (

<div style={styles.popup}>

<div style={styles.form}>

<h3>{editId ? "Edit Student" : "Add Student"}</h3>

<input
name="name"
placeholder="Name"
value={formData.name}
onChange={handleChange}
style={styles.input}
/>

<input
name="rollNumber"
placeholder="Roll Number"
value={formData.rollNumber}
onChange={handleChange}
style={styles.input}
/>

<input
name="course"
placeholder="Course"
value={formData.course}
onChange={handleChange}
style={styles.input}
/>

<input
name="year"
placeholder="Year"
value={formData.year}
onChange={handleChange}
style={styles.input}
/>

<button style={styles.saveBtn} onClick={handleSave}>
Save
</button>

<button style={styles.closeBtn} onClick={()=>setShowForm(false)}>
Close
</button>

</div>

</div>

)}

</div>

</div>

);

}



const styles = {

container:{
display:"flex",
minHeight:"100vh",
background:"linear-gradient(135deg,#667eea,#764ba2)"
},

main:{
flex:1,
padding:"40px",
marginLeft:"220px"
},

header:{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:"20px"
},

title:{
color:"white",
fontSize:"28px"
},

addBtn:{
background:"#00c896",
color:"white",
border:"none",
padding:"10px 20px",
borderRadius:"8px",
cursor:"pointer"
},

card:{
background:"white",
borderRadius:"12px",
padding:"30px",
boxShadow:"0 10px 25px rgba(0,0,0,0.15)"
},

table:{
width:"100%",
borderCollapse:"collapse"
},

th:{
textAlign:"left",
padding:"12px",
background:"#f3f4f6"
},

td:{
padding:"12px",
borderBottom:"1px solid #eee"
},

editBtn:{
background:"#28a745",
color:"white",
border:"none",
padding:"6px 14px",
borderRadius:"6px",
marginRight:"8px",
cursor:"pointer"
},

deleteBtn:{
background:"#dc3545",
color:"white",
border:"none",
padding:"6px 14px",
borderRadius:"6px",
cursor:"pointer"
},

popup:{
position:"fixed",
top:0,
left:0,
right:0,
bottom:0,
background:"rgba(0,0,0,0.4)",
display:"flex",
justifyContent:"center",
alignItems:"center"
},

form:{
background:"white",
padding:"30px",
borderRadius:"10px",
display:"flex",
flexDirection:"column",
gap:"10px",
width:"300px"
},

input:{
padding:"10px",
borderRadius:"6px",
border:"1px solid #ccc"
},

saveBtn:{
background:"#28a745",
color:"white",
border:"none",
padding:"10px",
borderRadius:"6px",
cursor:"pointer"
},

closeBtn:{
background:"#dc3545",
color:"white",
border:"none",
padding:"10px",
borderRadius:"6px",
cursor:"pointer"
}

};

export default Students;